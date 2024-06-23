import * as React from 'react';

import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';

import { Button, ButtonTheme } from 'components/Button';
import { GoBackButton } from 'components/GoBackButton';
import { ModalEnum } from 'components/modals';
import { Price } from 'components/Price';
import { Spacing } from 'components/Spacing';
import { Spinner } from 'components/Spinner';
import { Stub } from 'components/Stub';
import { Title } from 'components/Title';
import { UsersSlider } from 'components/UsersSlider';
import { ExpenseWithDebt } from 'entities/expense';
import { useUsersSelect } from 'hooks/useUsersSelect';
import { useScreenType } from 'store';
import { useExpensesStore, useUIStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';

import MoneyIcon from 'img/icons/money.svg?react';

import { ExpenseItem } from './ExpenseItem';

import s from './CloseDebt.module.scss';

const CloseDebt: React.FC = () => {
  const { openModal } = useUIStore();

  const {
    meta,
    usersDebtsTotalAmounts,
    getUsersDebts,
    userDebtsMonthMap: debtsMonthMap,
  } = useExpensesStore();

  const { users } = useUsersSelect();

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  React.useEffect(() => {
    getUsersDebts();
  }, []);

  const onCloseDebt = (expense: ExpenseWithDebt) => () => {
    openModal(ModalEnum.expensesCloseDebt, { expense });
  };

  return (
    <div>
      <GoBackButton label="На страницу расходов" stretched={!isDesktop} />
      <Spacing size={isDesktop ? 3.2 : 2} />

      <Title size="h2">Статистика группы</Title>
      <Spacing size={1.4} />
      <UsersSlider
        users={users}
        replaceCurrentUserName
        pinCurrentUser
        getCardFooter={(user) => {
          const debt = usersDebtsTotalAmounts[user.id] ?? 0;
          return (
            <>
              <Spacing size={1} />
              <Price color={debt ? 'red' : 'green'} size={SizeEnum.s} className={s.price}>
                {debt}
              </Price>
            </>
          );
        }}
      />
      <Spacing size={4.4} />

      <Title size="h2">Закрыть свой долг</Title>
      <Spacing size={1.4} />
      <div>
        {meta.getExpenses.loading && <Spinner />}
        {!Object.keys(debtsMonthMap).length && !meta.getExpenses.loading && <Stub />}
        {!!Object.keys(debtsMonthMap).length &&
          !meta.getExpenses.loading &&
          Object.entries(debtsMonthMap).map(([month, expenses]) => {
            return (
              <React.Fragment key={month}>
                <Title size="h2">
                  {format(new Date(month), 'LLLL y', {
                    locale: navigator.language === 'ru-RU' ? ru : enUS,
                  })}
                </Title>
                <Spacing size={1.2} />

                {expenses.map((expense) => (
                  <React.Fragment key={expense.id}>
                    <div className={s.expense}>
                      <ExpenseItem
                        {...expense}
                        date={expense.purchaseDate}
                        category={expense.category}
                        price={expense.debtAmount}
                      />
                      <Spacing size={isDesktop ? 1.5 : 0.4} horizontal />
                      <Button
                        theme={ButtonTheme.outlined}
                        icon={<MoneyIcon />}
                        className={s.expense__button}
                        onClick={onCloseDebt(expense)}
                      >
                        {isDesktop ? 'Перевести' : ''}
                      </Button>
                    </div>
                    <Spacing size={1} />
                  </React.Fragment>
                ))}

                <Spacing size={1} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default observer(CloseDebt);
