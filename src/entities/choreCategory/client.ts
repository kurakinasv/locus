import { ChoreCategoryIcon } from 'entities/chore';
import { Group } from 'entities/group';
import { DefaultId } from 'typings/api';

export type ChoreCategory = {
  id: DefaultId;
  name: string;
  icon: ChoreCategoryIcon;
  isArchived: boolean;
  groupId: Group['id'];
};
