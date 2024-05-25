import React, { FC, useEffect } from 'react';

import cn from 'classnames';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

import { Button, DatePickerInput, Dropdown, Spacing, Spinner, Stub, Title } from 'components';
import { ModalEnum } from 'components/modals';
import { routes } from 'config/routes';
import { useScreenType } from 'store';
import {
  useExpenseCategoriesStore,
  useExpensesStore,
  useUIStore,
  useUserStore,
} from 'store/RootStore/hooks';
import { debounce } from 'utils/debounce';

import ExpenseIcon from 'img/icons/expense.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { StatBanner, ExpenseItem } from './components';

import s from './Expenses.module.scss';

const Expenses: FC = () => {
  const nav = useNavigate();
  const { openModal } = useUIStore();

  const {
    expensesMonthMap,
    getGroupExpenses,
    getUsersDebts,
    meta,
    usersDebtsTotalAmounts,
    currentMonthGroupExpenses,
    currentMonthUserExpenses,
    getUserExpenses,
  } = useExpensesStore();
  const { categoriesOptions, getCategories } = useExpenseCategoriesStore();
  const { user } = useUserStore();

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const [range, setRange] = React.useState<DateRange | undefined>();
  const [option, setOption] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([getCategories(), getGroupExpenses(), getUsersDebts(), getUserExpenses()]);
      setLoading(false);
    };

    init();
  }, []);

  const onOpenCreateModal = () => {
    openModal(ModalEnum.expensesAdd);
  };

  const onOpenEditModal = (expenseId: number) => () => {
    openModal(ModalEnum.expensesEdit, { expenseId });
  };

  const onGoToDebtsPage = () => {
    nav(routes.debts.full);
  };

  const onOpenDeleteModal = (expenseId: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(ModalEnum.expensesDelete, { expenseId });
  };

  const debouncedFilter = React.useCallback(
    debounce(
      async ({ option, range }: { option: string; range: DateRange }) =>
        await getGroupExpenses({ categoryId: option, range: range }),
      500
    ),
    []
  );

  const onOptionChange = (option: string) => {
    setOption(option);
    debouncedFilter({ option, range });
  };

  const onDateRangeChange = (dateRange: DateRange | undefined) => {
    setRange(dateRange);

    if (!dateRange?.to || !dateRange?.from) {
      return;
    }

    debouncedFilter({ option, range: dateRange });
  };

  if (loading) {
    return <Spinner />;
  }

  const clearDateRange = () => {
    setRange(undefined);
    debouncedFilter({ option, range: undefined });
  };

  const currentMonth = format(new Date(), 'LLLL', {
    locale: navigator.language === 'ru-RU' ? ru : enUS,
  });

  return (
    <>
      <div className={s.buttons}>
        <Button icon={<PlusIcon />} stretched onClick={onOpenCreateModal}>
          Внести расходы
        </Button>
        <Spacing size={isDesktop ? 1.6 : 0.8} horizontal={isDesktop} stretched />
        <Button icon={<ExpenseIcon />} stretched onClick={onGoToDebtsPage}>
          Закрыть долг
        </Button>
      </div>

      <Spacing size={isDesktop ? 3.2 : 2} />
      <div className={s.stats}>
        <StatBanner
          value={currentMonthGroupExpenses}
          description={<>общие траты за&nbsp;{currentMonth}</>}
          color="turquoise"
        />
        <StatBanner
          value={currentMonthUserExpenses}
          description={<>личные траты за&nbsp;{currentMonth}</>}
          color="purple"
        />
        <StatBanner
          value={usersDebtsTotalAmounts[user?.id ?? '']}
          description={<>текущий долг</>}
          color="orange"
        />
      </div>

      <Spacing size={isDesktop ? 3.2 : 2} />
      <div className={cn(s.controls, !isDesktop && s.controls_mobile)}>
        <Dropdown
          options={categoriesOptions}
          placeholder="Категория"
          stretched={!isDesktop}
          selectedOption={option}
          onChange={onOptionChange}
        />
        <Spacing size={1.6} horizontal={isDesktop} className={s.spacing} />
        <DatePickerInput
          mode="range"
          placeholder="Выберите даты"
          className={s.input}
          range={range}
          setRange={onDateRangeChange}
          stretched={!isDesktop}
          max={90}
          fromToday={false}
          onClearDate={clearDateRange}
        />
      </div>

      <Spacing size={2.4} />

      <div>
        {meta.getExpenses.loading && <Spinner />}
        {!Object.keys(expensesMonthMap).length && !meta.getExpenses.loading && <Stub />}
        {!!Object.keys(expensesMonthMap).length &&
          !meta.getExpenses.loading &&
          Object.entries(expensesMonthMap).map(([month, expenses]) => {
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
                    <ExpenseItem
                      {...expense}
                      date={expense.purchaseDate}
                      onDelete={onOpenDeleteModal(expense.id)}
                      onClick={onOpenEditModal(expense.id)}
                    />
                    <Spacing size={1} />
                  </React.Fragment>
                ))}

                <Spacing size={1} />
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default observer(Expenses);
