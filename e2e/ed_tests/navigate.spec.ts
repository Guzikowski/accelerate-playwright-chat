import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://discord.gg/57tRgXKr');

  await expect(page).toHaveTitle(/Accelerate Chat server/);
  // Click button:has-text("Already have an account?")
  await page.click('button:has-text("Already have an account?")');
  // assert.equal(page.url(), 'https://discord.com/invite/57tRgXKr/login');
  await expect(page).toHaveURL('https://discord.com/invite/57tRgXKr/login');
  // Click [aria-label="Email or Phone Number"]
  await page.click('[aria-label="Email or Phone Number"]');
  // Fill [aria-label="Email or Phone Number"]
  await page.fill('[aria-label="Email or Phone Number"]', 'ed.guzikowski@ptml.com');
  // Click [aria-label="Password"]
  await page.click('[aria-label="Password"]');
  // Fill [aria-label="Password"]
  await page.fill('[aria-label="Password"]', 'Accelerat3');
  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://discord.com/channels/909154540404748348/909154540404748351' }*/),
    page.click('button:has-text("Login")')
  ]);
  // Click text=general
  await page.click('text=general');
  // assert.equal(page.url(), 'https://discord.com/channels/909154540404748348/909154540404748351');
  await page.click('[aria-label="User Settings"]');
  // Click text=Log Out
  await page.click('text=Log Out');
  // Click button:has-text("Log Out")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://discord.com/login' }*/),
    page.click('button:has-text("Log Out")')
  ]);
  await expect(page).toHaveURL('https://discord.com/login');
});
