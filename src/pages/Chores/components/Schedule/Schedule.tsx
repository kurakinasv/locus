import { FC } from 'react';

import cn from 'classnames';

import { Input, Dropdown, Spacing, Title } from 'components';
import { mockOptions } from 'config/mock/options';
import { useScreenType } from 'store';

import { ScheduleItem } from '..';

import s from './Schedule.module.scss';

const Schedule: FC = () => {
  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  return (
    <div>
      <div className={cn(s.controls, isMobile && s.controls_mobile)}>
        <Input placeholder="Поиск по названию" />
        <Spacing size={16} horizontal={!isMobile} className={s.spacing} />
        <Dropdown options={mockOptions} placeholder="Выберите неделю" />
      </div>

      <Spacing size={2.6} />
      <Title size="h2">Сегодня, 16 декабря</Title>
      <Spacing size={1} />
      <ScheduleItem name="Помыть посуду" completed={false} />
      <Spacing size={1} />
      <ScheduleItem name="Помыть посуду" completed={false} />

      <Spacing size={2} />
      <Title size="h2">Сегодня, 16 декабря</Title>
      <Spacing size={1} />
      <ScheduleItem name="Помыть посуду" completed={false} />
      <Spacing size={1} />
      <ScheduleItem name="Помыть посуду" completed />
      <Spacing size={1} />
      <ScheduleItem name="Помыть посуду" completed />
      <Spacing size={1} />
      <ScheduleItem name="Помыть посуду" completed />
      <Spacing size={1} />
      <ScheduleItem name="Помыть посуду" completed />
    </div>
  );
};

export default Schedule;
