import { FC, memo, useRef, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Cross2Icon } from '@radix-ui/react-icons';
import cn from 'classnames';

import ShevronIcon from 'img/icons/chevron-icon.svg?react';

import s from './Dropdown.module.scss';

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

type DropdownProps = {
  disabled?: boolean;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  stretched?: boolean;
};

const Dropdown: FC<DropdownProps> = ({ options, placeholder, stretched = false }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [option, setOption] = useState('');

  const toggleOption = (opt: string) => {
    setOption((v) => (opt === v ? '' : opt));
  };

  const clearOption = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setOption('');
  };

  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const closeDropdown = (e: PointerDownOutsideEvent | FocusOutsideEvent) => {
    e.preventDefault();

    if (e.currentTarget === triggerRef.current) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <DropdownMenu.Root modal={false} open={isOpen}>
      <DropdownMenu.Trigger
        className={cn(s.wrapper, stretched && s.wrapper_stretched)}
        onClick={() => onOpenChange(!isOpen)}
        ref={triggerRef}
      >
        {!option && <div className={s.placeholder}>{placeholder}</div>}
        {option && (
          <div className={s.label}>{options.find((opt) => opt.value === option)?.label}</div>
        )}
        {!option && <ShevronIcon className={cn(s.icon, isOpen && s['icon_open'])} />}
        {option && <Cross2Icon className={cn(s.icon, s.icon__close)} onClick={clearOption} />}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} onInteractOutside={closeDropdown}>
          <DropdownMenu.RadioGroup value={option} onValueChange={toggleOption}>
            {options.map((opt) => (
              <DropdownMenu.RadioItem
                key={opt.value}
                value={opt.value}
                className={cn(s.item, opt.value === option && s[`item_active`])}
                onClick={() => onOpenChange(false)}
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
