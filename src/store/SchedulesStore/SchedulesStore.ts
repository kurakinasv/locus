import { makeAutoObservable, runInAction } from 'mobx';

import { ScheduleFrequency } from 'config/chores';
import { SnackbarType } from 'config/snackbar';
import { Chore } from 'entities/chore';
import { MOCK_SCHEDULE_LIST } from 'entities/mock/schedule';
import { ScheduleItem } from 'entities/schedule';
import { ScheduledTask } from 'entities/scheduledTask';
import RootStore from 'store/RootStore';
import { UUIDString, DefaultId } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { sleep } from 'utils/sleep';

class SchedulesStore {
  private readonly _rootStore: RootStore;

  schedules: ScheduleItem[] = [];
  scheduledTasks: ScheduledTask[] = [];

  activeSchedule: ScheduleItem | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setActiveSchedule = (schedule: ScheduleItem | null) => {
    this.activeSchedule = schedule;
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

export default SchedulesStore;
