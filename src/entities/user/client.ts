export type User = {
  id: number;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  birthday?: string;
  createdAt: string;
  adminInGroups?: number[];
};
