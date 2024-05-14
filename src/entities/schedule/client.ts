import { AlternatingMethod, ScheduleFrequency } from 'config/chores';
import { Chore } from 'entities/chore';
import { GroupMemberClient } from 'entities/groupMember';
import { DateString, DefaultId } from 'typings/api';

export type ScheduleItem = {
  id: DefaultId;
  choreId: Chore['id'];
  dateStart: DateString;
  dateEnd: DateString;
  frequency: ScheduleFrequency;
  alternatingMethod: AlternatingMethod;
  isArchived: boolean;
  userGroupIds: Array<GroupMemberClient['id']>;
  createdBy: GroupMemberClient['id'];
};
