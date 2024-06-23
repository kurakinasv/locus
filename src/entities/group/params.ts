import { UUIDString } from 'typings/api';

export type GroupEditParams = {
  name?: string;
  image?: File | null;
  userToDeleteId?: UUIDString;
  admins?: UUIDString[];
};
