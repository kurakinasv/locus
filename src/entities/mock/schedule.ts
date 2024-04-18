import { ScheduleItem } from 'entities/schedule';

import { MOCK_CHORE_LIST } from './chores';

export const MOCK_SCHEDULE_LIST: ScheduleItem[] = [
  {
    id: 1,
    frequency: 'Daily',
    dateStart: '2021-01-01',
    dateEnd: '2021-01-31',
    createdAt: '2021-01-01',
    createdBy: 'John Doe',
    chore: MOCK_CHORE_LIST[0],
    completed: false,
  },
  {
    id: 2,
    frequency: 'Weekly',
    dateStart: '2021-01-01',
    dateEnd: '2021-01-31',
    createdAt: '2021-01-01',
    createdBy: 'John Doe',
    chore: MOCK_CHORE_LIST[1],
    completed: true,
  },
  {
    id: 3,
    frequency: 'Monthly',
    dateStart: '2021-01-01',
    dateEnd: '2021-01-31',
    createdAt: '2021-01-01',
    createdBy: 'John Doe',
    chore: MOCK_CHORE_LIST[2],
    completed: false,
  },
];
