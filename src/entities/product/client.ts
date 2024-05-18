import { ShoppingList } from 'entities/shoppingList';
import { DefaultId } from 'typings/api';

export type Product = {
  id: DefaultId;
  name: string;
  price: number | null;
  bought: boolean;
  shoppingListId: ShoppingList['id'];
};
