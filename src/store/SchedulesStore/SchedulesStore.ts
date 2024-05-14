import axios, { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { SnackbarType } from 'config/snackbar';
import { ScheduleItem } from 'entities/schedule';
import {
  ScheduleCreateBody,
  ScheduleCreateParams,
  ScheduleCreateResponse,
  ScheduleEditParams,
  ScheduleTaskEditBody,
  ScheduleTaskEditParams,
  ScheduleTasksGetParams,
} from 'entities/schedule/params';
import { ScheduleItemServer } from 'entities/schedule/server';
import { ScheduledTask, ScheduledTaskServer } from 'entities/scheduledTask';
import { normalizeScheduledTask } from 'entities/scheduledTask/normalizer';
import RootStore from 'store/RootStore';
import { DefaultId, DateString } from 'typings/api';
import { cutTimezone } from 'utils/formatDate';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

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

  setSchedules = (schedules: ScheduleItem[]) => {
    this.schedules = schedules;
  };

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

  createSchedule = async (params: ScheduleCreateParams) => {
    try {
      let members = this._rootStore.groupMemberStore.groupMembers;

      if (!members.length) {
        members = (await this._rootStore.groupMemberStore.getAllGroupMembers()) ?? [];
      }

      const userIdsToGroupMemberIds = members
        .filter((m) => params.users?.find((userId) => userId === m.userId))
        .map((m) => m.id);

      const dateFromString = cutTimezone(params.dateFrom).toISOString();
      const dateToString = cutTimezone(
        params.dateTo ? params.dateTo : params.dateFrom
      ).toISOString();

      const response = await axios.post<
        ScheduleCreateResponse,
        AxiosResponse<ScheduleCreateResponse>,
        ScheduleCreateBody
      >(
        ENDPOINTS.createSchedule.url,
        {
          choreId: params.choreId,
          frequency: params.frequency,
          dateStart: dateFromString,
          dateEnd: dateToString,
          userGroupIds: userIdsToGroupMemberIds,
        },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setSchedules([...this.schedules, response.data.schedule]);
        this.setScheduledTasks(response.data.tasks.map(normalizeScheduledTask));

        this._rootStore.uiStore.snackbar.open(SnackbarType.scheduleCreated);

        return true;
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
      const response = await axios.delete<{ message: string }>(
        ENDPOINTS.deleteScheduleCascade.getUrl(String(scheduleId)),
        { withCredentials: true }
      );

      if (response) {
        this.setSchedules(this.schedules.filter((s) => s.id !== scheduleId));
        await this.getScheduledTasks();
        this._rootStore.uiStore.snackbar.open(SnackbarType.scheduleDeleted);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default SchedulesStore;
