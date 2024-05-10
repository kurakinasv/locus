import { AutomaticFields } from 'typings/api';

export type UserServer = {
  id: string;
  name?: string;
  surname?: string;
  username: string;
  email: string;
} & AutomaticFields;
