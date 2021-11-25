import { test, expect } from '@playwright/test';

test('basic channel test', async ({ page }) => {
	await page.goto('https://discord.com/login');

	await Login(page);

	await page.click('[aria-label="  Accelerate Chat server"]');
	await expect(page).toHaveURL('https://discord.com/channels/909154540404748348/909154540404748351');
	await page.click('h3:has-text("general")');

	await page.click('text=announcements');
	await expect(page).toHaveURL('https://discord.com/channels/909154540404748348/909155774729703504');

	await page.click('text=Partstrader @ Detroit Auto Conference');
	await page.click(
		'text=[10:40 AM] Partstrader @ Detroit Auto Conference1 >> [aria-label="Message Actions"] [aria-label="Add Reaction"]'
	);
	await page.click('li[role="gridcell"]:has-text(":grinning:")');
	await page.click('[aria-label="😀, 1 reaction, press to react"]');

	await Logout(page);
});

test('basic login test', async ({ page }) => {
	await page.goto('https://discord.com/login');

	await Login(page);

	await Logout(page);
});

async function Login(page) {
	await page.fill('[aria-label="Email or Phone Number"]', 'ed.guzikowski@ptml.com');
	await page.press('[aria-label="Email or Phone Number"]', 'Tab');
	await page.fill('[aria-label="Password"]', 'Accelerat3');
	await Promise.all([ page.waitForNavigation(), page.click('button:has-text("Login")') ]);
}

async function Logout(page) {
	await page.click('[aria-label="User Settings"]');
	await page.click('text=Log Out');
	await Promise.all([ page.waitForNavigation(), page.click('button:has-text("Log Out")') ]);
}
