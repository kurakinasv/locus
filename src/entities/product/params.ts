import { ShoppingList } from 'entities/shoppingList';

import { Product } from './client';

export type DeleteListItemParams = {
  listId: ShoppingList['id'];
  listItemId: Product['id'];
};
