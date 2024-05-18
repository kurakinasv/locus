import { Group } from 'entities/group';
import { Product } from 'entities/product';
import { DateString } from 'typings/api';

export type ShoppingList = {
  id: number;
  name: string;
  description: string | null;
  purchaseDate: DateString | null;
  groupId: Group['id'];
  products: Product[];
};
