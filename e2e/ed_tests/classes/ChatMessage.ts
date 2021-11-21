import { Page } from '@playwright/test';

export class ChatMessage {
	public async CheckAndReactToAnnouncementsContent(page: Page) {
		await page.click('text=Partstrader @ Detroit Auto Conference');
		await page.click('#chat-messages-911370366495113246 [aria-label="Add Reaction"]');
		await page.click('li[role="gridcell"]:has-text(":grinning:")');
		await page.click('[aria-label="😀, 1 reaction, press to react"]');
	}
	public async CheckAndReactToReleaseContent(page: Page) {
		await page.click('text=PTUS-3.3.111.0 released into Production');
		await page.click('text=Version 3.3.111.0 The following release notes have been released in this version');
		await page.click('[aria-label="Add Reaction"]');
		await page.click('li[role="gridcell"]:has-text(":thumbsup: :+1: :thumbup:")');
		await page.click('[aria-label="👍, 1 reaction, press to react"]');
	}
	public async AddFeedbackContent(page: Page, message: string) {
		await page.click('[aria-label="Message #pw-feedback"] div');
		await page.fill('[aria-label="Message #pw-feedback"] div', message);
		await page.press('[aria-label="Message #pw-feedback"]', 'Enter');
	}
	public async AddReactionToFeedbackContent(page: Page, message: string) {
		await page.click(`//div[text()="${message}"]`);
		await page.click('[aria-label="Add Reaction"]');
		await page.click('li[role="gridcell"]:has-text(":thumbsup: :+1: :thumbup:")');
	}
	public async DeleteFeedbackContent(page: Page, message: string) {
		await page.click(`//div[text()="${message}"]`);
		await page.click('[aria-label="More"]');
		await page.click('div[role="menuitem"]:has-text("Delete Message")');
		await page.click('button:has-text("Delete")');
	}
}
