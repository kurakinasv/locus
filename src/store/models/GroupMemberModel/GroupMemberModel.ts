import { makeAutoObservable } from 'mobx';

import { GroupMemberClient } from 'entities/groupMember';
import { User } from 'entities/user';

class GroupMemberModel implements GroupMemberClient {
  id: GroupMemberClient['id'];
  groupId: GroupMemberClient['groupId'];
  debtAmount: GroupMemberClient['debtAmount'] = null;
  isAdmin: GroupMemberClient['isAdmin'] = false;
  userId: User['id'];
  isLoggedIn: GroupMemberClient['isLoggedIn'] = false;

  constructor(groupMember: GroupMemberClient) {
    this.id = groupMember.id;
    this.groupId = groupMember.groupId;
    this.debtAmount = groupMember.debtAmount;
    this.isAdmin = groupMember.isAdmin;
    this.userId = groupMember.userId;
    this.isLoggedIn = groupMember.isLoggedIn;

    makeAutoObservable(this);
  }
}

export default GroupMemberModel;
