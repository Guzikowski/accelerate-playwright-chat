import { test, expect } from '@playwright/test';
import { SetupEnvironment } from '../../environments/SetupEnvironment';
import { ChatSecurity } from './classes';

test.describe('Test Scenario 1 - Static Content Checks', () => {
	let pageUrl: string;
	let userName1: string;
	let userPassword1: string;
	let userName2: string;
	let userPassword2: string;
	let chatSecurity: ChatSecurity;

	test.beforeAll(async () => {
		SetupEnvironment.initialise();
		pageUrl = `${process.env.BASE_URL}/login`;
		userName1 = process.env.CHAT_USER_NAME_1;
		userPassword1 = process.env.CHAT_USER_PASSWORD_1;
		userName2 = process.env.CHAT_USER_NAME_2;
		userPassword2 = process.env.CHAT_USER_PASSWORD_2;
		chatSecurity = new ChatSecurity();
	});

	test('Check announcement content exists', async ({ page }) => {
		await chatSecurity.Login(page, pageUrl, userName1, userPassword1);
		await chatSecurity.LogOut(page, pageUrl);
	});

	test('Check release content exists', async ({ page }) => {
		await chatSecurity.Login(page, pageUrl, userName2, userPassword2);
		await chatSecurity.LogOut(page, pageUrl);
	});
});
