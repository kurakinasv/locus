import { UUIDString } from 'typings/api';

export type GroupEditParams = {
  name?: string;
  image?: File | null;
  userToDeleteId?: UUIDString;
  changeRights?: UUIDString[];
  // TODO: add more fields
};
