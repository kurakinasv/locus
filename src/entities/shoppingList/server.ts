import { GroupServer } from 'entities/group';
import { ProductServer } from 'entities/product';
import { DateString } from 'typings/api';

export type ShoppingListServer = {
  id: number;
  name: string;
  description: string | null;
  purchaseDate: DateString | null;
  groupId: GroupServer['id'];
  shoppingListItems: ProductServer[];
};
