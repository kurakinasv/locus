import { ExpenseStatus, SplitMethod } from 'config/expenses';
import { ExpenseCategoryServer } from 'entities/expenseCategory';
import { Group } from 'entities/group';
import { GroupMemberServer } from 'entities/groupMember';
import { User } from 'entities/user';
import { DateString, DefaultId } from 'typings/api';

export type ExpenseServer = {
  id: DefaultId;
  name: string;
  amount: number;
  currency: string;
  description: string | null;
  purchaseDate: DateString;
  splitMethod: SplitMethod;
  status: ExpenseStatus;
  createdBy: User['id'];
  groupId: Group['id'];
  categoryId: ExpenseCategoryServer['id'] | null;
  userGroups: GroupMemberServer[];
};
