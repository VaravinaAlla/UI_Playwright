import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { generateRandomUser } from '../utils/userGenerator';

export class LoginPage extends BasePage {
  readonly cookiesBtn: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly loginForm: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginBtn: Locator;
  readonly signupForm: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupBtn: Locator;

  constructor(page: Page) {
    super(page, 'https://www.automationexercise.com');
    this.cookiesBtn = this.page.getByRole('button', { name: 'Consent' });
    this.loginLink = this.page.locator('a[href="/login"]');
    this.logoutLink = this.page.locator('a[href="/logout"]');
    this.loginForm = this.page.locator('.login-form');
    this.loginEmail = this.page.locator('input[data-qa="login-email"]');
    this.loginPassword = this.page.locator('input[data-qa="login-password"]');
    this.loginBtn = this.page.getByRole('button', { name: 'Login' });
    this.signupForm = this.page.locator('.signup-form');
    this.signupName = this.page.locator('input[data-qa="signup-name"]');
    this.signupEmail = this.page.locator('input[data-qa="signup-email"]');
    this.signupBtn = this.page.getByRole('button', { name: 'Signup' });
  }

  async cookiesBtnClick() {
    await this.cookiesBtn.click();
  }

  async loginWithIncorrectEmailAndPass() {
    await this.loginEmail.fill('111@gmail.com');
    await this.loginPassword.fill('123');
    await this.loginBtn.click();
  }

  async loginWithEmptyEmail() {
    await this.loginEmail.fill(' ');
    await this.loginPassword.fill('123');
    await this.loginBtn.click();
  }

  async loginWithEmptyPass() {
    await this.loginEmail.fill('tetians125%@gmail.com');
    await this.loginBtn.click();
  }

  async loginWithIncorrectEmail() {
    await this.loginEmail.fill('Tanya');
    await this.loginPassword.fill('123');
    await this.loginBtn.click();
  }

  async openSignUpAndLoginForm() {
    await this.loginLink.click();
  }

  async fillSignupFormAndClick() {
    const user = generateRandomUser();
    await this.signupName.fill(user.name);
    await this.signupEmail.fill(user.email);
    await this.signupBtn.click();
  }

  async fillSignupFormExistUserAndClick() {
    const user = require('../dataGenerate/userData.json');
    await this.signupName.fill(user.name);
    await this.signupEmail.fill(user.email);
    await this.signupBtn.click();
  }

  async fillLoginFormAndClick() {
    const user = require('../dataGenerate/userData.json');
    await this.loginEmail.fill(user.email);
    await this.loginPassword.fill(user.password);
    await this.loginBtn.click();
  }

  async bodyIsVisible() {
    await expect(this.page.locator('body')).toBeVisible();
  }

  async titleHomePageIsVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async loginFormIsVisible() {
    await expect(this.loginForm).toBeVisible();
    await expect(
      this.page.locator('h2', { hasText: 'Login to your account' }),
    ).toBeVisible();
  }

  async signupFormIsVisible() {
    await expect(this.signupForm).toBeVisible();
    await expect(
      this.page.locator('h2', { hasText: 'New User Signup!' }),
    ).toBeVisible();
  }

  async loggedInIsVisible() {
    await expect(
      this.page.locator('a', { hasText: 'Logged in as ' }),
    ).toBeVisible();
  }
}
