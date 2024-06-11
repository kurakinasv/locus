import { NotificationServer, UserNotificationServer } from './server';

export type GetNotificationsSingleResponse = {
  notification: NotificationServer;
  userNotification: UserNotificationServer;
};
