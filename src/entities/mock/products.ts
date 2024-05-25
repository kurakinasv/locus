import { Product } from 'entities/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Молоко',
    price: 500,
    bought: true,
    shoppingListId: 1,
  },
  {
    id: 2,
    name: 'Хлеб',
    price: 1000,
    bought: false,
    shoppingListId: 1,
  },
  {
    id: 3,
    name: 'Масло',
    price: 7.99,
    bought: false,
    shoppingListId: 1,
  },
  {
    id: 4,
    name: 'Мука',
    price: 12.99,
    bought: true,
    shoppingListId: 1,
  },
  {
    id: 5,
    name: 'Сахар',
    price: 9.99,
    bought: false,
    shoppingListId: 1,
  },
];
