import { AutomaticFields, UUIDString } from 'typings/api';

export type GroupMemberServer = {
  id: UUIDString;
  userId: UUIDString;
  groupId: UUIDString;
  debtAmount: number | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
} & AutomaticFields;
