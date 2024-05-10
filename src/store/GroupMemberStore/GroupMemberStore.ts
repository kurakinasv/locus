import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { SnackbarType } from 'config/snackbar';
import { GroupMemberClient, GroupMemberServer } from 'entities/groupMember';
import GroupMemberModel from 'store/models/GroupMemberModel';
import RootStore from 'store/RootStore';
import { DefaultId, UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class GroupMemberStore {
  private readonly _rootStore: RootStore;

  groupMember: GroupMemberModel | null = null;

  userGroupIds: UUIDString[] = [];

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setGroupMember(groupMember: GroupMemberClient | null) {
    this.groupMember = groupMember ? new GroupMemberModel(groupMember) : null;
  }

  init = async () => {
    const groupsIds = await this._rootStore.groupMemberStore.getUserGroups();

    if (groupsIds?.length) {
      await this._rootStore.groupMemberStore.getGroupMember();
    }
  };

  /** Get current logged in group member for this user */
  getGroupMember = async () => {
    try {
      const response = await axios.get<GroupMemberServer | null>(ENDPOINTS.getCurrentGroup.url, {
        withCredentials: true,
      });

      if (responseIsOk(response) && response.data !== null) {
        this._rootStore.userStore.setInGroup(true);
        this.setGroupMember(response.data);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getUserGroups = async () => {
    try {
      const response = await axios.get<UUIDString[]>(ENDPOINTS.getUserGroups.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        runInAction(() => {
          this.userGroupIds = response.data;
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getGroupUserExpenses = async () => {
    if (!this.userGroupIds.length) {
      return;
    }

    try {
      // { userId: { expenseId: debtAmount }, userId2: { expenseId: debtAmount }, ...}
      const response = await axios.get<Record<UUIDString, Record<DefaultId, number>>>(
        ENDPOINTS.getGroupUserExpenses.url,
        {
          withCredentials: true,
        }
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
}

export default GroupMemberStore;
