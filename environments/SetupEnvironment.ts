import * as dotenv from 'dotenv';
import fs from 'fs';

export const RequiredConfigurationValues: Array<string> = [
	'CONFIG_NAME',
	'BASE_URL',
	'CHAT_USER_NAME_1',
	'CHAT_USER_PASSWORD_1',
	'CHAT_USER_NAME_2',
	'CHAT_USER_PASSWORD_2'
];

export class SetupEnvironment {
	public static initialise(configName?: string, requireOverride: boolean = false) {
		const defaultConfigName: string = 'local';
		if (configName) {
			process.env.CONFIG_ENV_NAME = configName;
		} else {
			var result = dotenv.config();
			if (result.error) {
				process.env.CONFIG_ENV_NAME = defaultConfigName;
			}
		}
		if (requireOverride) {
			this.overrideConfiguration();
		} else {
			var result = dotenv.config({ path: `./environments/.env.${process.env.CONFIG_ENV_NAME}` });
			if (result.error) {
				throw new Error(`Unable to load environment configuration [${result.error}]`);
			}
		}
		/* this.setAdditionalConstructedVariables() */
		this.validateEnvironmentConfiguration();
	}
	private static overrideConfiguration(): void {
		const envConfig = dotenv.parse(fs.readFileSync(`./environments/.env.${process.env.CONFIG_ENV_NAME}`));
		for (const key in envConfig) {
			process.env[key] = envConfig[key];
		}
	}
	private static validateEnvironmentConfiguration(): void {
		var missingKeys: Array<string> = new Array<string>();
		RequiredConfigurationValues.forEach((key) => {
			if (process.env[key] == undefined) {
				missingKeys.push(key);
			}
		});
		if (missingKeys.length > 0) {
			throw new Error(`The following environemnt variables missing [${missingKeys.toString()}]`);
		}
	}
	/*     
    private static setAdditionalConstructedVariables(): void {
        process.env['SITE_URL'] = `${process.env.ENV_PROTOCOL}://${process.env.ENV}.${process.env.ENV_BASE_URL}`
    } 
    */
}
