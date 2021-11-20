import { test, expect } from '@playwright/test';
import { SetupEnvironment } from '../../environments/SetupEnvironment';
import { ChatSecurity, ChatChannel, ChatMessage } from './classes';

test.describe('Test Scenario 1 - Static Content Checks', () => {
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

	test('Check announcement content exists', async ({ page }) => {
		await chatSecurity.Login(page, userEmail1, userPassword1);
		await chatChannel.NavigateToAnnouncements(page);
		await chatMessage.CheckAndReactToAnnouncementsContent(page);
		await chatSecurity.LogOut(page);
	});

	test('Check release content exists', async ({ page }) => {
		await chatSecurity.Login(page, userEmail2, userPassword2);
		await chatChannel.NavigateToReleases(page);
		await chatMessage.CheckAndReactToReleaseContent(page);
		await chatSecurity.LogOut(page);
	});
});
