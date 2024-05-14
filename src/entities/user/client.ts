import { UUIDString } from 'typings/api';

export type User = {
  id: UUIDString;
  name?: string;
  surname?: string;
  username: string;
  email: string;
  // image?: string;
  // phone?: string;
  // birthday?: string;
  // createdAt: string;
  // adminInGroups?: number[];
};
