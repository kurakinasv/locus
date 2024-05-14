import { UUIDString } from 'typings/api';

export type GroupMemberClient = {
  id: UUIDString;
  userId: UUIDString;
  groupId: UUIDString;
  debtAmount: number | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
};
