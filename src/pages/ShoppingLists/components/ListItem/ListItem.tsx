import { FC, MouseEvent } from 'react';

import cn from 'classnames';

import { Checkbox } from 'components/Checkbox';
import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';
import { useScreenType } from 'store';

import TrashIcon from 'img/icons/trash.svg?react';

import s from './ListItem.module.scss';

type Props = {
  name: string;
  completed: boolean;
  price?: number | null;
  onCheckedChange: () => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ListItem: FC<Props> = ({ name, completed, price, onDelete, onCheckedChange }) => {
  const isMobile = useScreenType() === 'mobile';

  return (
    <li className={cn(s.wrapper, completed && s.wrapper_completed)} onClick={onCheckedChange}>
      <div className={s.left}>
        <Checkbox checked={completed} onCheckedChange={onCheckedChange} />
        <Spacing size={1} horizontal />
        <div className={s.name}>{name}</div>
      </div>

      <div className={s.right}>
        {price && <Price>{price.toLocaleString('ru-RU')}</Price>}
        <Spacing size={isMobile ? 1 : 3} horizontal />
        <button className={s['delete-icon']} type="button" title="Удалить" onClick={onDelete}>
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
