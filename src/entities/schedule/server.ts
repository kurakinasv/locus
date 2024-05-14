import { AlternatingMethod, ScheduleFrequency } from 'config/chores';
import { ChoreServer } from 'entities/chore/server';
import { GroupMemberServer } from 'entities/groupMember';
import { AutomaticFields, DateString, DefaultId } from 'typings/api';

export type ScheduleItemServer = {
  id: DefaultId;
  choreId: ChoreServer['id'];
  dateStart: DateString;
  dateEnd: DateString;
  frequency: ScheduleFrequency;
  alternatingMethod: AlternatingMethod;
  isArchived: boolean;
  userGroupIds: Array<GroupMemberServer['id']>;
  createdBy: GroupMemberServer['id'];
} & AutomaticFields;
