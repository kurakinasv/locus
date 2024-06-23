import axios, { isAxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api/endpoints';
import { CustomErrorCode } from 'config/api/errorCodes';
import { SnackbarType } from 'config/snackbar';
import { GroupServer } from 'entities/group';
import { GroupMemberClient, GroupMemberServer } from 'entities/groupMember';
import { User } from 'entities/user';
import GroupMemberModel from 'store/models/GroupMemberModel';
import MetaModel from 'store/models/MetaModel';
import RootStore from 'store/RootStore';
import { DefaultId, UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { logError } from 'utils/logError';
import { responseIsOk } from 'utils/responseIsOk';

class GroupMemberStore {
  private readonly _rootStore: RootStore;

  readonly meta = {
    switchGroup: new MetaModel(),
  };

  groupMembers: GroupMemberModel[] = [];

  currentMember: GroupMemberModel | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get currentGroupMember() {
    const foundUser = this.groupMembers.find(
      (groupMember) => groupMember.userId === this._rootStore.userStore.user?.id
    );

    return foundUser ? new GroupMemberModel(foundUser) : null;
  }

  get userGroupIdByUserId(): Record<User['id'], GroupMemberClient['id']> {
    return this.groupMembers.reduce(
      (acc, groupMember) => ({
        ...acc,
        [groupMember.userId]: groupMember.id,
      }),
      {} as Record<UUIDString, UUIDString>
    );
  }

  get groupMemberByUserId(): Record<User['id'], GroupMemberModel> {
    return this.groupMembers.reduce(
      (acc, groupMember) => ({
        ...acc,
        [groupMember.userId]: groupMember,
      }),
      {} as Record<UUIDString, GroupMemberModel>
    );
  }

  get groupMembersIds(): GroupMemberModel['id'][] {
    return this.groupMembers.map((groupMember) => groupMember.userId);
  }

  setGroupMembers = (groupMembers: GroupMemberClient[]) => {
    this.groupMembers = groupMembers;
  };

  init = async () => {
    const groupsIds = await this._rootStore.userStore.getUserGroups();

    if (groupsIds?.length) {
      await this.getGroupMember();
      await this.getAllGroupMembers();
    }
  };

  /** Get current logged in group member for this user */
  getGroupMember = async () => {
    try {
      const response = await axios.get<GroupMemberServer | null>(ENDPOINTS.getCurrentGroup.url, {
        withCredentials: true,
      });

      const data = response.data;

      if (responseIsOk(response) && data !== null) {
        this._rootStore.userStore.setInGroup(true);
        runInAction(() => {
          this.currentMember = new GroupMemberModel(data);
        });
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.data.code === CustomErrorCode.userNotInAnyGroup) {
        return;
      }

      logError(error);
    }
  };

  /** Get members of the group user is currently logged in */
  getAllGroupMembers = async () => {
    try {
      const response = await axios.get<GroupMemberServer[]>(ENDPOINTS.getGroupMembers.url, {
        withCredentials: true,
      });

      if (responseIsOk(response) && response.data !== null) {
        this.setGroupMembers(response.data);
        this._rootStore.userStore.setInGroup(true);

        return response.data;
      }
    } catch (error) {
      // userNotInAnyGroup error
      if (isAxiosError(error) && error.response?.status === 400) {
        return;
      }

      logError(error);
    }
  };

  // todo: remove?
  /** Get expenses (debts) of all group members */
  getGroupUserExpenses = async () => {
    if (!this.groupMembersIds.length) {
      return;
    }

    try {
      // { userId: { expenseId: debtAmount }, userId2: { expenseId: debtAmount }, ...}
      const response = await axios.get<Record<UUIDString, Record<DefaultId, number>>>(
        ENDPOINTS.getGroupUserExpenses.url,
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        return response.data;
      }

      this._rootStore.uiStore.snackbar.open(SnackbarType.error);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  // todo: implement to ui
  exitGroup = async () => {
    try {
      const response = await axios.delete<{ message: string }>(ENDPOINTS.exitGroup.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        this._rootStore.userStore.setInGroup(false);
        return;
      }

      this._rootStore.uiStore.snackbar.open(SnackbarType.error);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  switchGroup = async (groupId: UUIDString) => {
    try {
      this.meta.switchGroup.startLoading();

      const response = await axios.put<{
        group: GroupServer;
        userInGroup: GroupMemberServer;
        members: GroupMemberServer[];
      }>(ENDPOINTS.switchGroup.url, { groupId }, { withCredentials: true });

      if (responseIsOk(response)) {
        this._rootStore.userStore.setInGroup(true);
        this._rootStore.groupStore.setGroup(response.data.group);
        this.setGroupMembers(response.data.members);

        runInAction(() => {
          this.currentMember = new GroupMemberModel(response.data.userInGroup);
        });

        this.meta.switchGroup.stopLoading();
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
      this.meta.switchGroup.setIsError(true);
    }
  };
}

export default GroupMemberStore;
