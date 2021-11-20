import { test, expect } from '@playwright/test';
import { SetupEnvironment } from '../../environments/SetupEnvironment';
import { ChatSecurity, ChatChannel } from './classes';

test.describe('Test Scenario 4 - Chat Bot Checks', () => {
	let userName1: string;
	let userPassword1: string;
	let userName2: string;
	let userPassword2: string;
	let chatSecurity: ChatSecurity;
	let chatChannel: ChatChannel;

	test.beforeAll(async () => {
		SetupEnvironment.initialise();
		userName1 = process.env.CHAT_USER_NAME_1;
		userPassword1 = process.env.CHAT_USER_PASSWORD_1;
		userName2 = process.env.CHAT_USER_NAME_2;
		userPassword2 = process.env.CHAT_USER_PASSWORD_2;
		chatSecurity = new ChatSecurity();
		chatChannel = new ChatChannel();
	});

	test('Simple Chat Bot', async ({ page }) => {
		await chatSecurity.Login(page, userName1, userPassword1);
		await chatChannel.NavigateToReportIssue(page);
		await chatSecurity.LogOut(page);
	});

	test('Chat Bot with follow up', async ({ page }) => {
		await chatSecurity.Login(page, userName2, userPassword2);
		await chatChannel.NavigateToReportIssue(page);
		await chatSecurity.LogOut(page);
	});
});
