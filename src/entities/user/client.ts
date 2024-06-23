import { DateString, UUIDString } from 'typings/api';

export type User = {
  id: UUIDString;
  name?: string;
  surname?: string;
  username: string;
  email: string;
  image: string | null;
  phone: string | null;
  birthday: DateString | null;
  // adminInGroups?: number[];
};
