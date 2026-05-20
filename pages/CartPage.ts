import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { generateRandomComment } from '../utils/userGenerator';
import { getProductData } from '../fixtures/productData';

export class CartPage extends BasePage {
  readonly cartLink: Locator;
  readonly cartQuantity: Locator;
  readonly cartCheckoutBtn: Locator;
  readonly cartRegisterLoginLink: Locator;
  readonly commentCart: Locator;
  readonly placeOrderBtn: Locator;
  readonly deleteItemrBtn: Locator;
  readonly addressDelivery: Locator;
  readonly addressInvoice: Locator;

  constructor(page: Page) {
    super(page, 'https://www.automationexercise.com');
    this.cartLink = this.page.getByRole('link', { name: 'Cart' });
    this.cartQuantity = this.page.locator('.cart_quantity');
    this.cartCheckoutBtn = this.page.locator('.check_out');
    this.cartRegisterLoginLink = this.page.getByRole('link', {
      name: 'Register / Login',
    });
    this.commentCart = this.page.locator('textarea[name="message"]');
    this.placeOrderBtn = this.page.getByRole('link', { name: 'Place Order' });
    this.deleteItemrBtn = this.page.locator('.cart_quantity_delete');
    this.addressDelivery = this.page.locator('#address_delivery');
    this.addressInvoice = this.page.locator('#address_invoice');
  }

  async fillCommentInCheckoutAndClick() {
    const comment = generateRandomComment();
    await this.commentCart.fill(comment.chekoutComment);
    await this.placeOrderBtn.click();
  }

  async cartIsEmptyIsDisplayed() {
    const emptyCartText = await this.page.locator('#empty_cart').textContent();
    expect(emptyCartText).toContain('Cart is empty!');
  }

  async verifyProductInCart(expectedName: string, expectedPrice: string) {
    const cartRow = this.page.locator('.cart_info tbody tr', {
      hasText: expectedName,
    });
    await expect(cartRow.locator('.cart_description a')).toHaveText(
      expectedName,
    );
    await expect(cartRow.locator('.cart_price')).toHaveText(expectedPrice);
  }

  async productNameAndPriceInCartIsEql() {
    const product = getProductData();
    const productLink = this.page.locator('a[href^="/product_details/"]');
    await expect(productLink).toContainText(product.name);
    const cartPrice = this.page.locator('.cart_price');
    await expect(cartPrice).toContainText(product.price);
  }
}
