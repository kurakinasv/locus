import { AutomaticFields, UUIDString } from 'typings/api';

export type GroupMemberServer = {
  groupId: UUIDString;
  debtAmount: number | null;
  isAdmin: boolean;
} & AutomaticFields;
