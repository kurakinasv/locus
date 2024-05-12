import * as React from 'react';

import cn from 'classnames';
import { DateRange } from 'react-day-picker';

import { DatePickerInput, Dropdown, Input, Spacing } from 'components';
import { useScreenType } from 'store';
import { useChoresStore } from 'store/RootStore/hooks';
import { OptionType } from 'typings/ui';
import { debounce } from 'utils/debounce';

import CloseIcon from 'img/icons/close.svg?react';

import s from './Controls.module.scss';

type Props = {
  dropdownPlaceholder?: string;
  dropdownOptions?: OptionType<string>[];
};

const Controls: React.FC<Props> = ({ dropdownPlaceholder, dropdownOptions }) => {
  const { getChoresInGroup } = useChoresStore();

  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const [search, setSearch] = React.useState('');
  const [option, setOption] = React.useState('');

  // for chores
  const debouncedSearch = React.useCallback(
    debounce(
      async (params: { value: string; option: string }) =>
        await getChoresInGroup({ name: params.value, categoryId: params.option }),
      500
    ),
    []
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    debouncedSearch({ value: e.currentTarget.value, option });
  };

  const onOptionChange = (option: string) => {
    setOption(option);
    debouncedSearch({ value: search, option });
  };

  const clearSearch = () => {
    setSearch('');
    debouncedSearch({ value: '', option });
  };

  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
    <div className={cn(s.controls, isMobile && s.controls_mobile)}>
      <Input
        className={s.inputWrapper}
        placeholder="Поиск по названию"
        value={search}
        onChange={onSearchChange}
        icon={search ? () => <CloseIcon className={s.icon} onClick={clearSearch} /> : undefined}
      />
      <Spacing size={1.6} horizontal={!isMobile} className={s.spacing} />
      {!dropdownPlaceholder && (
        <DatePickerInput
          range={range}
          setRange={setRange}
          placeholder="Выберите даты"
          stretched={isMobile}
          max={31}
        />
      )}
      {dropdownPlaceholder && dropdownOptions && (
        <Dropdown
          selectedOption={option}
          onChange={onOptionChange}
          options={dropdownOptions}
          placeholder={dropdownPlaceholder}
          stretched={isMobile}
        />
      )}
    </div>
  );
};

export default React.memo(Controls);
