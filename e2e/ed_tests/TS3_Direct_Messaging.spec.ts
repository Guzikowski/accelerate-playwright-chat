import { test, expect, Page } from '@playwright/test';
import { SetupEnvironment } from '../../environments/SetupEnvironment';
import { ChatSecurity, ChatChannel } from './classes';

test.describe('Test Scenario 3 - Direct Messaging Checks', () => {
	let userPage1: Page;
	let userPage2: Page;
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

	test.beforeEach(async ({ browser }) => {
		const context = await browser.newContext();
		userPage1 = await context.newPage();
		userPage2 = await context.newPage();
	});

	test('SImple Direct Message', async () => {
		await chatSecurity.Login(userPage1, userEmail1, userPassword1);
		await chatSecurity.Login(userPage2, userEmail2, userPassword2);
		await chatChannel.NavigateToMemberChannel(userPage2, userName1);

		await chatSecurity.LogOut(userPage1);
		await chatSecurity.LogOut(userPage2);
	});

	test('Direct Messaging with Photos', async () => {
		await chatSecurity.Login(userPage1, userEmail1, userPassword1);
		await chatSecurity.Login(userPage2, userEmail2, userPassword2);
		await chatChannel.NavigateToMemberChannel(userPage1, userName2);

		await chatSecurity.LogOut(userPage1);
		await chatSecurity.LogOut(userPage2);
	});
});
