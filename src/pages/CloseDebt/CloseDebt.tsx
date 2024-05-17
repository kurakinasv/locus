import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme } from 'components/Button';
import { ModalEnum } from 'components/modals';
import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';
import { Title } from 'components/Title';
import { UsersSlider } from 'components/UsersSlider';
import { useUsersSelect } from 'hooks/useUsersSelect';
import { useScreenType } from 'store';
import { useExpensesStore, useUIStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';

import ArrowIcon from 'img/icons/arrow-left.svg?react';
import MoneyIcon from 'img/icons/money.svg?react';

import { ExpenseItem } from './ExpenseItem';

import s from './CloseDebt.module.scss';

const CloseDebt: React.FC = () => {
  const nav = useNavigate();
  const { openModal } = useUIStore();

  const { groupExpenses } = useExpensesStore();

  const { users } = useUsersSelect();

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const onGoBack = () => {
    nav(-1);
  };

  const onCloseDebt = () => {
    openModal(ModalEnum.expensesCloseDebt);
  };

  return (
    <div>
      <Button icon={<ArrowIcon />} onClick={onGoBack} stretched={!isDesktop}>
        На страницу расходов
      </Button>
      <Spacing size={isDesktop ? 3.2 : 2} />
      <Title size="h2">Статистика группы</Title>
      <Spacing size={1.4} />
      <UsersSlider
        users={users}
        getCardFooter={(_user) => (
          <>
            <Spacing size={1} />
            <Price color="red" size={SizeEnum.s} className={s.price}>
              500
            </Price>
          </>
        )}
      />
      <Spacing size={4.4} />
      <Title size="h2">Закрыть свой долг</Title>
      <Spacing size={1.4} />
      <div>
        {groupExpenses.map((expense) => (
          <React.Fragment key={expense.id}>
            <div className={s.expense}>
              <ExpenseItem
                {...expense}
                date={expense.purchaseDate}
                price={expense.amount}
                categoryName={expense.category?.name ?? ''}
              />
              <Spacing size={isDesktop ? 1.5 : 0.4} horizontal />
              <Button
                theme={ButtonTheme.outlined}
                icon={<MoneyIcon />}
                className={s.expense__button}
                onClick={onCloseDebt}
              >
                {isDesktop ? 'Перевести' : ''}
              </Button>
            </div>
            <Spacing size={1} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CloseDebt;
