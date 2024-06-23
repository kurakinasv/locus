import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api/endpoints';
import { SnackbarType } from 'config/snackbar';
import { GroupEditParams } from 'entities/group';
import { GroupServer } from 'entities/group/server';
import { GroupMemberServer } from 'entities/groupMember';
import GroupModel from 'store/models/GroupModel';
import MetaModel from 'store/models/MetaModel';
import RootStore from 'store/RootStore/RootStore';
import { UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class GroupStore {
  private readonly _rootStore: RootStore;

  readonly meta = {
    createGroup: new MetaModel(),
    switchGroup: new MetaModel(),
    editGroup: new MetaModel(),
    deleteGroup: new MetaModel(),
  };

  group: GroupModel | null = null;

  inviteCode: string | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setGroup = (group: GroupModel | null) => {
    this.group = group ? new GroupModel(group) : null;
  };

  /** Gets group by id and set group and members */
  loadGroup = async (groupId: UUIDString): Promise<GroupModel | void> => {
    try {
      const response = await axios.get<GroupServer>(ENDPOINTS.getGroup.getUrl!(groupId), {
        withCredentials: true,
      });

      if (!responseIsOk(response)) {
        return;
      }

      this.setGroup(response.data);

      this._rootStore.groupMemberStore.setGroupMembers(
        response.data.users.map((u) => u?.UserGroup)
      );

      return new GroupModel(response.data);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  /** Gets group by id */
  getGroup = async (groupId: UUIDString): Promise<GroupModel | void> => {
    try {
      const response = await axios.get<GroupServer>(ENDPOINTS.getGroup.getUrl!(groupId), {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        return new GroupModel(response.data);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createGroup = async (name: string) => {
    try {
      this.meta.createGroup.startLoading();

      const response = await axios.post<{
        group: GroupServer;
        userInGroup: GroupMemberServer;
        userMemberships: GroupMemberServer[];
      }>(ENDPOINTS.createGroup.url, { name }, { withCredentials: true });

      if (responseIsOk(response)) {
        this._rootStore.userStore.setInGroup(true);
        this.setGroup(response.data.group);
        this._rootStore.groupMemberStore.setGroupMembers([response.data.userInGroup]);
        this._rootStore.userStore.setUserMemberships(response.data.userMemberships);

        this.meta.createGroup.stopLoading();
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
      this.meta.createGroup.setIsError(true);
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

  deleteUserFromGroup = async (userToDeleteId: GroupEditParams['userToDeleteId']) => {
    try {
      this.meta.editGroup.setIsError(false);
      this.meta.editGroup.startLoading();

      const response = await axios.put<GroupServer>(
        ENDPOINTS.editGroup.url,
        { userToDeleteId },
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        this.meta.editGroup.setIsError(true);

        return;
      }

      this.setGroup(response.data);
      this._rootStore.groupMemberStore.setGroupMembers(
        this._rootStore.groupMemberStore.groupMembers.filter((u) => u.id !== userToDeleteId)
      );

      this.meta.editGroup.stopLoading();
      this._rootStore.uiStore.snackbar.open(SnackbarType.userRemovedFromGroup);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
      this.meta.editGroup.setIsError(true);
    }
  };

  editAdmins = async (admins: GroupEditParams['admins']) => {
    try {
      this.meta.editGroup.setIsError(false);
      this.meta.editGroup.startLoading();

      const response = await axios.put<GroupServer>(
        ENDPOINTS.editGroup.url,
        { admins },
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        this.meta.editGroup.setIsError(true);

        return;
      }

      this.setGroup(response.data);
      this._rootStore.groupMemberStore.setGroupMembers(
        response.data.users.map((u) => u?.UserGroup)
      );

      this.meta.editGroup.stopLoading();
      this._rootStore.uiStore.snackbar.open(SnackbarType.adminsEdited);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
      this.meta.editGroup.setIsError(true);
    }
  };

  deleteGroup = async () => {
    try {
      this.meta.deleteGroup.startLoading();

      const response = await axios.delete<{ message: string }>(ENDPOINTS.deleteGroup.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        this._rootStore.userStore.setInGroup(false);
        this.setGroup(null);
      }

      this.meta.deleteGroup.stopLoading();
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
      this.meta.deleteGroup.setIsError(true);
    }
  };

  generateInviteCode = async () => {
    try {
      const response = await axios.put<{
        inviteCode: GroupServer['inviteCode'];
        inviteExpiresAt: GroupServer['inviteExpiresAt'];
      }>(ENDPOINTS.generateInviteCode.url, {}, { withCredentials: true });

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
