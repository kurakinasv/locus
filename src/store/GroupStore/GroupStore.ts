import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS, STATIC_URL } from 'config/api';
import { SnackbarType } from 'config/snackbar';
import { GroupEditParams } from 'entities/group';
import { GroupServer } from 'entities/group/server';
import { GroupMemberServer } from 'entities/groupMember';
import GroupModel from 'store/models/GroupModel';
import RootStore from 'store/RootStore/RootStore';
import { UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class GroupStore {
  private readonly _rootStore: RootStore;

  group: GroupModel | null = null;

  inviteCode: string | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setGroup = (group: GroupModel | null) => {
    this.group = group ? new GroupModel(group) : null;
  };

  getGroup = async (groupId: UUIDString) => {
    try {
      const response = await axios.get<GroupServer>(ENDPOINTS.getGroup.getUrl!(groupId), {
        withCredentials: true,
      });

      if (!responseIsOk(response)) {
        return;
      }

      const image = response.data.image
        ? `${STATIC_URL}/${response.data.image}`
        : response.data.image;
      this.setGroup({ ...response.data, image });

      this._rootStore.groupMemberStore.setGroupMembers(
        response.data.users.map((u) => u?.UserGroup)
      );

      return response.data;
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createGroup = async (name: string) => {
    try {
      const response = await axios.post<{ group: GroupServer; userInGroup: GroupMemberServer }>(
        ENDPOINTS.createGroup.url,
        { name },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this._rootStore.userStore.setInGroup(true);
        this.setGroup(response.data.group);
        this._rootStore.groupMemberStore.setGroupMembers([response.data.userInGroup]);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editGroup = async ({ name, image }: GroupEditParams) => {
    try {
      const toSend = new FormData();

      if (image) {
        toSend.append('files', image);
      }
      if (name) {
        toSend.append('name', name);
      }
      // todo: delete group member

      // todo: change group member rights

      const response = await axios.put<GroupServer>(ENDPOINTS.editGroup.url, toSend, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        this.setGroup(response.data);
        this._rootStore.uiStore.snackbar.open(SnackbarType.groupEdited);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  // todo: implement to ui
  deleteGroup = async () => {
    try {
      const response = await axios.delete<GroupServer>(ENDPOINTS.deleteGroup.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        this._rootStore.userStore.setInGroup(false);
        this.setGroup(null);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  generateInviteCode = async () => {
    try {
      const response = await axios.put<{
        inviteCode: GroupServer['inviteCode'];
        inviteExpiresAt: GroupServer['inviteExpiresAt'];
      }>(
        ENDPOINTS.generateInviteCode.url,
        {},
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        runInAction(() => {
          this.inviteCode = response.data.inviteCode;
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default GroupStore;
