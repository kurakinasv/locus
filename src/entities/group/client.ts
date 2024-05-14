import { User } from 'entities/user';
import { DateString, UUIDString } from 'typings/api';

export type Group = {
  id: UUIDString;
  name: string;
  image: string | null;
  inviteCode: string | null;
  inviteExpiresAt: DateString | null;
  users: User[];
};
