import { GroupMemberServer } from 'entities/groupMember';
import { UserServer } from 'entities/user/server';
import { AutomaticFields, DateString, UUIDString } from 'typings/api';

export type GroupServer = {
  id: UUIDString;
  name: string;
  image: string | null;
  inviteCode: string | null;
  inviteExpiresAt: DateString | null;
  users: Array<
    {
      UserGroup: GroupMemberServer;
    } & UserServer
  >;
} & AutomaticFields;
