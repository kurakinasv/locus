import { ScheduledTask } from 'entities/scheduledTask';

import { MOCK_GROUP_MEMBERS } from './groupMembers';
import { MOCK_SCHEDULE_LIST } from './schedule';

export const MOCK_SCHEDULED_TASKS: ScheduledTask[] = [
  {
    id: 1,
    date: '2024-06-05',
    completed: false,
    isAssigned: true,
    completedAt: null,
    scheduleId: MOCK_SCHEDULE_LIST[0].id,
    userGroupId: MOCK_GROUP_MEMBERS[0].id,
  },
  {
    id: 2,
    date: '2024-06-05',
    completed: false,
    isAssigned: true,
    completedAt: null,
    scheduleId: MOCK_SCHEDULE_LIST[1].id,
    userGroupId: MOCK_GROUP_MEMBERS[1].id,
  },
  {
    id: 3,
    date: '2024-05-05',
    completed: false,
    isAssigned: true,
    completedAt: null,
    scheduleId: MOCK_SCHEDULE_LIST[2].id,
    userGroupId: MOCK_GROUP_MEMBERS[2].id,
  },
  {
    id: 4,
    date: '2024-05-12',
    completed: true,
    isAssigned: true,
    completedAt: '2024-05-12',
    scheduleId: MOCK_SCHEDULE_LIST[0].id,
    userGroupId: MOCK_GROUP_MEMBERS[1].id,
  },
  {
    id: 5,
    date: '2024-04-05',
    completed: true,
    isAssigned: true,
    completedAt: '2024-04-05',
    scheduleId: MOCK_SCHEDULE_LIST[1].id,
    userGroupId: MOCK_GROUP_MEMBERS[0].id,
  },
];
