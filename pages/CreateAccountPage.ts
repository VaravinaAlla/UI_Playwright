import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CreateAccountPage extends BasePage {
  readonly gender: Locator;
  readonly password: Locator;
  readonly birthDays: Locator;
  readonly birthMonths: Locator;
  readonly birthYears: Locator;
  readonly checkboxSignup: Locator;
  readonly checkboxOffers: Locator;
  readonly firsName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipCode: Locator;
  readonly mobileNum: Locator;
  readonly createAccBtn: Locator;
  readonly continueBtn: Locator;
  readonly deleteAccBtn: Locator;

  constructor(page: Page) {
    super(page, 'https://www.automationexercise.com');
    this.gender = this.page.locator('#uniform-id_gender2');
    this.password = this.page.locator('#password');
    this.birthDays = this.page.locator('#days');
    this.birthMonths = this.page.locator('#months');
    this.birthYears = this.page.locator('#years');
    this.checkboxSignup = this.page.locator('#newsletter');
    this.checkboxOffers = this.page.locator('#optin');
    this.firsName = this.page.locator('[data-qa="first_name"]');
    this.lastName = this.page.locator('[data-qa="last_name"]');
    this.company = this.page.locator('[data-qa="company"]');
    this.address = this.page.locator('[data-qa="address"]');
    this.address2 = this.page.locator('[data-qa="address2"]');
    this.country = this.page.locator('[data-qa="country"]');
    this.state = this.page.locator('[data-qa="state"]');
    this.city = this.page.locator('[data-qa="city"]');
    this.zipCode = this.page.locator('[data-qa="zipcode"]');
    this.mobileNum = this.page.locator('[data-qa="mobile_number"]');
    this.createAccBtn = this.page.getByRole('button', {
      name: 'Create Account',
    });
    this.continueBtn = this.page.locator('[data-qa="continue-button"]');
    this.deleteAccBtn = this.page.locator('a[href="/delete_account"]');
  }

  async checkCheckboxSignup() {
    await this.checkboxSignup.check();
  }
  async checkCheckboxOffers() {
    await this.checkboxOffers.check();
  }

  async selectDays() {
    const options = await this.birthDays.locator('option').all();
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomValue = await options[randomIndex].getAttribute('value');
    await this.birthDays.selectOption(randomValue);
  }
  async selectMonths() {
    const options = await this.birthMonths.locator('option').all();
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomValue = await options[randomIndex].getAttribute('value');
    await this.birthMonths.selectOption(randomValue);
  }
  async selectYears() {
    const options = await this.birthYears.locator('option').all();
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomValue = await options[randomIndex].getAttribute('value');
    await this.birthYears.selectOption(randomValue);
  }
  async selectCountry() {
    const options = await this.country.locator('option').all();
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomValue = await options[randomIndex].getAttribute('value');
    await this.country.selectOption(randomValue);
  }

  async fillAccountInfoAndClickBtn() {
    const user = require('../dataGenerate/userData.json');
    await this.gender.click();
    await this.password.fill(user.password);
    await this.selectDays();
    await this.selectMonths();
    await this.selectYears();
    await this.checkCheckboxSignup();
    await this.checkCheckboxOffers();
    await this.firsName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.company.fill(user.company);
    await this.address.fill(user.address);
    await this.address2.fill(user.address2);
    await this.selectCountry();
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipCode.fill(user.zipcode);
    await this.mobileNum.fill(user.mobileNum);
    await this.createAccBtn.click();
  }
}
