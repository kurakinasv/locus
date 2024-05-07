import React, { InputHTMLAttributes, memo, useCallback, useState } from 'react';

import cn from 'classnames';
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';

import { Input } from 'components/Input';
import { useClickOutside } from 'hooks/useClickOutside';
import { PropsWithClassName } from 'typings/props';

import CalendarIcon from 'img/icons/calendar.svg?react';

import { Footer } from './Footer';

import s from './DatePickerInput.module.scss';

import 'react-day-picker/dist/style.css';

type InputProps = PropsWithClassName & {
  range: DateRange | undefined;
  setRange: SelectRangeEventHandler;
  placeholder: string;
  disabled?: boolean;
  stretched?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const DatePickerInput: React.FC<InputProps> = ({
  range,
  setRange,
  placeholder,
  disabled = false,
  stretched = false,
  className,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [formatedDate, setFormatedDate] = useState('');

  const currentMonth = new Date();

  const { ref } = useClickOutside(() => setDatePickerOpen(false));

  const onDateChange = useCallback(() => {
    const formated = `${range?.from?.toLocaleDateString()} - ${range?.to?.toLocaleDateString()}`;
    setFormatedDate(formated ?? '');
    setDatePickerOpen(false);
  }, [range]);

  const handleDatePicker = () => {
    setDatePickerOpen((v) => !v);
  };

  const onIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setDatePickerOpen((v) => !v);
  };

  return (
    <div className={cn(s.wrapper, stretched && s.stretched, className)} ref={ref}>
      <Input
        value={formatedDate}
        disabled={disabled}
        placeholder={placeholder}
        icon={() => <CalendarIcon className={s.icon} onClick={onIconClick} />}
        readOnly
        onClick={handleDatePicker}
      />
      {datePickerOpen && (
        <DayPicker
          mode="range"
          max={31}
          selected={range}
          defaultMonth={currentMonth}
          onSelect={setRange}
          footer={<Footer range={range} onClick={onDateChange} />}
          className={s.datePicker}
          weekStartsOn={1}
        />
      )}
    </div>
  );
};

export default memo(DatePickerInput);
