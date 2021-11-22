import { expect, Page } from '@playwright/test';

export class ChatSecurity {
	private validUrl = new RegExp('.*//discord.com/');
	private loginUrl = 'https://discord.com/login';
	private alreadyLoggedInUrl = 'https://discord.com/channels/@me';
	private locatorUserEmailText = '[aria-label="Email or Phone Number"]';
	private locatorUserPasswordText = '[aria-label="Password"]';
	private locatorLogInButton = 'button:has-text("Login")';
	private locatorUserSettingsLink = '[aria-label="User Settings"]';
	private locatorLogOutLink = 'text=Log Out';
	private locatorLogOutButton = 'button:has-text("Log Out")';

	public async NavigateToLogin(page: Page) {
		await Promise.all([ page.waitForNavigation(), page.goto(this.loginUrl) ]);
		await expect(page).toHaveURL(this.validUrl);
	}

	public async Login(page: Page, userName: string, password: string) {
		if (page.url() == this.alreadyLoggedInUrl) {
			await this.LogOut(page);
		}
		await expect(page).toHaveURL(this.loginUrl);
		await page.fill(this.locatorUserEmailText, userName);
		await page.fill(this.locatorUserPasswordText, password);
		await Promise.all([ page.waitForNavigation(), page.click(this.locatorLogInButton) ]);
	}
	public async LogOut(page: Page) {
		await page.click(this.locatorUserSettingsLink);
		await page.click(this.locatorLogOutLink);
		await Promise.all([ page.waitForNavigation(), page.click(this.locatorLogOutButton) ]);
		await expect(page).toHaveURL(this.loginUrl);
	}
}
