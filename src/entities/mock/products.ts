import { ProductType } from 'entities/product';

export const MOCK_PRODUCTS: ProductType[] = [
  {
    id: 1,
    name: 'Молоко',
    price: 500,
    bought: true,
    icon: '🥛',
  },
  {
    id: 2,
    name: 'Хлеб',
    price: 1000,
    bought: false,
    icon: '🍞',
  },
  {
    id: 3,
    name: 'Масло',
    price: 7.99,
    icon: '🍞',
    bought: false,
  },
  {
    id: 4,
    name: 'Мука',
    price: 12.99,
    icon: '🍞',
    bought: true,
  },
  {
    id: 5,
    name: 'Сахар',
    price: 9.99,
    icon: '🍞',
    bought: false,
  },
];
