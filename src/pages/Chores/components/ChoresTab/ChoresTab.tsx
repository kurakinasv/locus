import { FC } from 'react';
import cn from 'classnames';

import { Input, Dropdown, Spacing } from 'components';
import { mockOptions } from 'config/mock/options';
import { useScreenType } from 'store';

import { ScheduleItem } from '..';

import s from './ChoresTab.module.scss';

const ChoresTab: FC = () => {
  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  return (
    <div>
      <div className={cn(s.controls, isMobile && s.controls_mobile)}>
        <Input placeholder="Поиск по названию" />
        <Spacing size={16} horizontal={!isMobile} className={s.spacing} />
        <Dropdown options={mockOptions} placeholder="Категория" />
      </div>

      <Spacing size={26} />
      <ScheduleItem name="Помыть посуду" hideCheckbox />
      <Spacing size={10} />
      <ScheduleItem name="Помыть посуду" hideCheckbox />
      <Spacing size={10} />
      <ScheduleItem name="Помыть посуду" hideCheckbox />
      <Spacing size={10} />
      <ScheduleItem name="Помыть посуду" hideCheckbox />
    </div>
  );
};

export default ChoresTab;
