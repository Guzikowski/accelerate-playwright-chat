import { test, Page } from '@playwright/test';
import { SetupEnvironment } from '../../environments/SetupEnvironment';
import { ChatSecurity, ChatChannel, ChatMessage } from './classes';

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
	let chatMessage: ChatMessage;

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
		chatMessage = new ChatMessage();
	});

	test.beforeEach(async ({ browser }) => {
		const context = await browser.newContext();
		userPage1 = await context.newPage();
		await chatSecurity.NavigateToLogin(userPage1);
		userPage2 = await context.newPage();
		await chatSecurity.NavigateToLogin(userPage2);
	});

	test('Simple Direct Message', async () => {
		await chatSecurity.Login(userPage1, userEmail1, userPassword1);
		await chatSecurity.Login(userPage2, userEmail2, userPassword2);

		// TODO: Kill the Dismiss Banner
		// Also Kill the Got it Popup

		await chatChannel.NavigateToGeneral(userPage1);
		await chatChannel.NavigateToGeneral(userPage2);
		await chatChannel.StartMemberChannel(userPage2, userName1);
		await chatMessage.StartDirectMessage(userPage2, userName1, 'Test start message');

		//TODO:
		// Need to go Home and then select the Direct Message

		await chatChannel.NavigateToMemberChannel(userPage1, userName2);
		await chatMessage.AddDirectMessage(userPage1, userName2, 'Test add message');
		await chatSecurity.LogOut(userPage1);
		await chatSecurity.LogOut(userPage2);
	});

	test('Direct Messaging with Photos', async () => {
		await chatSecurity.Login(userPage1, userEmail1, userPassword1);
		await chatSecurity.Login(userPage2, userEmail2, userPassword2);
		await chatChannel.NavigateToGeneral(userPage1);
		await chatChannel.NavigateToGeneral(userPage2);
		await chatChannel.StartMemberChannel(userPage1, userName2);
		await chatMessage.StartDirectMessage(userPage1, userName1, 'Test start message');
		await chatChannel.NavigateToMemberChannel(userPage2, userName1);
		await chatMessage.AddDirectMessage(userPage1, userName2, 'Test add message');
		await chatMessage.AddDirectMessageWithPhoto(
			userPage1,
			userName1,
			'Test photo message',
			'D:/MyGit/accelerate-playwright-chat/test_data/crash_impact.png'
		);

		await chatSecurity.LogOut(userPage1);
		await chatSecurity.LogOut(userPage2);
	});
});
