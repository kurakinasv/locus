import { GroupServer } from 'entities/group';
import { DefaultId } from 'typings/api';

import { ExpenseCategoryIcon } from './client';

export type ExpenseCategoryServer = {
  id: DefaultId;
  name: string;
  icon: ExpenseCategoryIcon | null;
  isArchived: boolean;
  groupId: GroupServer['id'];
};
