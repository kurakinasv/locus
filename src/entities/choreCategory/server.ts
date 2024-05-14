import { ChoreCategoryIcon } from 'entities/chore';
import { GroupServer } from 'entities/group';
import { DefaultId } from 'typings/api';

export type ChoreCategoryServer = {
  id: DefaultId;
  name: string;
  icon: ChoreCategoryIcon;
  isArchived: boolean;
  groupId: GroupServer['id'];
};
