import { Product } from './client';
import { ProductServer } from './server';

export const normalizeProduct = (product: ProductServer): Product => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    bought: product.checked,
    shoppingListId: product.shoppingListId,
  };
};
