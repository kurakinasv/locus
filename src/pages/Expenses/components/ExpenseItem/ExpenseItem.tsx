import * as React from 'react';

import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';
import { formatLocaleDateToDDMM } from 'utils/formatDate';

import CalendarIcon from 'img/icons/calendar.svg?react';

import s from './ExpenseItem.module.scss';

type Props = {
  date: string;
  category: string;
  description: string;
  price: number;
};

const ExpenseItem: React.FC<Props> = ({ date, category, description, price }) => {
  const mockIcon = <CalendarIcon />;
  return (
    <div className={s.expense}>
      <div className={s.right}>
        <div className={s.date}>{formatLocaleDateToDDMM(date)}</div>
        <Spacing size={1.2} horizontal />
        <div className={s.text}>
          <div className={s.category}>{category}</div>
          <div className={s.description}>{description}</div>
        </div>
      </div>
      <Spacing size={0.8} horizontal />
      <div className={s.left}>
        <div className={s.icon}>{mockIcon}</div>
        <Spacing size={1.6} horizontal />
        <Price>{price.toLocaleString('ru-RU')}</Price>
      </div>
    </div>
  );
};

export default React.memo(ExpenseItem);
