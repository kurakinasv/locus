import { DateRange } from 'react-day-picker';

import { AlternatingMethod, ScheduleFrequency } from 'config/chores';
import { Chore } from 'entities/chore';
import { DateString, UUIDString } from 'typings/api';

import { ScheduleItem } from './client';

export type ScheduleCreateParams = {
  choreId: Chore['id'];
  frequency: ScheduleFrequency;
  dateFrom: Date;
  dateTo?: Date;
  users?: UUIDString[];
};


export type ScheduleTasksGetParams = {
  name?: string;
  choreId?: ScheduleItem['choreId'];
  range?: DateRange;
};
