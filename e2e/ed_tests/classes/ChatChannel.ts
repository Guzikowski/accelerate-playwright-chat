import { expect, Page } from '@playwright/test';

export class ChatChannel {
	private locatorServerLink = '[aria-label="  Accelerate Chat server"]';
	private serverUrl = 'https://discord.com/channels/909154540404748348/909154540404748351';
	private locatorAnnouncementsLink = 'text=announcements';
	private announcementsUrl = 'https://discord.com/channels/909154540404748348/909155774729703504';
	private locatorGeneralLink = 'text=general';
	private generalUrl = 'https://discord.com/channels/909154540404748348/909154540404748351';
	private locatorReleasesLink = 'text=releases';
	private releasesUrl = 'https://discord.com/channels/909154540404748348/909156110706020422';
	private locatorFeedbackLink = 'text=pw-feedback';
	private feedbackUrl = 'https://discord.com/channels/909154540404748348/910344598273007667';
	private locatorReportIssueLink = 'text=pw-report-issue';
	private reportIssueUrl = 'https://discord.com/channels/909154540404748348/910344710881701928';
	private locatorMemberLink = '[aria-label="Members"] >> text=';

	private async NavigateTo(page: Page, link: string, url: string) {
		await page.click(link);
		//expect(page).toHaveURL(url);
	}
	private async NavigateToServer(page: Page) {
		await this.NavigateTo(page, this.locatorServerLink, this.serverUrl);
	}
	public async NavigateToAnnouncements(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorAnnouncementsLink, this.announcementsUrl);
	}
	public async NavigateToGeneral(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorGeneralLink, this.generalUrl);
	}
	public async NavigateToReleases(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorReleasesLink, this.releasesUrl);
	}
	public async NavigateToFeedback(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorFeedbackLink, this.feedbackUrl);
	}
	public async NavigateToReportIssue(page: Page) {
		await this.NavigateToServer(page);
		await this.NavigateTo(page, this.locatorReportIssueLink, this.reportIssueUrl);
	}
	public async NavigateToMemberChannel(page: Page, userName: string) {
		await this.NavigateToServer(page);
		let link = `${this.locatorMemberLink}${userName}`;
		await page.click(link);
	}
}
