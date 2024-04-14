import { ProductType } from 'entities/product';

export type ShoppingList = {
  id: number;
  name: string;
  products: ProductType[];
  purchaseDate: string;
};
