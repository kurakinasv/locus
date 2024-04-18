export type Chore = {
  id: number;
  name: string;
  points: number;
  createdAt: string;
  category: ChoreCategory;
  groupId: number;
};

export type ChoreCategory = {
  id: number;
  name: string;
  createdAt: string;
};
