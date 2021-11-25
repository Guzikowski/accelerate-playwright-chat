import { test, expect, Page } from '@playwright/test';

test('basic log in / out test', async ({ page }) => {
	test.skip();
	await page.goto('https://discord.com/login');
	await Login(page);
	await Logout(page);
});

test('basic announcement channel test', async ({ page }) => {
	await page.goto('https://discord.com/login');
	await Login(page);

	await NavigateToServer(page);

	await NavigateTo(page, 'text=announcements', 'announcements');

	await page.click('text=Partstrader @ Detroit Auto Conference');
	await page.click('#chat-messages-911370366495113246 [aria-label="Add Reaction"]');
	await page.click('li[role="gridcell"]:has-text(":thumbsup: :+1: :thumbup:")');
	await page.click(
		'[aria-label="ed.guzikowski reacted with :thumbsup:"] [aria-label="👍, 1 reaction, press to react"]'
	);

	await Logout(page);
});

test('basic releases channel test', async ({ page }) => {
	await page.goto('https://discord.com/login');
	await Login(page);

	await NavigateToServer(page);

	await NavigateTo(page, 'text=releases', 'releases');

	await page.click('text=PTUS-3.3.112.0 released into Production');
	await page.click('text=Version 3.3.112.0 The following release notes have been released in this version');
	await page.click(
		'text=[10:32 AM] PTUS-3.3.112.0 released into ProductionVersion 3.3.112.0 The followin >> [aria-label="Add Reaction"]'
	);
	await page.click('li[role="gridcell"]:has-text(":eyes:")');
	await page.click('[aria-label="👀, 1 reaction, press to react"]');

	await Logout(page);
});

async function NavigateTo(page: Page, link: string, channelName: string) {
	await page.click(link);
	const locator = page.locator('//h3[contains(@class,"title-29uC1r fontDisplay-1dagSA")]');
	await expect(locator).toContainText(channelName);
}

async function NavigateToServer(page) {
	await page.click('[aria-label="  Accelerate Chat server"]');
	await expect(page).toHaveURL('https://discord.com/channels/909154540404748348/909154540404748351');
}

async function Logout(page) {
	await page.click('[aria-label="User Settings"]');
	await page.click('text=Log Out');
	await Promise.all([ page.waitForNavigation(), page.click('button:has-text("Log Out")') ]);
}

async function Login(page) {
	await page.fill('[aria-label="Email or Phone Number"]', 'ed.guzikowski@ptml.com');
	await page.press('[aria-label="Email or Phone Number"]', 'Tab');
	await page.fill('[aria-label="Password"]', 'Accelerat3');
	await Promise.all([ page.waitForNavigation(), page.click('button:has-text("Login")') ]);
}
