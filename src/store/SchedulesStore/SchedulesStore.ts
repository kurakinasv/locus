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

    makeAutoObservable(this, {
      scheduledTasks: observable.ref,
    });
  }

  /** Map like { ['2024-01-01']: [ ScheduledTask1, ScheduledTask2... ], ['2024-02-01']: [...] } */
  get scheduleTasksDayMap(): Record<DateString, ScheduledTask[]> {
    return this.scheduledTasks.reduce(
      (acc, task) => {
        const taskDate = new Date(task.date);
        const dateKey = format(new Date(taskDate), 'yyyy-MM-dd');

        let restAcc = [] as ScheduledTask[];

        if (Object.keys(acc).length) {
          restAcc = acc[dateKey] ?? [];
        }

        return {
          ...acc,
          [dateKey]: [...restAcc, task],
        };
      },
      {} as Record<DateString, ScheduledTask[]>
    );
  }

  setActiveSchedule = (schedule: ScheduleItem | null) => {
    this.activeSchedule = schedule;
  };

  setScheduledTasks = (tasks: ScheduledTask[]) => {
    this.scheduledTasks = tasks;
  };

  getSchedule = async (scheduleId: ScheduleItem['id']) => {
    try {
      const response = await axios.get(ENDPOINTS.getSchedule.getUrl(String(scheduleId)), {
        withCredentials: true,
      });

      if (response.data) {
        runInAction(() => {
          this.setActiveSchedule(response.data);
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getGroupSchedules = async (params?: ScheduleTasksGetParams) => {
    try {
      let query = '';

      if (params?.name) {
        query = `${query}?name=${params.name.trim().toLowerCase()}`;
      }

      if (params?.range) {
        const { from, to } = params.range;

        const sym = query ? '&' : '?';

        const dateFrom = from ? cutTimezone(from).toISOString() : '';
        const dateTo = to ? cutTimezone(to).toISOString() : '';

        query = `${query}${sym}from=${dateFrom}&to=${dateTo}`;
      }

      const response = await axios.get<ScheduledTaskServer[]>(
        ENDPOINTS.getSchedules.getUrl(encodeURI(query)),
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        this.setScheduledTasks(response.data.map(normalizeScheduledTask));

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getScheduledTasks = async () => {
    try {
      const response = await axios.get<ScheduledTaskServer[]>(ENDPOINTS.getScheduledTasks.url, {
        withCredentials: true,
      });

      if (response.data) {
        this.setScheduledTasks(response.data.map(normalizeScheduledTask));

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

  editSchedule = async (params: ScheduleEditParams) => {
    try {
      const response = await axios.put<ScheduleItemServer>(
        ENDPOINTS.editSchedule.getUrl(String(params.scheduleId)),
        {
          dateEnd: params.dateEnd,
          userGroupIds: params.users?.map(
            (m) => this._rootStore.groupMemberStore.userGroupIdByUserId[m]
          ),
        },
        { withCredentials: true }
      );

      if (response.data) {
        await this.getGroupSchedules();

        runInAction(() => {
          this.activeSchedule = response.data;
        });

        this._rootStore.uiStore.snackbar.open(SnackbarType.scheduleEdited);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editScheduledTask = async (params: ScheduleTaskEditParams) => {
    try {
      const response = await axios.put<ScheduledTaskServer>(
        ENDPOINTS.editScheduledTask.getUrl(String(params.taskId)),
        {
          completed: params.completed,
          completedAt: cutTimezone(new Date()).toISOString(),
        } as ScheduleTaskEditBody,
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        runInAction(() => {
          this.scheduledTasks.forEach((t) => {
            if (t.id === params.taskId && params.completed !== undefined) {
              t.completed = params.completed;
            }
          });
        });

        if (params.completed !== undefined) {
          return;
        }

        this._rootStore.uiStore.snackbar.open(SnackbarType.taskEdited);
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
