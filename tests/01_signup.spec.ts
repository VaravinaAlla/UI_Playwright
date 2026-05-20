import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CreateAccountPage } from '../pages/CreateAccountPage';

test.describe('Verifying Registration', () => {
  let loginPage: LoginPage;
  let createAccPage: CreateAccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    createAccPage = new CreateAccountPage(page);
    await loginPage.navigate();
    await loginPage.cookiesBtnClick();
  });

  test('Creationt account', async () => {
    await loginPage.bodyIsVisible();
    await loginPage.titleHomePageIsVisible();
    await loginPage.openSignUpAndLoginForm();
    await loginPage.signupFormIsVisible();
    await loginPage.fillSignupFormAndClick();
    await createAccPage.fillAccountInfoAndClickBtn();
    await createAccPage.continueBtn.click();
    await loginPage.loggedInIsVisible();
  });
});
