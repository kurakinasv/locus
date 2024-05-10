import { makeAutoObservable } from 'mobx';

import { GroupMemberClient } from 'entities/groupMember';

class GroupMemberModel {
  groupId: GroupMemberClient['groupId'];
  debtAmount: GroupMemberClient['debtAmount'] = null;
  isAdmin: GroupMemberClient['isAdmin'] = false;

  constructor(groupMember: GroupMemberClient) {
    this.groupId = groupMember.groupId;
    this.debtAmount = groupMember.debtAmount;
    this.isAdmin = groupMember.isAdmin;

    makeAutoObservable(this);
  }
}

export default GroupMemberModel;
