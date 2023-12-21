import { FC, memo, useState } from 'react';
import cn from 'classnames';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import ShevronIcon from 'img/icons/chevron-icon.svg?react';

import s from './Dropdown.module.scss';

type DropdownProps = {
  disabled?: boolean;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
};

const Dropdown: FC<DropdownProps> = ({ options, placeholder }) => {
  const [option, setOption] = useState('');

  const toggleOption = (opt: string) => {
    setOption((v) => (opt === v ? '' : opt));
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={s.wrapper}>
        {!option && <div className={s.placeholder}>{placeholder}</div>}
        {option && (
          <div className={s.label}>{options.find((opt) => opt.value === option)?.label}</div>
        )}
        <ShevronIcon className={s.icon} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content}>
          <DropdownMenu.RadioGroup value={option} onValueChange={toggleOption}>
            {options.map((opt) => (
              <DropdownMenu.RadioItem
                key={opt.value}
                value={opt.value}
                className={cn(s.item, opt.value === option && s[`item_active`])}
              >
                {opt.label}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default memo(Dropdown);
