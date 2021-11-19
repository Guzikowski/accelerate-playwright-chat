import { test, expect, Page } from "@playwright/test"

test.describe('Test Direct Message', () => {
    let userPage1: Page
    let userPage2: Page

    test.beforeAll(async ( {browser} ) => {
        const context = await browser.newContext();
        userPage1 = await context.newPage();
        userPage2 = await context.newPage();
    });

    test('basic test', async () => {
        await Login(userPage1, 'ed.guzikowski@ptml.com', 'Accelerat3');
        await Login(userPage2, 'ed.guzikowski@gmail.com', 'P2159683723');
        await LogOut(userPage1);
        await LogOut(userPage2);


        async function Login(page: Page, userName: string, password: string) {
            await page.goto('https://discord.gg/57tRgXKr');
            await expect(page).toHaveTitle(/Accelerate Chat server/);
            await page.click('button:has-text("Already have an account?")');
            await expect(page).toHaveURL('https://discord.com/invite/57tRgXKr/login');
            await page.click('[aria-label="Email or Phone Number"]');
            await page.fill('[aria-label="Email or Phone Number"]', userName);
            await page.click('[aria-label="Password"]');
            await page.fill('[aria-label="Password"]', password);
            await Promise.all([
                page.waitForNavigation( /*{ url: 'https://discord.com/channels/909154540404748348/909154540404748351' }*/),
                page.click('button:has-text("Login")')
            ]);
        }
        async function LogOut(page: Page) {
            await page.click('[aria-label="User Settings"]');
            await page.click('text=Log Out');
            await Promise.all([
            page.waitForNavigation(/*{ url: 'https://discord.com/login' }*/),
            page.click('button:has-text("Log Out")')
            ]);
            await expect(page).toHaveURL('https://discord.com/login');
        }

    });

})
