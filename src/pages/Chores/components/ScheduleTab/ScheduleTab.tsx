import React, { FC, useState } from 'react';

import cn from 'classnames';

import { Input, Dropdown, Spacing, Title } from 'components';
import { mockOptions } from 'config/mock/options';
import { MOCK_SCHEDULE_LIST } from 'entities/mock/schedule';
import { useScreenType } from 'store';

import { ScheduleItem } from '..';

import s from './ScheduleTab.module.scss';

const Schedule: FC = () => {
  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const [search, setSearch] = useState('');

  return (
    <div>
      <div className={cn(s.controls, isMobile && s.controls_mobile)}>
        <Input
          placeholder="Поиск по названию"
          value={search}
          onChange={(v) => setSearch(v.currentTarget.value)}
        />
        <Spacing size={1.6} horizontal={!isMobile} className={s.spacing} />
        <Dropdown options={mockOptions} placeholder="Выберите неделю" stretched />
      </div>

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

export default Schedule;
