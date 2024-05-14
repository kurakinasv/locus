import { GroupMemberServer } from 'entities/groupMember';
import { ScheduleItemServer } from 'entities/schedule/server';
import { AutomaticFields, DateString, DefaultId } from 'typings/api';

export type ScheduledTaskServer = {
  id: DefaultId;
  date: DateString;
  completed: boolean;
  isAssigned: boolean;
  completedAt: DateString | null;
  scheduleId: ScheduleItemServer['id'];
  userGroupId: GroupMemberServer['id'] | null;
  schedule: { choreId: ScheduleItemServer['choreId'] };
} & AutomaticFields;
