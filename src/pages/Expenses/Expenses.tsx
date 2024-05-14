import React, { FC, useState } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Button, Dropdown, Input, Spacing, Title } from 'components';
import { ModalEnum } from 'components/modals';
import { mockOptions } from 'config/mock/options';
import { routes } from 'config/routes';
import { MOCK_EXPENSES } from 'entities/mock/expenses';
import { useScreenType } from 'store';
import { useUIStore } from 'store/RootStore/hooks';
import { noop } from 'utils/noop';

import CalendarIcon from 'img/icons/calendar.svg?react';
import ExpenseIcon from 'img/icons/expense.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { StatBanner, ExpenseItem } from './components';

import s from './Expenses.module.scss';

const Expenses: FC = () => {
  const nav = useNavigate();
  const { openModal } = useUIStore();

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const [date, setDate] = useState<string>('');

  const onOpenModal = (modal: ModalEnum) => () => {
    openModal(modal);
  };

  const onGoToDebtsPage = () => {
    nav(routes.debts.full);
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
        <Input
          placeholder="Дата"
          icon={CalendarIcon}
          className={s.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <Spacing size={2.4} />
      <Title size="h2">Декабрь 2023</Title>
      <Spacing size={isDesktop ? 2 : 1} />

      <div>
        {MOCK_EXPENSES.map((expense) => (
          <React.Fragment key={expense.id}>
            <ExpenseItem {...expense} onDelete={onOpenModal(ModalEnum.expensesDelete)} />
            <Spacing size={1} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Expenses;
