import * as React from 'react';

import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';
import { ExpenseClient } from 'entities/expense';
import { ExpenseCategory } from 'entities/expenseCategory';
import { useScreenType } from 'store';
import { formatLocaleDateToDDMM } from 'utils/formatDate';

import CalendarIcon from 'img/icons/calendar.svg?react';
import TrashIcon from 'img/icons/trash.svg?react';

import s from './ExpenseItem.module.scss';

type Props = {
  id: ExpenseClient['id'];
  date: ExpenseClient['purchaseDate'];
  categoryId: ExpenseCategory['id'] | null;
  description: ExpenseClient['description'];
  amount: ExpenseClient['amount'];
  onDelete?: ((e: React.MouseEvent) => void) | VoidFunction;
  onClick?: VoidFunction;
};

const ExpenseItem: React.FC<Props> = ({
  id,
  date,
  categoryId: category,
  description,
  amount,
  onDelete,
  onClick,
}) => {
  const isMobile = useScreenType() === 'mobile';

  const mockIcon = <CalendarIcon />;

  const dayMonthArray = formatLocaleDateToDDMM(date).split('.');

  return (
    <div className={s.expense} onClick={onClick}>
      <div className={s.right}>
        <div className={s.date}>
          {!isMobile ? (
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
          <div className={s.category}>{category}</div>
          <div className={s.description}>{description}</div>
        </div>
      </div>
      <Spacing size={0.8} horizontal />
      <div className={s.left}>
        <div className={s.icon}>{mockIcon}</div>
        <Spacing size={1.6} horizontal />
        <Price>{amount.toLocaleString('ru-RU')}</Price>
        {onDelete && (
          <>
            <Spacing size={isMobile ? 1 : 3} horizontal />
            <button className={s['delete-icon']} type="button" title="Удалить" onClick={onDelete}>
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(ExpenseItem);
