import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { CREATE_CATEGORY_OPTION, ScheduleFrequency } from 'config/chores';
import { SnackbarType } from 'config/snackbar';
import { Chore, ChoreCategory, ChoreCategoryIcon } from 'entities/chore';
import { MOCK_CHORES_CATEGORIES, MOCK_CHORE_LIST } from 'entities/mock/chores';
import { MOCK_SCHEDULE_LIST } from 'entities/mock/schedule';
import { MOCK_SCHEDULED_TASKS } from 'entities/mock/scheduledTasks';
import { ScheduleItem } from 'entities/schedule';
import { ScheduledTask } from 'entities/scheduledTask';
import RootStore from 'store/RootStore';
import { DefaultId, UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { sleep } from 'utils/sleep';

class ChoresStore {
  private readonly _rootStore: RootStore;

  chores: Chore[] = [];
  schedules: ScheduleItem[] = [];
  scheduledTasks: ScheduledTask[] = [];

  activeChore: Chore | null = null;
  activeSchedule: ScheduleItem | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get choresOptions() {
    const opts = this.chores.map((chore) => ({
      label: chore.name,
      value: String(chore.id),
    }));

    return opts;
  }

  setActiveSchedule = (schedule: ScheduleItem | null) => {
    this.activeSchedule = schedule;
  };

  getChore = async (id: DefaultId) => {
    try {
      // const response = await axios.get(ENDPOINTS.getChore.url(id), { withCredentials: true });
      await sleep(1000);
      const response = { data: MOCK_CHORE_LIST[id - 1] };

      if (response.data) {
        runInAction(() => {
          this.activeChore = response.data;
        });
        console.log('getChore', response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getChoresInGroup = async () => {
    try {
      // const response = await axios.get(ENDPOINTS.getChoresInGroup.url(groupId), { withCredentials: true });
      await sleep(1000);
      const response = { data: MOCK_CHORE_LIST };

      if (response.data) {
        runInAction(() => {
          this.chores = response.data;
        });
        console.log('getChoresInGroup', response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createChore = async ({
    name,
    points,
    categoryId,
  }: {
    name: string;
    points: number;
    categoryId: DefaultId | null;
  }) => {
    try {
      console.log('createChore', name, points, categoryId);

      const response = await axios.post(ENDPOINTS.createChore.url, {}, { withCredentials: true });
      await sleep(1000);

      if (response) {
        console.log('createChore', response);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editChore = async ({
    choreId,
    name,
    points,
    categoryId,
    isArchived,
  }: {
    choreId: DefaultId;
    name?: string;
    points?: number;
    categoryId?: DefaultId;
    isArchived?: boolean;
  }) => {
    try {
      console.log('editChore', choreId, name, points, categoryId, isArchived);

      // const response = await axios.post(ENDPOINTS.editChore.url, {}, { withCredentials: true });
      await sleep(1000);
      const response = { message: 'ok editChore' };

      if (response) {
        console.log('editChore', response);
        this._rootStore.uiStore.snackbar.open(SnackbarType.choreUpdated);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getSchedule = async (scheduleId: ScheduleItem['id']) => {
    try {
      // const response = await axios.get(ENDPOINTS.getSchedule.url(scheduleId), { withCredentials: true });
      await sleep(1000);
      const response = {
        data: MOCK_SCHEDULE_LIST.find((schedule) => schedule.id === scheduleId),
      };

      if (response.data) {
        runInAction(() => {
          this.activeSchedule = response.data ?? null;
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getGroupSchedules = async () => {
    try {
      // const response = await axios.get(ENDPOINTS.getGroupSchedules.url(), { withCredentials: true });
      await sleep(1000);
      const response = { data: MOCK_SCHEDULE_LIST };

      if (response.data) {
        runInAction(() => {
          this.schedules = response.data;
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getScheduledTasks = async () => {
    try {
      // const response = await axios.get(ENDPOINTS.getScheduledTasks.url(), { withCredentials: true });
      await sleep(1000);
      const response = { data: MOCK_SCHEDULED_TASKS };

      if (response.data) {
        runInAction(() => {
          this.scheduledTasks = response.data;
        });
        console.log('getScheduledTasks', response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createSchedule = async (params: {
    choreId: Chore['id'];
    frequency: ScheduleFrequency;
    dateFrom: Date;
    dateTo?: Date;
    users?: UUIDString[];
  }) => {
    try {
      console.log('createSchedule', params);

      // const response = await axios.post(
      //   ENDPOINTS.createSchedule.url,
      //   {},
      //   { withCredentials: true }
      // );

      await sleep(1000);
      const response = { message: 'ok createSchedule' };

      if (response) {
        console.log('createSchedule', response);
        this._rootStore.uiStore.snackbar.open(SnackbarType.scheduleCreated);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editSchedule = async (params: {
    scheduleId: ScheduleItem['id'];
    dateEnd?: Date;
    users?: UUIDString[];
  }) => {
    try {
      // const response = await axios.post(
      //   ENDPOINTS.createSchedule.url,
      //   {},
      //   { withCredentials: true }
      // );

      const foundSchedule = MOCK_SCHEDULE_LIST.find(
        (schedule) => schedule.id === params.scheduleId
      );

      if (!foundSchedule) {
        return;
      }

      await sleep(1000);
      const response: { data: ScheduleItem } = {
        data: {
          ...foundSchedule,
          dateStart:
            foundSchedule.frequency === 'never' && params.dateEnd
              ? params.dateEnd.toISOString()
              : foundSchedule.dateStart,
          dateEnd: params.dateEnd ? params.dateEnd.toISOString() : foundSchedule.dateEnd,
        },
      };

      if (response.data) {
        runInAction(() => {
          this.activeSchedule = response.data;
        });
        console.log('editSchedule', response.data);

        this._rootStore.uiStore.snackbar.open(SnackbarType.scheduleEdited);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  deleteSchedule = async (scheduleId: DefaultId) => {
    try {
      console.log('deleteSchedule', scheduleId);

      await sleep(1000);

      const response = { message: 'ok deleteSchedule' };

      if (response) {
        console.log('deleteSchedule', response);
        this._rootStore.uiStore.snackbar.open(SnackbarType.scheduleDeleted);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ChoresStore;
