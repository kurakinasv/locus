import { ScheduledTask } from './client';
import { ScheduledTaskServer } from './server';

export const normalizeScheduledTask = (data: ScheduledTaskServer): ScheduledTask => {
  return {
    id: data.id,
    date: data.date,
    completed: data.completed,
    isAssigned: data.isAssigned,
    completedAt: data.completedAt,
    scheduleId: data.scheduleId,
    choreId: data.schedule.choreId,
    userGroupId: data.userGroupId,
  };
};
