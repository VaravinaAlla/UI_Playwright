import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { generateRandomDataCard } from '../utils/userGenerator';

export class PaymentPage extends BasePage {
  readonly placeOrderLink: Locator;
  readonly nameCard: Locator;
  readonly numberCard: Locator;
  readonly CVCCard: Locator;
  readonly monthCard: Locator;
  readonly yearCard: Locator;
  readonly playAndConfirmBtn: Locator;
  readonly paymentContinueBtn: Locator;

  constructor(page: Page) {
    super(page, 'https://www.automationexercise.com');
    this.placeOrderLink = this.page.locator('a[href="/payment"]');
    this.nameCard = this.page.locator('[data-qa="name-on-card"]');
    this.numberCard = this.page.locator('[data-qa="card-number"]');
    this.CVCCard = this.page.locator('[data-qa="cvc"]');
    this.monthCard = this.page.locator('[data-qa="expiry-month"]');
    this.yearCard = this.page.locator('[data-qa="expiry-year"]');
    this.playAndConfirmBtn = this.page.locator('[data-qa="pay-button"]');
    this.paymentContinueBtn = this.page.locator('[data-qa="continue-button"]');
  }

  async fillDataCreditCardAndClick() {
    const { cardNumber, cardName, cardCVV, cardMonth, cardYear } =
      generateRandomDataCard();
    await this.numberCard.fill(cardNumber);
    await this.nameCard.fill(cardName);
    await this.CVCCard.fill(cardCVV);
    await this.monthCard.fill(cardMonth);
    await this.yearCard.fill(cardYear);
    await this.playAndConfirmBtn.click();
  }
}
