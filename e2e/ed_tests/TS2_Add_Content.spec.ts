import { test, expect } from '@playwright/test';
import { SetupEnvironment } from '../../environments/SetupEnvironment';
import { ChatSecurity, ChatChannel } from './classes';

test.describe('Test Scenario 2 - Add Channel Content Checks', () => {
	let userName1: string;
	let userEmail1: string;
	let userPassword1: string;
	let userName2: string;
	let userEmail2: string;
	let userPassword2: string;
	let chatSecurity: ChatSecurity;
	let chatChannel: ChatChannel;

	test.beforeAll(async () => {
		SetupEnvironment.initialise();
		userName1 = process.env.CHAT_USER_NAME_1;
		userEmail1 = process.env.CHAT_USER_EMAIL_1;
		userPassword1 = process.env.CHAT_USER_PASSWORD_1;
		userName2 = process.env.CHAT_USER_NAME_2;
		userEmail2 = process.env.CHAT_USER_EMAIL_2;
		userPassword2 = process.env.CHAT_USER_PASSWORD_2;
		chatSecurity = new ChatSecurity();
		chatChannel = new ChatChannel();
	});

	test('Add Content to Feedback', async ({ page }) => {
		await chatSecurity.Login(page, userEmail1, userPassword1);
		await chatChannel.NavigateToFeedback(page);
		await chatSecurity.LogOut(page);
	});

	test('Add Content to Feedback and validate by different user', async ({ page }) => {
		await chatSecurity.Login(page, userEmail2, userPassword2);
		await chatChannel.NavigateToFeedback(page);
		await chatSecurity.LogOut(page);
	});
});
