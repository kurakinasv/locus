import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api/endpoints';
import { NotificationClient } from 'entities/notification';

import MetaModel from '../MetaModel';

class NotificationModel implements NotificationClient {
  id: NotificationClient['id'];
  message: string;
  isRead: boolean;
  isSender: boolean;

  readonly meta = new MetaModel();

  constructor(notification: NotificationClient) {
    this.id = notification.id;
    this.message = notification.message;
    this.isRead = notification.isRead;
    this.isSender = notification.isSender;

    makeAutoObservable(this);
  }

  markAsRead = async () => {
    try {
      this.meta.startLoading();

      await axios.put(ENDPOINTS.markAsRead.getUrl!(String(this.id)), {}, { withCredentials: true });

      runInAction(() => {
        this.isRead = true;
        this.meta.stopLoading();
      });
    } catch (error) {
      this.meta.setIsError(true);
      this.meta.stopLoading();
    }
  };
}

export default NotificationModel;
