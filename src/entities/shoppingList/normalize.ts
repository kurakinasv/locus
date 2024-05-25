import { normalizeProduct } from 'entities/product/normalize';

import { ShoppingList } from './client';
import { ShoppingListServer } from './server';

export const normalizeShoppingList = (list: ShoppingListServer): ShoppingList => {
  return {
    id: list.id,
    name: list.name,
    products: list.shoppingListItems.map(normalizeProduct),
    description: list.description,
    groupId: list.groupId,
    purchaseDate: list.purchaseDate,
  };
};
