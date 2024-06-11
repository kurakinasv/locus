import { Group } from 'entities/group';
import { User } from 'entities/user';
import { DefaultId } from 'typings/api';

export type NotificationServer = {
  id: DefaultId;
  message: string;
  senderId: User['id'];
  groupId: Group['id'];
  recipientsIds: Array<User['id']>;
};

export type UserNotificationServer = {
  id: DefaultId;
  isRead: boolean;
  isSender: boolean;
  userId: User['id'];
  notificationId: NotificationServer['id'];
};
