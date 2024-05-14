import { ChoreCategoryIcon } from 'entities/chore';

export type CreateChoreCategory = {
  name: string;
  icon?: ChoreCategoryIcon;
};
