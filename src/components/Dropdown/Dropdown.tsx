import { FC, forwardRef, memo, useRef, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Cross2Icon } from '@radix-ui/react-icons';
import cn from 'classnames';

import { OptionType } from 'typings/ui';

import ShevronIcon from 'img/icons/chevron-icon.svg?react';

import s from './Dropdown.module.scss';

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

type DropdownProps = {
  disabled?: boolean;
  placeholder: string;
  options: OptionType<string>[];
  stretched?: boolean;
  name?: string;
  onBlur?: () => void;
  // todo: make required
  selectedOption?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
};

const Dropdown: FC<DropdownProps> = forwardRef<HTMLDivElement, DropdownProps>(
  (
    { options, placeholder, stretched = false, name, disabled = false, selectedOption, onChange },
    forwardedRef
  ) => {
    const triggerRef = useRef<HTMLButtonElement>(null);

    const toggleOption = (opt: string) => {
      onChange?.(opt === selectedOption ? '' : opt);
    };

    const clearOption = (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      onChange?.('');
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
        <div ref={forwardedRef} className={stretched ? s['ref-wrapper'] : undefined}>
          <DropdownMenu.Trigger
            className={cn(
              s.wrapper,
              stretched && s.wrapper_stretched,
              disabled && s.wrapper_disabled
            )}
            onClick={() => onOpenChange(!isOpen)}
            ref={triggerRef}
            name={name}
            disabled={disabled}
          >
            {!selectedOption && <div className={s.placeholder}>{placeholder}</div>}
            {selectedOption && (
              <div className={s.label}>
                {options.find((opt) => opt.value === selectedOption)?.label}
              </div>
            )}
            {!selectedOption && <ShevronIcon className={cn(s.icon, isOpen && s['icon_open'])} />}
            {selectedOption && (
              <Cross2Icon className={cn(s.icon, s.icon__close)} onClick={clearOption} />
            )}
          </DropdownMenu.Trigger>
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={s.content} onInteractOutside={closeDropdown}>
            <DropdownMenu.RadioGroup value={selectedOption} onValueChange={toggleOption}>
              {options.map((opt) => (
                <DropdownMenu.RadioItem
                  key={opt.value}
                  value={opt.value}
                  className={cn(s.item, opt.value === selectedOption && s[`item_active`])}
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
  }
);

Dropdown.displayName = 'Dropdown';

export default memo(Dropdown);
