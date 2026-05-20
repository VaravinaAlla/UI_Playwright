import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContactUsPage } from '../pages/ContactUsPage';

test.describe('Verifying "Contact us" Form', () => {
  let loginPage: LoginPage;
  let contactPage: ContactUsPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    contactPage = new ContactUsPage(page);
    await loginPage.navigate();
    await loginPage.cookiesBtnClick();
  });

  test('Sending "Contact us" From', async () => {
    await loginPage.bodyIsVisible();
    await loginPage.titleHomePageIsVisible();
    await contactPage.openContactUsForm();
    await contactPage.contactFormIsSentSuccessfully();
  });
});
