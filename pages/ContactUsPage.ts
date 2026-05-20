import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { generateRandomData } from '../utils/userGenerator';

export class ContactUsPage extends BasePage {
  readonly contactUsLink: Locator;
  readonly contactName: Locator;
  readonly contactEmail: Locator;
  readonly contactSubject: Locator;
  readonly contactMsg: Locator;
  readonly contactFile: Locator;
  readonly contactSubmitBtn: Locator;

  constructor(page: Page) {
    super(page, 'https://www.automationexercise.com');
    this.contactUsLink = this.page.locator('a[href="/contact_us"]');
    this.contactName = this.page.locator('input[data-qa="name"]');
    this.contactEmail = this.page.locator('input[data-qa="email"]');
    this.contactSubject = this.page.locator('input[data-qa="subject"]');
    this.contactMsg = this.page.locator('[data-qa="message"]');
    this.contactFile = this.page.locator('input[name="upload_file"]');
    this.contactSubmitBtn = this.page.getByRole('button', { name: 'Submit' });
  }

  async openContactUsForm() {
    await this.contactUsLink.click();
  }

  async contactFormIsSentSuccessfully() {
    const contactData = generateRandomData();
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.contactName.fill(contactData.contactName);
    await this.contactEmail.fill(contactData.contactEmail);
    await this.contactSubject.fill(contactData.contactSubject);
    await this.contactMsg.fill(contactData.contactMsg);
    await this.contactFile.setInputFiles('./utils/images/Screenshot.png');
    this.page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
    await this.contactSubmitBtn.click();
    await expect(this.page.locator('.status.alert-success')).toBeVisible();
  }
}
