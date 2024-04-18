import * as CheckboxRadix from '@radix-ui/react-checkbox';
import classNames from 'classnames';

import CheckIcon from 'img/icons/check.svg?react';

import s from './Checkbox.module.scss';

type Props = {
  checked: boolean;
  onCheckedChange: VoidFunction;
};

const Checkbox: React.FC<Props> = ({ checked, onCheckedChange }) => {
  return (
    <div className={s.checkbox}>
      <CheckboxRadix.Root
        onCheckedChange={onCheckedChange}
        className={s.checkbox__wrapper}
        checked={checked}
      >
        <CheckboxRadix.Indicator className={s.checkbox__indicator}>
          <CheckIcon className={classNames(s.checkbox__icon, checked && s.checked)} />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
    </div>
  );
};

export default Checkbox;
