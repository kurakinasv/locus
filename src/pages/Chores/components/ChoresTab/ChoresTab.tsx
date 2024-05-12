import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing } from 'components';
import { useChoresStore } from 'store/RootStore/hooks';

import { Controls, ScheduleItem } from '..';

const ChoresTab: FC = () => {
  const { categoriesOptions, chores } = useChoresStore();

  return (
    <div>
      <Controls dropdownOptions={categoriesOptions} dropdownPlaceholder="Категория" />

      <Spacing size={2.6} />
      {chores.map((chore) => (
        <React.Fragment key={chore.id}>
          <ScheduleItem
            key={chore.id}
            id={chore.id}
            choreItem
            name={chore.name}
            points={chore.points}
            icon={chore.category.icon}
            category={chore.category.name}
          />
          <Spacing size={1} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default observer(ChoresTab);
