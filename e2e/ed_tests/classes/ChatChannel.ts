import { expect, Page } from '@playwright/test';

export class ChatChannel {
	private locatorServerLink = '[aria-label="  Accelerate Chat server"]';
	private locatorHomeLink = '//div[@aria-label="Home"]//div[1]';
	private locatorAnnouncementsLink = 'text=announcements';
	private announcementsChannel = 'announcements';
	private locatorGeneralLink = 'text=general';
	private generalChannel = 'general';
	private friendsChannel = 'Friends';
	private locatorReleasesLink = 'text=releases';
	private releasesChannel = 'releases';
	private locatorFeedbackLink = 'text=pw-feedback';
	private pwFeedbackChannel = 'pw-feedback';
	private locatorReportIssueLink = 'text=pw-report-issue';
	private pwReportIssueChannel = 'pw-report-issue';
	private locatorMemberLink = '[aria-label="Members"] >> text=';
	private locatorMemberLabel = '[aria-label=';
	private locatorChannelName = '//h3[contains(@class,"title-29uC1r fontDisplay-1dagSA")]';
	private locatorGotItPopup = 'button:has-text("Got it")';

	private async NavigateTo(page: Page, link: string, channelName: string) {
		await page.click(link);
		const locator = page.locator(this.locatorChannelName);
		await expect(locator).toContainText(channelName);
	}
	private async NavigateToServer(page: Page) {
		await this.NavigateTo(page, this.locatorServerLink, this.generalChannel);
		let isPresent = await page.isVisible(this.locatorGotItPopup);
		if (isPresent) {
			await page.click(this.locatorGotItPopup);
		}
	}
	private async NavigateToHome(page: Page) {
		await this.NavigateTo(page, this.locatorHomeLink, this.friendsChannel);
		let isPresent = await page.isVisible(this.locatorGotItPopup);
		if (isPresent) {
			await page.click(this.locatorGotItPopup);
		}
	}

	public async NavigateToAnnouncements(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorAnnouncementsLink, this.announcementsChannel);
	}
	public async NavigateToGeneral(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorGeneralLink, this.generalChannel);
	}
	public async NavigateToReleases(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorReleasesLink, this.releasesChannel);
	}
	public async NavigateToFeedback(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorFeedbackLink, this.pwFeedbackChannel);
	}
	public async NavigateToReportIssue(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorReportIssueLink, this.pwReportIssueChannel);
	}
	public async StartMemberChannel(page: Page, userName: string) {
		await this.NavigateToHome(page);
		let link = `text=${userName}`;
		await page.click(link);
	}
	public async NavigateToMemberChannel(page: Page, userName: string) {
		await this.NavigateToHome(page);
		let link = `text=${userName}`;
		await page.click(link);
	}
}
