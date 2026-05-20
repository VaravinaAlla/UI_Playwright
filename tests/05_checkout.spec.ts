import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CreateAccountPage } from '../pages/CreateAccountPage';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { PaymentPage } from '../pages/PaymentPage';

test.describe('Verifying Checkout process', () => {
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

  test('Place Order: Register while Checkout', async () => {
    await productsPage.productsLink.click();
    await productsPage.hoverOnItemAndClick();
    await productsPage.goToCartFromModal();
    await cartPage.cartCheckoutBtn.click();
    await cartPage.cartRegisterLoginLink.click();
    await loginPage.fillSignupFormAndClick();
    await createAccountPage.fillAccountInfoAndClickBtn();
    await createAccountPage.continueBtn.click();
    await cartPage.cartLink.click();
    await cartPage.cartCheckoutBtn.click();
    await cartPage.fillCommentInCheckoutAndClick();
    await paymentPage.fillDataCreditCardAndClick();
    await paymentPage.paymentContinueBtn.click();
  });

  test('Place Order: Login before Checkout', async () => {
    await loginPage.openSignUpAndLoginForm();
    await loginPage.fillLoginFormAndClick();
    await productsPage.productsLink.click();
    await productsPage.hoverOnItemAndClick();
    await productsPage.goToCartFromModal();
    await cartPage.cartCheckoutBtn.click();
    await cartPage.placeOrderBtn.click();
    await paymentPage.fillDataCreditCardAndClick();
    await paymentPage.paymentContinueBtn.click();
    await createAccountPage.deleteAccBtn.click();
    await createAccountPage.continueBtn.click();
  });

  test('Remove Products From Cart', async () => {
    await productsPage.productsLink.click();
    await productsPage.hoverOnItemAndClick();
    await productsPage.goToCartFromModal();
    await cartPage.deleteItemrBtn.click();
    await cartPage.cartIsEmptyIsDisplayed();
  });
});
