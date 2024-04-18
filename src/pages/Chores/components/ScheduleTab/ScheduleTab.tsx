import React, { FC } from 'react';

import { Spacing, Title } from 'components';
import { mockOptions } from 'config/mock/options';
import { MOCK_SCHEDULE_LIST } from 'entities/mock/schedule';

import { Controls, ScheduleItem } from '..';

const ScheduleTab: FC = () => {
  return (
    <div>
      <Controls dropdownOptions={mockOptions} dropdownPlaceholder="Выберите неделю" />

      <Spacing size={2.6} />
      <Title size="h2">Сегодня, 16 декабря</Title>
      {MOCK_SCHEDULE_LIST.map((schedule) => (
        <React.Fragment key={schedule.id}>
          <Spacing size={1} />
          <ScheduleItem key={schedule.id} name={schedule.chore.name} />
        </React.Fragment>
      ))}

      <Spacing size={2} />
      <Title size="h2">Сегодня, 16 декабря</Title>
      {[...MOCK_SCHEDULE_LIST, ...MOCK_SCHEDULE_LIST].map((schedule, i) => (
        // todo: remove id + i
        <React.Fragment key={schedule.id + i}>
          <Spacing size={1} />
          <ScheduleItem key={schedule.id} name={schedule.chore.name} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ScheduleTab;
