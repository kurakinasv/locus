import { ScheduleItem } from 'entities/schedule';

import { MOCK_CHORE_LIST } from './chores';
import { MOCK_GROUP_MEMBERS } from './groupMembers';
import { MOCK_USERS } from './user';

export const MOCK_SCHEDULE_LIST: ScheduleItem[] = [
  {
    id: 1,
    frequency: 'daily',
    dateStart: '2024-02-01',
    dateEnd: '2024-05-31',
    createdBy: MOCK_USERS[0].id,
    choreId: MOCK_CHORE_LIST[0].id,
    alternatingMethod: 'one-by-one',
    isArchived: false,
    userGroupIds: [MOCK_GROUP_MEMBERS[0].id, MOCK_GROUP_MEMBERS[1].id],
  },
  {
    id: 2,
    frequency: 'weekly',
    dateStart: '2024-02-01',
    dateEnd: '2024-05-31',
    createdBy: MOCK_USERS[1].id,
    choreId: MOCK_CHORE_LIST[1].id,
    alternatingMethod: 'one-by-one',
    isArchived: false,
    userGroupIds: [MOCK_GROUP_MEMBERS[0].id],
  },
  {
    id: 3,
    frequency: 'monthly',
    dateStart: '2024-02-01',
    dateEnd: '2024-05-31',
    createdBy: MOCK_USERS[2].id,
    choreId: MOCK_CHORE_LIST[2].id,
    alternatingMethod: 'one-by-one',
    isArchived: false,
    userGroupIds: [MOCK_GROUP_MEMBERS[1].id],
  },
];
