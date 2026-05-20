import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CreateAccountPage } from '../pages/CreateAccountPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { PaymentPage } from '../pages/PaymentPage';

test.describe('Verifying Products page', () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;
  let productsPage: ProductsPage;
  let paymentPage: PaymentPage;
  let createAccountPage: CreateAccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    productsPage = new ProductsPage(page);
    paymentPage = new PaymentPage(page);
    createAccountPage = new CreateAccountPage(page);
    await loginPage.navigate();
    await loginPage.cookiesBtnClick();
  });

  test('Verify All Products and product detail page', async () => {
    await loginPage.bodyIsVisible();
    await loginPage.titleHomePageIsVisible();
    await productsPage.productsLink.click();
    await productsPage.productCardIsDisplayed();
    await productsPage.clickRandomViewProduct();
    await productsPage.productInfoIsVisibleAndEql();
    await productsPage.priceIsEql();
  });

  test('Verify Searching Product', async () => {
    await productsPage.productsLink.click();
    await productsPage.productSearchIsRelevanted();
  });

  test('Verify Adding Products in Cart', async () => {
    await loginPage.bodyIsVisible();
    await loginPage.titleHomePageIsVisible();
    await productsPage.productsLink.click();
    await productsPage.hoverOnItemAndClick();
    await productsPage.goToCartFromModal();
    await cartPage.productNameAndPriceInCartIsEql();
  });

  test('Verify Product quantity in Cart', async () => {
    await productsPage.clickRandomViewProduct();
    await productsPage.typequantity(4);
    await productsPage.addToCartBtn.click();
    await productsPage.viewCart.click();
    await expect(cartPage.cartQuantity).toHaveText('4');
  });

  test('Verify View Category Products', async () => {
    await productsPage.productsLink.click();
    await productsPage.productCategoryIsOpened();
  });

  test('Verify View & Cart Brand Products', async () => {
    await productsPage.productsLink.click();
    await productsPage.productBrandIsOpened();
  });

  test('Add review on product', async () => {
    await productsPage.productsLink.click();
    await productsPage.productCardIsDisplayed();
    await productsPage.clickRandomViewProduct();
    await productsPage.fillReviewFieldAndSubmit();
    await productsPage.successMsgIsAppear();
  });

  test('Add to cart from Recommended items', async () => {
    await productsPage.recommendProduct.scrollIntoViewIfNeeded();
    const product = await productsPage.clickRecommendRandomItem();
    await productsPage.viewCart.click();
    await cartPage.verifyProductInCart(product.name, product.price);
  });
});
