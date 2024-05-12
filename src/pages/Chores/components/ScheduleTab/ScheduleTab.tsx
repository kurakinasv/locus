import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing, Title } from 'components';
import { useChoresStore } from 'store/RootStore/hooks';

import { Controls, ScheduleItem } from '..';

const ScheduleTab: FC = () => {
  const { chores, schedules, scheduledTasks } = useChoresStore();

  if (!chores.length || !schedules.length || !scheduledTasks.length) {
    return null;
  }

  return (
    <div>
      <Controls />

      <Spacing size={2.6} />
      <Title size="h2">Сегодня, 16 декабря</Title>
      {scheduledTasks.map((task) => {
        const schedule = schedules.find((schedule) => schedule.id === task.scheduleId);
        const chore = chores.find((chore) => chore.id === schedule?.choreId);

        if (!chore) {
          return;
        }

        return (
          <React.Fragment key={task.id}>
            <Spacing size={1} />
            <ScheduleItem
              key={task.id}
              id={task.id}
              name={chore.name}
              icon={chore.category.icon}
              points={chore.points}
            />
          </React.Fragment>
        );
      })}
      <Spacing size={2} />
    </div>
  );
};

export default observer(ScheduleTab);
