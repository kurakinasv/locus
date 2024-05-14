import { DateRange } from 'react-day-picker';

import { AlternatingMethod, ScheduleFrequency } from 'config/chores';
import { Chore } from 'entities/chore';
import { GroupMemberClient } from 'entities/groupMember';
import { ScheduledTask, ScheduledTaskServer } from 'entities/scheduledTask';
import { DateString, UUIDString } from 'typings/api';

import { ScheduleItem } from './client';
import { ScheduleItemServer } from './server';

export type ScheduleCreateParams = {
  choreId: Chore['id'];
  frequency: ScheduleFrequency;
  dateFrom: Date;
  dateTo?: Date;
  users?: UUIDString[];
};

export type ScheduleCreateBody = {
  choreId: Chore['id'];
  frequency: ScheduleFrequency;
  dateStart: DateString;
  dateEnd?: DateString;
  userGroupIds: Array<GroupMemberClient['id']>;
  alternatingMethod?: AlternatingMethod;
};

export type ScheduleCreateResponse = {
  schedule: ScheduleItemServer;
  tasks: ScheduledTaskServer[];
};

export type ScheduleEditParams = {
  scheduleId: ScheduleItem['id'];
  dateEnd?: Date;
  users?: UUIDString[];
};

export type ScheduleTasksGetParams = {
  name?: string;
  choreId?: ScheduleItem['choreId'];
  range?: DateRange;
};

export type ScheduleTaskEditParams = {
  taskId: ScheduledTask['id'];
  completed?: boolean;
  completedAt?: DateString | null;
  isAssigned?: ScheduledTask['isAssigned'];
};

export type ScheduleTaskEditBody = {
  completed?: boolean;
  completedAt?: DateString | null;
  isAssigned?: ScheduledTask['isAssigned'];
};
