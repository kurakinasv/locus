import { Chore, ChoreCategory } from 'entities/chore';

export const MOCK_CHORES_CATEGORIES: ChoreCategory[] = [
  {
    id: 1,
    name: 'Кухня',
    icon: 'kitchenSet',
    isArchived: false,
  },
  {
    id: 2,
    name: 'Гостиная',
    icon: 'plant',
    isArchived: false,
  },
  {
    id: 3,
    name: 'Мусор',
    icon: 'trash',
    isArchived: false,
  },
];

export const MOCK_CHORE_LIST: Chore[] = [
  {
    id: 1,
    name: 'Помыть посуду',
    points: 5,
    category: MOCK_CHORES_CATEGORIES[0],
    groupId: 1,
    isArchived: false,
  },
  {
    id: 2,
    name: 'Пропылесосить гостиную',
    points: 10,
    category: MOCK_CHORES_CATEGORIES[1],
    groupId: 1,
    isArchived: false,
  },
  {
    id: 3,
    name: 'Вынести мусор',
    points: 5,
    category: MOCK_CHORES_CATEGORIES[2],
    groupId: 1,
    isArchived: false,
  },
];
