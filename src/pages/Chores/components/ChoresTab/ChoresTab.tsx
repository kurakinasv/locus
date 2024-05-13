import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing, Spinner, Stub } from 'components';
import { useChoreCategoriesStore, useChoresStore } from 'store/RootStore/hooks';

import { Controls, ScheduleItem } from '..';

const ChoresTab: FC = () => {
  const { chores, getChoresMeta, meta } = useChoresStore();
  const { categoriesOptions, categories } = useChoreCategoriesStore();

  const loading = getChoresMeta.loading || meta.loading;
  const empty = !chores.length || !categories.length;

  return (
    <div>
      <Controls dropdownOptions={categoriesOptions} dropdownPlaceholder="Категория" />

      <Spacing size={2.6} />

      {loading && <Spinner />}

      {!loading && empty && <Stub />}

      {!loading &&
        !empty &&
        chores.map((chore) => {
          const category = categories.find((c) => c.id === chore?.categoryId);

          return (
            <React.Fragment key={chore.id}>
              <ScheduleItem
                key={chore.id}
                id={chore.id}
                choreItem
                name={chore.name}
                points={chore.points}
                icon={category?.icon}
                category={category?.name}
              />
              <Spacing size={1} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default observer(ChoresTab);
