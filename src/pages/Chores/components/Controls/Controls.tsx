import * as React from 'react';

import cn from 'classnames';
import { DateRange } from 'react-day-picker';

import { DatePickerInput, Dropdown, Input, Spacing } from 'components';
import { useScreenType } from 'store';
import { useChoresStore, useSchedulesStore } from 'store/RootStore/hooks';
import { OptionType } from 'typings/ui';
import { debounce } from 'utils/debounce';

import s from './Controls.module.scss';

type Props = {
  dropdownPlaceholder?: string;
  dropdownOptions?: OptionType<string>[];
  setDisplayAllTasks?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Controls: React.FC<Props> = ({
  dropdownPlaceholder,
  dropdownOptions,
  setDisplayAllTasks,
}) => {
  const { getChoresInGroup } = useChoresStore();
  const { getGroupSchedules } = useSchedulesStore();

  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const [search, setSearch] = React.useState('');
  const [option, setOption] = React.useState('');
  const [range, setRange] = React.useState<DateRange | undefined>();

  const isChoresTab = dropdownPlaceholder && dropdownOptions;

  React.useEffect(() => {
    // Display all only if from and to are set
    setDisplayAllTasks?.(!!(range?.from && range?.to));

    return () => {
      setDisplayAllTasks?.(false);
    };
  }, [range]);

  // for schedules
  const debouncedSchedulesSearch = React.useCallback(
    debounce(
      async (params: { value: string; dateRange: DateRange }) =>
        await getGroupSchedules({ name: params.value, range: params.dateRange }),
      500
    ),
    []
  );

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

    if (isChoresTab) {
      debouncedSearch({ value: e.currentTarget.value, option });
    } else {
      debouncedSchedulesSearch({ value: e.currentTarget.value, dateRange: range });
    }
  };

  const onOptionChange = (option: string) => {
    setOption(option);
    debouncedSearch({ value: search, option });
  };

  const onDateRangeChange = (dateRange: DateRange | undefined) => {
    setRange(dateRange);

    if (!dateRange?.to || !dateRange?.from) {
      return;
    }

    debouncedSchedulesSearch({ value: search, dateRange });
  };

  const clearSearch = () => {
    setSearch('');

    if (isChoresTab) {
      debouncedSearch({ value: '', option });
    } else {
      debouncedSchedulesSearch({ value: '', dateRange: range });
    }
  };

  const clearDateRange = () => {
    setRange(undefined);
    onDateRangeChange(undefined);
    debouncedSchedulesSearch({ value: search, dateRange: undefined });
  };

  return (
    <div className={cn(s.controls, isMobile && s.controls_mobile)}>
      <Input
        className={s.inputWrapper}
        placeholder="Поиск по названию"
        value={search}
        onChange={onSearchChange}
        clearSearch={clearSearch}
      />
      <Spacing size={1.6} horizontal={!isMobile} className={s.spacing} />
      {!dropdownPlaceholder && (
        <DatePickerInput
          range={range}
          setRange={onDateRangeChange}
          placeholder="Выберите даты"
          stretched={isMobile}
          max={31}
          fromToday={false}
          onClearDate={clearDateRange}
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
