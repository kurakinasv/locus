import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api/endpoints';
import { NotificationClient, normalizeNotification } from 'entities/notification';
import { GetNotificationsSingleResponse } from 'entities/notification/types';
import MetaModel from 'store/models/MetaModel';
import NotificationModel from 'store/models/NotificationModel';
import RootStore from 'store/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class NotificationsStore {
  private readonly _rootStore: RootStore;

  readonly loadMeta = new MetaModel();

  notifications: NotificationModel[] = [];

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get notificationsEntries() {
    return this.notifications.reduce(
      (acc, notification) => {
        acc[notification.id] = notification;
        return acc;
      },
      {} as Record<string, NotificationModel>
    );
  }

  setNotifications = (notifications: NotificationClient[]) => {
    this.notifications = notifications.map((n) => new NotificationModel(n));
  };

  loadNotifications = async () => {
    try {
      this.loadMeta.startLoading();

      const response = await axios.get<Array<GetNotificationsSingleResponse>>(
        ENDPOINTS.getNotifications.url,
        {
          withCredentials: true,
        }
      );

      if (!responseIsOk(response)) {
        this.loadMeta.stopLoading();
        this.loadMeta.setIsError(true);
        return;
      }

      this.setNotifications(response.data.map(normalizeNotification));

      this.loadMeta.stopLoading();
    } catch (error) {
      this.loadMeta.setIsError(true);
      this.loadMeta.stopLoading();
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  markAsRead = async (notificationId: NotificationClient['id']) => {
    try {
      await this.notificationsEntries[notificationId].markAsRead();
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default NotificationsStore;
