import { ShoppingListServer } from 'entities/shoppingList';
import { DefaultId } from 'typings/api';

export type ProductServer = {
  id: DefaultId;
  name: string;
  price: number | null;
  checked: boolean;
  shoppingListId: ShoppingListServer['id'];
};
