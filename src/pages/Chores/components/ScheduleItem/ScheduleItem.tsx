import { FC, memo, useState } from 'react';

import cn from 'classnames';

import { Checkbox } from 'components/Checkbox';
import { Spacing } from 'components/Spacing';

import ChoresIcon from 'img/chores/chores-item.svg?react';

import s from './ScheduleItem.module.scss';

type ScheduleItemProps = {
  name: string;
  category?: string;
  completed?: boolean;
  hideCheckbox?: boolean;
};

const ScheduleItem: FC<ScheduleItemProps> = ({
  name,
  category,
  completed = false,
  hideCheckbox = false,
}) => {
  const [checked, setChecked] = useState(completed);

  const onCheckedChange = () => {
    if (hideCheckbox) {
      return;
    }

    setChecked((prev) => !prev);
  };

  return (
    <div className={cn(s.wrapper, checked && s.wrapper_completed)} onClick={onCheckedChange}>
      <div className={s.left}>
        {!hideCheckbox && (
          <>
            <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
            <Spacing size={1} horizontal />
          </>
        )}
        <div>
          <div className={s.name}>{name}</div>
          {hideCheckbox && <div className={s.category}>{category}</div>}
        </div>
      </div>
      <ChoresIcon className={s.icon} />
    </div>
  );
};

export default memo(ScheduleItem);
