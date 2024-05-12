import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { ScheduleFrequency } from 'config/chores';
import { SnackbarType } from 'config/snackbar';
import { Chore } from 'entities/chore';
import { ChoreCreateParams, ChoreEditParams, ChoresGetParams } from 'entities/chore/params';
import { ChoreServer } from 'entities/chore/server';
import { MOCK_SCHEDULE_LIST } from 'entities/mock/schedule';
import { ScheduleItem } from 'entities/schedule';
import { ScheduledTask } from 'entities/scheduledTask';
import RootStore from 'store/RootStore';
import { DefaultId, UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';
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

  setChores = (chores: Chore[]) => {
    this.chores = chores.filter((chore) => chore.isArchived === false);
  };

  getChore = async (id: DefaultId) => {
    try {
      const response = await axios.get(ENDPOINTS.getChore.getUrl!(String(id)), {
        withCredentials: true,
      });

      if (response.data) {
        runInAction(() => {
          this.activeChore = response.data;
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getChoresInGroup = async (params: ChoresGetParams) => {
    try {
      let query = '';

      if (params?.name) {
        query = `${query}?name=${params.name.trim().toLowerCase()}`;
      }
      if (params?.categoryId) {
        const sym = query ? '&' : '?';
        query = `${query}${sym}categoryId=${params.categoryId}`;
      }

      const response = await axios.get(ENDPOINTS.getChoresInGroup.getUrl!(encodeURI(query)), {
        withCredentials: true,
      });

      if (response.data) {
        this.setChores(response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createChore = async ({ name, points, categoryId }: ChoreCreateParams) => {
    try {
      const response = await axios.post(
        ENDPOINTS.createChore.url,
        {
          name: name.trim(),
          points,
          categoryId,
        },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setChores([...this.chores, response.data]);

        this._rootStore.uiStore.snackbar.open(SnackbarType.choreCreated);

        return true;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editChore = async ({ choreId, name, points, categoryId, isArchived }: ChoreEditParams) => {
    try {
      const response = await axios.put<ChoreServer[]>(
        ENDPOINTS.editChore.getUrl!(String(choreId)),
        { name: name?.trim(), points, categoryId, isArchived },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setChores(response.data);

        this._rootStore.uiStore.snackbar.open(SnackbarType.choreUpdated);

        return true;
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
      const response = { data: [] };

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
