import { FC, memo, useState } from 'react';

import cn from 'classnames';

import { Checkbox } from 'components/Checkbox';
import { ModalEnum } from 'components/modals';
import { Spacing } from 'components/Spacing';
import { useScreenType } from 'store';
import { useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';

import ChoresIcon from 'img/chores/chores-item.svg?react';
import PencilIcon from 'img/icons/pencil.svg?react';
import TrashIcon from 'img/icons/trash.svg?react';

import s from './ScheduleItem.module.scss';

type ScheduleItemProps = {
  id: DefaultId;
  name: string;
  category?: string;
  completed?: boolean;
  choreItem?: boolean;
};

const ScheduleItem: FC<ScheduleItemProps> = ({
  id,
  name,
  category,
  completed = false,
  choreItem = false,
}) => {
  const { openModal } = useUIStore();

  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const [checked, setChecked] = useState(completed);

  const onItemClick = () => {
    if (choreItem) {
      openModal<{ choreId: DefaultId }>(ModalEnum.editChore, { choreId: id });
      return;
    }

    setChecked((prev) => !prev);
  };

  const onChoreArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(ModalEnum.archiveChore, { choreId: id });
  };

  const onScheduleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(ModalEnum.deleteSchedule, { scheduleId: id });
  };

  const onScheduleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(ModalEnum.editSchedule, { scheduleId: id });
  };

  return (
    <div className={cn(s.wrapper, checked && s.wrapper_completed)} onClick={onItemClick}>
      <div className={s.left}>
        {!choreItem && (
          <>
            <Checkbox checked={checked} onCheckedChange={onItemClick} />
            <Spacing size={1} horizontal />
          </>
        )}
        <div>
          <div className={s.name}>{name}</div>
          {choreItem && <div className={s.category}>{category}</div>}
        </div>
      </div>
      <div className={s.right}>
        <div className={s['additional-info']}>
          <ChoresIcon className={s.icon} />
          {choreItem && (
            <>
              <Spacing size={isMobile ? 0.6 : 1.6} horizontal />
              <div className={s.badge}>15{isMobile ? '' : ' баллов'}</div>
            </>
          )}
        </div>
        <Spacing size={isMobile ? 1 : 3} horizontal />
        <div className={s['common-icons']}>
          <button
            className={s['common-icons__icon']}
            type="button"
            title="Редактировать"
            onClick={!choreItem ? onScheduleEdit : undefined}
          >
            <PencilIcon />
          </button>
          <Spacing size={isMobile ? 0.6 : 2} horizontal />
          <button
            className={s['common-icons__icon']}
            type="button"
            title="Удалить"
            onClick={choreItem ? onChoreArchive : onScheduleDelete}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ScheduleItem);
