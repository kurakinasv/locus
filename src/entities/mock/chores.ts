import { Chore, ChoreCategory } from 'entities/chore';

export const MOCK_CHORES_CATEGORIES: ChoreCategory[] = [
  {
    id: 1,
    name: 'Кухня',
    createdAt: '2021-01-01',
  },
  {
    id: 2,
    name: 'Гостиная',
    createdAt: '2021-01-01',
  },
  {
    id: 3,
    name: 'Мусор',
    createdAt: '2021-01-01',
  },
];

export const MOCK_CHORE_LIST: Chore[] = [
  {
    id: 1,
    name: 'Помыть посуду',
    points: 5,
    createdAt: '2021-01-01',
    category: MOCK_CHORES_CATEGORIES[0],
    groupId: 1,
  },
  {
    id: 2,
    name: 'Пропылесосить гостиную',
    points: 10,
    createdAt: '2021-01-01',
    category: MOCK_CHORES_CATEGORIES[1],
    groupId: 1,
  },
  {
    id: 3,
    name: 'Вынести мусор',
    points: 5,
    createdAt: '2021-01-01',
    category: MOCK_CHORES_CATEGORIES[2],
    groupId: 1,
  },
];
