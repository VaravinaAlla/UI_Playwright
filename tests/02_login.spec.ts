import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Verifying Login with correct and incorrect data', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.cookiesBtnClick();
  });

  test('Login with correct email and password', async () => {
    await loginPage.bodyIsVisible();
    await loginPage.titleHomePageIsVisible();
    await loginPage.openSignUpAndLoginForm();
    await loginPage.loginFormIsVisible();
    await loginPage.fillLoginFormAndClick();
    await loginPage.logoutLink.click();
  });
});
