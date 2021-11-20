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
}

/*   // Click text=pw-feedback
  await page.click('text=pw-feedback');
  await expect(page).toHaveURL('https://discord.com/channels/909154540404748348/910344598273007667');
  // Click [aria-label="Message #pw-feedback"] div
  await page.click('[aria-label="Message #pw-feedback"] div');
  // Press Enter
  await page.press('[aria-label="Message #pw-feedback"]', 'Enter');
  // Click #chat-messages-911730893008273459 [aria-label="More"]
  await page.click('#chat-messages-911730893008273459 [aria-label="More"]');
  // Click text=Delete Message
  await page.click('text=Delete Message');
  // Click button:has-text("Delete")
  await page.click('button:has-text("Delete")'); */
