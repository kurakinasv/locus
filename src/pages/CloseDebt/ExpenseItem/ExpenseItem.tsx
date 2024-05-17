import * as React from 'react';

import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';
import { ExpenseClient } from 'entities/expense';
import { ExpenseCategory } from 'entities/expenseCategory';
import { useScreenType } from 'store';
import { formatLocaleDateToDDMM } from 'utils/formatDate';

import CalendarIcon from 'img/icons/calendar.svg?react';

import s from './ExpenseItem.module.scss';

type Props = {
  date: ExpenseClient['purchaseDate'];
  categoryName: ExpenseCategory['name'];
  description: ExpenseClient['description'];
  price: ExpenseClient['amount'];
};

// TODO: move to shared
const ExpenseItem: React.FC<Props> = ({ date, categoryName, description, price }) => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const mockIcon = <CalendarIcon />;

  const dayMonthArray = formatLocaleDateToDDMM(date).split('.');

  return (
    <div className={s.expense}>
      <div className={s.right}>
        <div className={s.date}>
          {isDesktop ? (
            formatLocaleDateToDDMM(date)
          ) : (
            <>
              {dayMonthArray[0]}
              <br />
              {dayMonthArray[1]}
            </>
          )}
        </div>
        <Spacing size={1.2} horizontal />
        <div className={s.text}>
          <div className={s.category}>{categoryName}</div>
          <div className={s.description}>{description}</div>
        </div>
      </div>
      <Spacing size={0.8} horizontal />
      <div className={s.left}>
        <div className={s.icon}>{mockIcon}</div>
        <Spacing size={isDesktop ? 1.6 : 0.8} horizontal />
        <Price>{price.toLocaleString('ru-RU')}</Price>
      </div>
    </div>
  );
};

export default React.memo(ExpenseItem);
