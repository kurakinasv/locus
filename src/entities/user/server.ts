import { AutomaticFields } from 'typings/api';

export type UserServer = {
  id: string;
  name?: string;
  surname?: string;
  username: string;
  email: string;
  image: string | null;
  phone: string | null;
  birthday: string | null;
} & AutomaticFields;
