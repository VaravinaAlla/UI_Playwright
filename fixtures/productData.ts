export type Product = {
  name: string;
  price: string;
};

let savedProduct: Product = {
  name: '',
  price: ''
};

export const setProductData = (name: string, price: string): void => {
  savedProduct = { name, price };
};

export const getProductData = (): Product => {
  return savedProduct;
};