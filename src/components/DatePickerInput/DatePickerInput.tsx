import React, { InputHTMLAttributes, forwardRef, memo, useCallback, useState } from 'react';

import cn from 'classnames';
import {
  DateRange,
  DayPicker,
  DaySelectionMode,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker';

import { Input } from 'components/Input';
import { useClickOutside } from 'hooks/useClickOutside';
import { PropsWithClassName } from 'typings/props';

import CalendarIcon from 'img/icons/calendar.svg?react';

import { Footer } from './Footer';

import s from './DatePickerInput.module.scss';

import 'react-day-picker/dist/style.css';

type InputProps = PropsWithClassName & {
  range?: DateRange | undefined;
  setRange?: SelectRangeEventHandler;
  selectedDate?: Date | undefined;
  defaultDate?: Date;
  setSelectedDate?: SelectSingleEventHandler;
  placeholder: string;
  disabled?: boolean;
  touched?: boolean;
  stretched?: boolean;
  label?: React.ReactNode;
  errorMessage?: string;
  mode?: DaySelectionMode;
} & InputHTMLAttributes<HTMLInputElement>;

// todo: divide on two components
const DatePickerInput: React.FC<InputProps> = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      range,
      setRange,
      selectedDate,
      setSelectedDate,
      placeholder,
      disabled = false,
      touched = false,
      stretched = false,
      label,
      errorMessage,
      mode = 'range',
      className,
    },
    forwardedRef
  ) => {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [formatedDate, setFormatedDate] = useState('');

    const currentMonth = new Date();

    const { ref } = useClickOutside(() => setDatePickerOpen(false));

    const onRangeChange = useCallback(() => {
      const formated = `${range?.from?.toLocaleDateString()} - ${range?.to?.toLocaleDateString()}`;
      setFormatedDate(formated ?? '');
      setDatePickerOpen(false);
    }, [range]);

    const onDateChange = useCallback(() => {
      setFormatedDate(selectedDate?.toLocaleDateString() ?? '');
      setDatePickerOpen(false);
    }, [selectedDate]);

    const handleDatePicker = () => {
      setDatePickerOpen((v) => !v);
    };

    const onIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      setDatePickerOpen((v) => !v);
    };

    return (
      <div ref={forwardedRef} className={stretched ? s['ref-wrapper'] : undefined}>
        <div className={cn(s.wrapper, stretched && s.stretched, className)} ref={ref}>
          <Input
            value={formatedDate}
            disabled={disabled}
            placeholder={placeholder}
            icon={() => <CalendarIcon className={s.icon} onClick={onIconClick} />}
            readOnly
            onClick={handleDatePicker}
            label={label}
            errorMessage={errorMessage}
            touched={touched}
          />
          {datePickerOpen && mode === 'range' && (
            <DayPicker
              mode="range"
              max={31}
              selected={range}
              defaultMonth={currentMonth}
              onSelect={setRange}
              footer={<Footer range={range} onClick={onRangeChange} />}
              className={s.datePicker}
              weekStartsOn={1}
              showOutsideDays
            />
          )}
          {datePickerOpen && mode === 'single' && (
            <DayPicker
              mode="single"
              selected={selectedDate}
              defaultMonth={currentMonth}
              onSelect={setSelectedDate}
              footer={<Footer selectedDate={selectedDate} onClick={onDateChange} />}
              className={s.datePicker}
              weekStartsOn={1}
              showOutsideDays
            />
          )}
        </div>
      </div>
    );
  }
);

DatePickerInput.displayName = 'DatePickerInput';

export default memo(DatePickerInput);
