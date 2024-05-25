import * as React from 'react';

import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';
import { ExpenseClient } from 'entities/expense';
import { ExpenseCategory, expenseCategoryIconsMap } from 'entities/expenseCategory';
import { useScreenType } from 'store';
import { formatLocaleDateToDDMM } from 'utils/formatDate';

import s from './ExpenseItem.module.scss';

type Props = {
  name: ExpenseClient['name'];
  date: ExpenseClient['purchaseDate'];
  category: ExpenseCategory | null;
  description: ExpenseClient['description'];
  price: ExpenseClient['amount'];
};

// TODO: move to shared
const ExpenseItem: React.FC<Props> = ({ date, name, category, description, price }) => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const dayMonth = formatLocaleDateToDDMM(new Date(date).toLocaleDateString());
  const dayMonthArray = dayMonth.split('.');

  const Icon = expenseCategoryIconsMap[category?.icon ?? 'other'];

  return (
    <div className={s.expense}>
      <div className={s.right}>
        <div className={s.date}>
          {isDesktop ? (
            dayMonth
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
          <div className={s.name}>{name}</div>
          <div className={s.description}>{description}</div>
          <div className={s.category}>{category?.name}</div>
        </div>
      </div>
      <Spacing size={0.8} horizontal />
      <div className={s.left}>
        <Price>{price.toLocaleString('ru-RU')}</Price>
        <Spacing size={isDesktop ? 1.6 : 0.8} horizontal />
        <div className={s.icon}>{<Icon />}</div>
      </div>
    </div>
  );
};

export default React.memo(ExpenseItem);
