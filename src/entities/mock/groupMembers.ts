import { GroupMemberServer } from 'entities/groupMember';

import { MOCK_USERS } from './user';

export const MOCK_GROUP_MEMBERS: GroupMemberServer[] = [
  {
    id: '1',
    userId: MOCK_USERS[0].id,
    groupId: '1',
    debtAmount: null,
    isAdmin: true,
    isLoggedIn: true,
    createdAt: '2022-10-20',
    updatedAt: '2024-10-20',
  },
  {
    id: '2',
    userId: MOCK_USERS[1].id,
    groupId: '1',
    debtAmount: null,
    isAdmin: false,
    isLoggedIn: true,
    createdAt: '2022-10-20',
    updatedAt: '2024-10-20',
  },
  {
    id: '3',
    userId: MOCK_USERS[2].id,
    groupId: '1',
    debtAmount: null,
    isAdmin: false,
    isLoggedIn: true,
    createdAt: '2022-10-20',
    updatedAt: '2024-10-20',
  },
];
