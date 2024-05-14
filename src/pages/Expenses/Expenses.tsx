import React, { FC } from 'react';

import cn from 'classnames';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

import { Button, DatePickerInput, Dropdown, Spacing, Title } from 'components';
import { ModalEnum } from 'components/modals';
import { mockOptions } from 'config/mock/options';
import { routes } from 'config/routes';
import { MOCK_EXPENSES } from 'entities/mock/expenses';
import { useScreenType } from 'store';
import { useUIStore } from 'store/RootStore/hooks';

import ExpenseIcon from 'img/icons/expense.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { StatBanner, ExpenseItem } from './components';

import s from './Expenses.module.scss';

const Expenses: FC = () => {
  const nav = useNavigate();
  const { openModal } = useUIStore();

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const [range, setRange] = React.useState<DateRange | undefined>();

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
        <Dropdown options={mockOptions} placeholder="Категория" stretched={!isDesktop} />
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
      <Title size="h2">Декабрь 2023</Title>
      <Spacing size={isDesktop ? 2 : 1} />

      <div>
        {MOCK_EXPENSES.map((expense) => (
          <React.Fragment key={expense.id}>
            <ExpenseItem
              {...expense}
              onDelete={handleDelete}
              onClick={onOpenEditModal(expense.id)}
            />
            <Spacing size={1} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Expenses;
