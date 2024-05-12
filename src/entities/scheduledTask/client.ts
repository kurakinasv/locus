import { GroupMemberClient } from 'entities/groupMember';
import { ScheduleItem } from 'entities/schedule';
import { DateString, DefaultId } from 'typings/api';

export type ScheduledTask = {
  id: DefaultId;
  date: DateString;
  completed: boolean;
  isAssigned: boolean;
  completedAt: DateString | null;
  scheduleId: ScheduleItem['id'];
  userGroupId: GroupMemberClient['id'] | null;
};
