import { Product } from './client';

export type CreateListItemParams = {
  name: Product['name'];
  price?: Product['price'];
};

export type EditListItemParams = {
  listItemId: Product['id'];
  name?: Product['name'];
  price?: Product['price'];
  bought?: Product['bought'];
};

export type EditBodyParams = {
  name?: Product['name'];
  price?: Product['price'];
  checked?: Product['bought'];
};
