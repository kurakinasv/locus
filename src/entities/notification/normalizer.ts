import { NotificationClient } from './client';
import { GetNotificationsSingleResponse } from './types';

export const normalizeNotification = ({
  notification,
  userNotification,
}: GetNotificationsSingleResponse): NotificationClient => {
  return {
    id: userNotification.id,
    message: notification.message,
    isRead: userNotification.isRead,
    isSender: userNotification.isSender,
  };
};
