import { FC, MouseEvent, useState } from 'react';

import cn from 'classnames';

import { Button, ButtonTheme } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';

import TrashIcon from 'img/icons/trash.svg?react';

import s from './ListItem.module.scss';

type Props = {
  name: string;
  completed: boolean;
  price?: number;
};

const ListItem: FC<Props> = ({ name, completed, price }) => {
  const [checked, setChecked] = useState(completed);

  const onCheckedChange = () => {
    setChecked((prev) => !prev);
  };

  const deleteItem = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <li className={cn(s.wrapper, checked && s.wrapper_completed)} onClick={onCheckedChange}>
      <div className={s.left}>
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
        <Spacing size={1} horizontal />
        <div className={s.name}>{name}</div>
      </div>

      <div className={s.right}>
        <Price>{price?.toLocaleString('ru-RU')}</Price>
        <Spacing size={1.6} horizontal />
        <Button onClick={deleteItem} icon={<TrashIcon />} theme={ButtonTheme.text}></Button>
      </div>
    </li>
  );
};

export default ListItem;
