import { UUIDString } from 'typings/api';

export type GroupMemberClient = {
  groupId: UUIDString;
  debtAmount: number | null;
  isAdmin: boolean;
};
