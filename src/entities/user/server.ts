import { DateString } from 'typings/api';

export type UserServer = {
  id: string;
  name?: string;
  surname?: string;
  username: string;
  email: string;
  createdAt: DateString;
  updatedAt: DateString;
};
