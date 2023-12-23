import { FC, memo, useState } from 'react';
import cn from 'classnames';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import ChoresIcon from 'img/chores/chores-item.svg?react';
import { Spacing } from 'components/Spacing';

import s from './ScheduleItem.module.scss';

type ScheduleItemProps = {
  name: string;
  completed?: boolean;
  hideCheckbox?: boolean;
};

const ScheduleItem: FC<ScheduleItemProps> = ({ name, completed = false, hideCheckbox = false }) => {
  const [checked, setChecked] = useState(completed);

  return (
    <div className={cn(s.wrapper, checked && s.wrapper_completed)}>
      <div className={s.left}>
        {!hideCheckbox && (
          <>
            <div className={s.checkbox}>
              <Checkbox.Root
                onCheckedChange={(ch) => setChecked(!!ch)}
                className={s.checkbox__wrapper}
                checked={checked}
              >
                <Checkbox.Indicator className={s.checkbox__indicator}>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
            <Spacing size={10} horizontal />
          </>
        )}
        <div className={s.name}>{name}</div>
      </div>
      <ChoresIcon className={s.icon} />
    </div>
  );
};

export default memo(ScheduleItem);
