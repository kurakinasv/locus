import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing, Stub, Title } from 'components';
import { useChoreCategoriesStore, useChoresStore } from 'store/RootStore/hooks';

import { Controls, ScheduleItem } from '..';

const ScheduleTab: FC = () => {
  const { chores, schedules, scheduledTasks } = useChoresStore();
  const { categories } = useChoreCategoriesStore();

  if (!chores.length || !schedules.length || !scheduledTasks.length || !categories.length) {
    return <Stub />;
  }

  return (
    <div>
      <Controls />

      <Spacing size={2.6} />
      <Title size="h2">Сегодня, 16 декабря</Title>
      {scheduledTasks.map((task) => {
        const schedule = schedules.find((schedule) => schedule.id === task.scheduleId);
        const chore = chores.find((chore) => chore.id === schedule?.choreId);
        const icon = categories.find((c) => c.id === chore?.categoryId)?.icon;

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
              icon={icon}
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
