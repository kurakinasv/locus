import { AutomaticFields, DefaultId, UUIDString } from 'typings/api';

import { ChoreCategoryIcon } from './client';

export type ChoreServer = {
  id: DefaultId;
  name: string;
  points: number;
  isArchived: boolean;
  categoryId: DefaultId;
  groupId: UUIDString;
} & AutomaticFields;

export type ChoreCategoryServer = {
  id: DefaultId;
  name: string;
  icon: ChoreCategoryIcon;
  isArchived: boolean;
} & AutomaticFields;
