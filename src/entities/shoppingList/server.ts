import { GroupServer } from 'entities/group';
import { ProductServer } from 'entities/product';

export type ShoppingListServer = {
  id: number;
  name: string;
  description: string | null;
  purchaseDate: string;
  groupId: GroupServer['id'];
  shoppingListItems: ProductServer[];
};
