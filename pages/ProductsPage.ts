import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { getRandomSearchTerm } from '../utils/userGenerator';
import { setProductData } from '../fixtures/productData';
import searchTerms from '../fixtures/searchTerms.json';
import { generateRandomData } from '../utils/userGenerator';
import { categories, brands } from '../fixtures/category_product';

export class ProductsPage extends BasePage {
  readonly productsLink: Locator;
  readonly productsList: Locator;
  readonly productsItem: Locator;
  readonly cartModal: Locator;
  readonly randomItem: Locator;
  readonly addToCartBtn: Locator;
  readonly viewCart: Locator;
  readonly productsInfo: Locator;
  readonly productsPrice: Locator;
  readonly productSearch: Locator;
  readonly productSearchedList: Locator;
  readonly productSearchBtn: Locator;
  readonly continueBtn: Locator;
  readonly quantity: Locator;
  readonly nameReview: Locator;
  readonly emailReview: Locator;
  readonly commentReview: Locator;
  readonly reviewBtn: Locator;
  readonly recommendProduct: Locator;
  readonly recommendCarousel: Locator;

  constructor(page: Page) {
    super(page, 'https://www.automationexercise.com');
    this.productsLink = this.page.locator('a[href="/products"]');
    this.productsList = this.page.locator('div.col-sm-4');
    this.randomItem = this.page.locator('.single-products');
    this.productsItem = this.page.locator('a[href^="/product_details/"]');
    this.addToCartBtn = this.page.getByRole('button', {
      name: 'Add to cart',
    });
    this.viewCart = this.page.getByRole('link', { name: 'View Cart' });
    this.cartModal = this.page.locator('.modal-content');
    this.productsInfo = this.page.locator('.product-information');
    this.productsPrice = this.page.locator('span > span');
    this.productSearch = this.page.locator('#search_product');
    this.productSearchedList = this.page.locator('.productinfo');
    this.productSearchBtn = this.page.locator('#submit_search');
    this.continueBtn = this.page.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.quantity = this.page.locator('#quantity');
    this.nameReview = this.page.locator('#name');
    this.emailReview = this.page.locator('#email');
    this.commentReview = this.page.locator('#review');
    this.reviewBtn = this.page.locator('#button-review');
    this.recommendCarousel = this.page.locator(
      '.carousel-inner .item.active .product-image-wrapper',
    );
    this.recommendProduct = this.page.locator('#recommended-item-carousel');
  }

  async typequantity(quantity: number) {
    await this.quantity.fill(quantity.toString());
  }

  async productCategoryIsOpened() {
    await expect(
      this.page.locator('h2', { hasText: 'Category' }),
    ).toBeVisible();
    for (const category of categories) {
      const categoryLink = this.page.locator(`a[href="#${category.name}"]`);
      for (const sub of category.subcategories) {
        await categoryLink.click();
        const subLink = this.page
          .locator(`#${category.name}`)
          .getByRole('link', { name: new RegExp(`^${sub.text.trim()}$`) });
        await subLink.click();
        await expect(this.page.locator('h2.title')).toContainText(sub.expected);
      }
    }
  }

  async goToCartFromModal() {
    const modal = this.cartModal;
    await modal.waitFor({ state: 'visible' });
    const viewCartLink = modal.locator('a[href="/view_cart"]');
    await viewCartLink.click();
  }

  async productBrandIsOpened() {
    await expect(this.page.locator('h2', { hasText: 'Brands' })).toBeVisible();

    for (const brand of brands) {
      const brandLink = this.page
        .locator('.brands-name a')
        .filter({ hasText: brand.name });

      await brandLink.click();

      await expect(this.page.locator('h2.title')).toContainText(brand.expected);
    }
  }

  async fillReviewFieldAndSubmit() {
    const contactData = generateRandomData();
    await this.nameReview.fill(contactData.contactName);
    await this.emailReview.fill(contactData.contactEmail);
    await this.commentReview.fill(contactData.contactMsg);
    await this.reviewBtn.click();
  }
  async productCardIsDisplayed() {
    const count = await this.productsList.count();
    expect(count).toBeGreaterThan(0);
  }
  async successMsgIsAppear() {
    await expect(
      this.page.getByText('Thank you for your review.', { exact: true }),
    ).toBeVisible();
  }

  async productInfoIsVisibleAndEql() {
    const productInfo = this.productsInfo;
    await expect(productInfo).toBeVisible();
    await expect(productInfo).toContainText('Category');
    await expect(productInfo).toContainText('Availability');
    await expect(productInfo).toContainText('Condition');
    await expect(productInfo).toContainText('Brand');
  }

  async priceIsEql() {
    const priceText = await this.productsPrice.innerText();
    const trimmedPrice = priceText.trim();
    expect(trimmedPrice).toMatch(/Rs\. \d+/);
  }

  async typeSearchProductAndClickSearchBtn(searchTerm: string) {
    await this.productSearch.fill(searchTerm);
    await this.productSearchBtn.click();
  }

  async clickRecommendRandomItem() {
    const items = this.recommendCarousel;
    const count = await items.count();
    const randomIndex = Math.floor(Math.random() * count);
    const selected = items.nth(randomIndex);
    const name = (await selected.locator('p').textContent())?.trim();
    const price = (await selected.locator('h2').textContent())?.trim();
    if (!name || !price) {
      throw new Error('Failed to get product data');
    }
    await selected.locator('.add-to-cart').click();
    return { name, price };
  }

  async hoverOnItemAndClick() {
    const products = this.randomItem;
    const count = await products.count();
    const randomIndex = Math.floor(Math.random() * count);
    const product = products.nth(randomIndex);
    await product.scrollIntoViewIfNeeded();
    const name = await product.locator('.productinfo p').textContent();
    const price = await product.locator('.productinfo h2').textContent();
    setProductData(name!.trim(), price!.trim());
    await product.hover();
    const addToCartBtn = product.locator('a.add-to-cart').first();
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click();
    const modal = this.page.locator('.modal-content');
    await modal.waitFor({ state: 'visible' });
  }

  async productSearchIsRelevanted() {
    const searchTerm = getRandomSearchTerm(searchTerms.terms);
    await this.typeSearchProductAndClickSearchBtn(searchTerm);
    const currentUrl = this.page.url();
    if (!currentUrl.includes(`?search=${searchTerm}`)) {
      throw new Error(`URL does not include search term: ${searchTerm}`);
    }
    const header = await this.page.locator('h2:has-text("Searched Products")');
    await expect(header).toBeVisible();
  }

  async clickRandomViewProduct() {
    const products = this.productsItem;
    const itemCount = await products.count();
    const randomIndex = Math.floor(Math.random() * itemCount);
    await products.nth(randomIndex).click();
  }
}
