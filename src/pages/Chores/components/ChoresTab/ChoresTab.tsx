import React, { FC } from 'react';

import { Spacing } from 'components';
import { mockOptions } from 'config/mock/options';
import { MOCK_SCHEDULE_LIST } from 'entities/mock/schedule';

import { Controls, ScheduleItem } from '..';

const ChoresTab: FC = () => {
  return (
    <div>
      <Controls dropdownOptions={mockOptions} dropdownPlaceholder="Категория" />

      <Spacing size={2.6} />
      {MOCK_SCHEDULE_LIST.map((schedule) => (
        <React.Fragment key={schedule.id}>
          <ScheduleItem
            key={schedule.id}
            hideCheckbox
            name={schedule.chore.name}
            category={schedule.chore.category.name}
          />
          <Spacing size={1} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChoresTab;
