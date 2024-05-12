import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing } from 'components';
import { MOCK_SCHEDULE_LIST } from 'entities/mock/schedule';
import { useChoresStore } from 'store/RootStore/hooks';

import { Controls, ScheduleItem } from '..';

const ChoresTab: FC = () => {
  const { categoriesOptions } = useChoresStore();

  return (
    <div>
      <Controls dropdownOptions={categoriesOptions} dropdownPlaceholder="Категория" />

      <Spacing size={2.6} />
      {MOCK_SCHEDULE_LIST.map((schedule) => (
        <React.Fragment key={schedule.id}>
          <ScheduleItem
            key={schedule.id}
            id={schedule.id}
            choreItem
            name={schedule.chore.name}
            category={schedule.chore.category.name}
          />
          <Spacing size={1} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default observer(ChoresTab);
