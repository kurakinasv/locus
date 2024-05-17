import React, { FC, useEffect } from 'react';

import cn from 'classnames';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

import { Button, DatePickerInput, Dropdown, Spacing, Spinner, Title } from 'components';
import { ModalEnum } from 'components/modals';
import { routes } from 'config/routes';
import { useScreenType } from 'store';
import { useExpenseCategoriesStore, useExpensesStore, useUIStore } from 'store/RootStore/hooks';

import ExpenseIcon from 'img/icons/expense.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { StatBanner, ExpenseItem } from './components';

import s from './Expenses.module.scss';

const Expenses: FC = () => {
  const nav = useNavigate();
  const { openModal } = useUIStore();

  const { expensesMonthMap, getGroupExpenses } = useExpensesStore();
  const { categoriesOptions, getCategories } = useExpenseCategoriesStore();

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const [range, setRange] = React.useState<DateRange | undefined>();
  const [option, setOption] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([getCategories(), getGroupExpenses()]);
      setLoading(false);
    };

    init();
  }, []);

  const onOpenModal = (modal: ModalEnum) => () => {
    openModal(modal);
  };

  const onOpenEditModal = (expenseId: number) => () => {
    openModal(ModalEnum.expensesEdit, { expenseId });
  };

  const onGoToDebtsPage = () => {
    nav(routes.debts.full);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenModal(ModalEnum.expensesDelete)();
  };

  const clearDateRange = () => {
    setRange(undefined);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={s.buttons}>
        <Button icon={<PlusIcon />} stretched onClick={onOpenModal(ModalEnum.expensesAdd)}>
          Внести расходы
        </Button>
        <Spacing size={isDesktop ? 1.6 : 0.8} horizontal={isDesktop} stretched />
        <Button icon={<ExpenseIcon />} stretched onClick={onGoToDebtsPage}>
          Закрыть долг
        </Button>
      </div>

      <Spacing size={isDesktop ? 3.2 : 2} />
      <div className={s.stats}>
        <StatBanner value={100000000} description={<>за&nbsp;ноябрь</>} color="turquoise" />
        <StatBanner
          value={100000000}
          description={<>общие траты за&nbsp;ноябрь</>}
          color="purple"
        />
        <StatBanner
          value={100000000}
          description={<>общие траты за&nbsp;ноябрь</>}
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
          onChange={setOption}
        />
        <Spacing size={1.6} horizontal={isDesktop} className={s.spacing} />
        <DatePickerInput
          mode="range"
          placeholder="Выберите даты"
          className={s.input}
          range={range}
          setRange={setRange}
          stretched={!isDesktop}
          max={31}
          fromToday={false}
          onClearDate={clearDateRange}
        />
      </div>

      <Spacing size={2.4} />

      <div>
        {expensesMonthMap &&
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
                      onDelete={handleDelete}
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
