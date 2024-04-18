import * as React from 'react';

import cn from 'classnames';

import { Dropdown, Input, Spacing } from 'components';
import { useScreenType } from 'store';
import { OptionType } from 'typings/ui';

import s from './Controls.module.scss';

type Props = {
  dropdownPlaceholder: string;
  dropdownOptions: OptionType<string>[];
};

const Controls: React.FC<Props> = ({ dropdownPlaceholder, dropdownOptions }) => {
  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const [search, setSearch] = React.useState('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <div className={cn(s.controls, isMobile && s.controls_mobile)}>
      <Input
        className={s.inputWrapper}
        placeholder="Поиск по названию"
        value={search}
        onChange={onSearchChange}
      />
      <Spacing size={1.6} horizontal={!isMobile} className={s.spacing} />
      <Dropdown options={dropdownOptions} placeholder={dropdownPlaceholder} stretched={isMobile} />
    </div>
  );
};

export default React.memo(Controls);
