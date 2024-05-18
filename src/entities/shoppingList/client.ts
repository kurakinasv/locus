import { Group } from 'entities/group';
import { Product } from 'entities/product';

export type ShoppingList = {
  id: number;
  name: string;
  description: string | null;
  purchaseDate: string;
  groupId: Group['id'];
  products: Product[];
};
