import { ChangeEvent, FC, memo, useState } from 'react';

import s from './Input.module.scss';

type InputProps = {
  disabled?: boolean;
  placeholder: string;
  defaultValue?: string;
};

const Input: FC<InputProps> = ({ placeholder, defaultValue = '', disabled = false }) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <input
      className={s.wrapper}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default memo(Input);
