import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api/endpoints';
import { axiosInstance } from 'config/api/requests';
import { SnackbarType } from 'config/snackbar';
import { GroupServer } from 'entities/group';
import { GroupMemberServer } from 'entities/groupMember';
import { EditProfileParams } from 'entities/user/params';
import { UserServer } from 'entities/user/server';
import GroupMemberModel from 'store/models/GroupMemberModel';
import MetaModel from 'store/models/MetaModel';
import { UserModel } from 'store/models/UserModel';
import RootStore from 'store/RootStore';
import { UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class UserStore {
  private readonly _rootStore: RootStore;

  readonly meta = {
    editProfile: new MetaModel(),
    joinGroup: new MetaModel(),
  };

  user: UserModel | null = null;
  inGroup = false;
  userDebtInGroup: number | null = null;
  userMemberships: GroupMemberModel[] = [];

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get userDebt() {
    // todo: add logic
    return this.userDebtInGroup;
  }

  get userGroups() {
    return this.userMemberships.map((membership) => membership.groupId);
  }

  setUser(user: UserModel | null) {
    this.user = user;
  }

  setInGroup = (inGroup: boolean) => {
    this.inGroup = inGroup;
  };

  setUserMemberships = (memberships: GroupMemberServer[]) => {
    this.userMemberships = memberships.map((membership) => new GroupMemberModel(membership));
  };

  getUser = async () => {
    try {
      const response = await axiosInstance.get<UserServer>(ENDPOINTS.getUser.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        this.setUser(new UserModel(response.data));

        await this.getUserDebtInGroup();

        return;
      }

      this._rootStore.uiStore.snackbar.open(SnackbarType.error);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editUser = async ({ name, surname, photo }: EditProfileParams) => {
    try {
      this.meta.editProfile.startLoading();

      const toSend = new FormData();

      if (photo !== undefined) {
        toSend.append('files', photo ?? '');
      }
      if (name !== undefined) {
        toSend.append('name', name.trim());
      }
      if (surname !== undefined) {
        toSend.append('surname', surname.trim());
      }

      const response = await axiosInstance.put<UserServer | null>(
        ENDPOINTS.editProfile.url,
        toSend,
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        this.meta.editProfile.setIsError(true);
        return;
      }

      // If no changes were made
      if (!response.data) {
        this.setUser(this.user);
        this.meta.editProfile.stopLoading();
        return;
      }

      this.setUser(new UserModel(response.data));
      this._rootStore.uiStore.snackbar.open(SnackbarType.profileEdited);
      this.meta.editProfile.stopLoading();
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
      this.meta.editProfile.setIsError(true);
    }
  };

  getUserDebtInGroup = async () => {
    try {
      const usersDebts = await this._rootStore.groupMemberStore.getGroupUserExpenses();

      if (!usersDebts) {
        return;
      }

      if (!usersDebts.length) {
        runInAction(() => {
          this.userDebtInGroup = 0;
        });
        return;
      }

      const userExpensesDebts = Object.entries(usersDebts).find(
        ([userId]) => userId === this.user?.id
      );

      if (!userExpensesDebts) {
        runInAction(() => {
          this.userDebtInGroup = 0;
        });
        return;
      }

      const debt = Object.values(userExpensesDebts[1]).reduce((debt, amount) => debt + amount, 0);

      runInAction(() => {
        this.userDebtInGroup = debt;
      });
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  deleteAccount = async () => {
    try {
      const response = await axios.post(ENDPOINTS.deleteAccount.url, {}, { withCredentials: true });

      if (responseIsOk(response)) {
        this._rootStore.authStore.setAuth(false);
        this._rootStore.userStore.setInGroup(false);
        this.setUser(null);

        return;
      }

      this._rootStore.uiStore.snackbar.open(SnackbarType.error);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  joinGroup = async (code: UUIDString) => {
    try {
      const response = await axios.post<{
        group: GroupServer;
        userInGroup: GroupMemberServer;
        userMemberships: GroupMemberServer[];
      }>(ENDPOINTS.joinGroup.url, { code }, { withCredentials: true });

      console.log('joinGroup', response.data.userMemberships);

      if (responseIsOk(response)) {
        this.setInGroup(true);
        this._rootStore.groupStore.setGroup(response.data.group);
        this._rootStore.groupMemberStore.setGroupMembers([
          ...this._rootStore.groupMemberStore.groupMembers,
          response.data.userInGroup,
        ]);
        this.setUserMemberships(response.data.userMemberships);

        return;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  /** Get current user's user group instances */
  getUserGroups = async () => {
    try {
      const response = await axios.get<GroupMemberServer[]>(ENDPOINTS.getUserGroups.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        runInAction(() => {
          this.setUserMemberships(response.data);
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default UserStore;
