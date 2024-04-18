import { Chore } from 'entities/chore';

export type ScheduleItem = {
  id: number;
  frequency: string;
  dateStart?: string;
  dateEnd: string;
  createdAt: string;
  createdBy: string;
  chore: Chore;
  completed: boolean;
};
