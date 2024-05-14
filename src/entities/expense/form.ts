import { UUIDString } from 'typings/api';

export type CreateFormValues = {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
  userIds: UUIDString;
};

export type EditFormValues = {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
  userIds: UUIDString;
};

export type DebtFormValues = {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
  userIds: UUIDString;
};
