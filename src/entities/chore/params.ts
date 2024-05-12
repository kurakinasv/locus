import { Chore, ChoreCategory } from './client';

export type ChoreCreateParams = {
  name: Chore['name'];
  points?: Chore['points'];
  categoryId: ChoreCategory['id'] | null;
};

export type ChoreEditParams = {
  choreId: Chore['id'];
  name?: Chore['name'];
  points?: Chore['points'];
  categoryId?: ChoreCategory['id'];
  isArchived?: Chore['isArchived'];
};
