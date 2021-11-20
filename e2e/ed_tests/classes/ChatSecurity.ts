import { expect, Page } from '@playwright/test';

export class ChatSecurity {
	private locatorUserEmailText = '[aria-label="Email or Phone Number"]';
	private locatorUserPasswordText = '[aria-label="Password"]';
	private locatorLogInButton = 'button:has-text("Login")';
	private locatorUserSettingsLink = '[aria-label="User Settings"]';
	private locatorLogOutLink = 'text=Log Out';
	private locatorLogOutButton = 'button:has-text("Log Out")';

	public async Login(page: Page, loginUrl: string, userName: string, password: string) {
		await page.goto(loginUrl);
		await expect(page).toHaveURL(loginUrl);
		await page.fill(this.locatorUserEmailText, userName);
		await page.fill(this.locatorUserPasswordText, password);
		await Promise.all([ page.waitForNavigation(), page.click(this.locatorLogInButton) ]);
	}
	public async LogOut(page: Page, loginUrl: string) {
		await page.click(this.locatorUserSettingsLink);
		await page.click(this.locatorLogOutLink);
		await Promise.all([ page.waitForNavigation(), page.click(this.locatorLogOutButton) ]);
		await expect(page).toHaveURL(loginUrl);
	}
}
