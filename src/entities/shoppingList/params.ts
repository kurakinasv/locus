import { ShoppingList } from './client';

export type ListCreateParams = {
  name: string;
  description?: string;
  purchaseDate?: Date;
};

export type ListEditParams = {
  id: ShoppingList['id'];
  name?: string;
  description?: string;
  purchaseDate?: Date;
};
