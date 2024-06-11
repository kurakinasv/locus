import React, { FC, useMemo, useState } from 'react';

import { isBefore, isToday, isTomorrow, isYesterday, startOfDay } from 'date-fns';
import { observer } from 'mobx-react-lite';

import { Spacing, Stub, Title } from 'components';
import { useChoreCategoriesStore, useChoresStore, useSchedulesStore } from 'store/RootStore/hooks';
import { formatDayFullMonthDate, getDaysNames } from 'utils/formatDate';

import { Controls, ScheduleItem } from '..';

const ScheduleTab: FC = () => {
  const { chores } = useChoresStore();
  const { categories } = useChoreCategoriesStore();
  const { scheduledTasks, scheduleTasksDayMap } = useSchedulesStore();

  const [displayAllTasks, setDisplayAllTasks] = useState(false);

  const empty = !chores.length || !scheduledTasks.length || !categories.length;

  const taskDatesEntries = useMemo(() => {
    return Object.entries(scheduleTasksDayMap).reverse();
  }, [scheduleTasksDayMap]);

  return (
    <div>
      <Controls setDisplayAllTasks={setDisplayAllTasks} />

      {(empty || !taskDatesEntries.length) && <Stub />}

      <Spacing size={2.6} />

      {!empty &&
        taskDatesEntries.map(([key, tasks]) => {
          const { today, tomorrow, yesterday } = getDaysNames();

          const titleDate = new Date(key);
          const yesterdayDate = new Date().setDate(new Date().getDate() - 1);

          // ! Return tasks starting from yesterday
          if (
            !displayAllTasks &&
            isBefore(startOfDay(titleDate), startOfDay(new Date(yesterdayDate)))
          ) {
            return;
          }

          return (
            <React.Fragment key={key}>
              <Title size="h2">
                {isToday(titleDate) && `${today}, `}
                {isTomorrow(titleDate) && `${tomorrow}, `}
                {isYesterday(titleDate) && `${yesterday}, `}
                {formatDayFullMonthDate(titleDate)}
              </Title>
              {tasks.map((task) => {
                const chore = chores.find((chore) => chore.id === task.choreId);
                const icon = categories.find((c) => c.id === chore?.categoryId)?.icon;

                if (!chore) {
                  return;
                }

                return (
                  <React.Fragment key={task.id}>
                    <Spacing size={1} />
                    <ScheduleItem
                      id={task.id}
                      scheduleId={task.scheduleId}
                      name={chore.name}
                      icon={icon}
                      points={chore.points}
                      completed={task.completed}
                    />
                  </React.Fragment>
                );
              })}

              <Spacing size={2} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default observer(ScheduleTab);
