import { makeAutoObservable } from 'mobx';

import { Group } from 'entities/group/client';

class GroupModel implements Group {
  id: Group['id'];
  name: Group['name'];
  image: Group['image'];
  inviteCode: Group['inviteCode'];
  inviteExpiresAt: Group['inviteExpiresAt'];
  users: Group['users'];

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
    this.image = group.image;
    this.inviteCode = group.inviteCode;
    this.inviteExpiresAt = group.inviteExpiresAt;
    this.users = group.users;

    makeAutoObservable(this);
  }
}

export default GroupModel;
