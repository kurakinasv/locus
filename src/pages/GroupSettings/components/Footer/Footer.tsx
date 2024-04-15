import * as React from 'react';

import { Button } from 'components/Button';
import { Spacing } from 'components/Spacing';
import { useScreenType } from 'store';
import { noop } from 'utils/noop';

import DoorIcon from 'img/icons/door.svg?react';
import TrashIcon from 'img/icons/trash.svg?react';

import s from './Footer.module.scss';

const Footer: React.FC = () => {
  const screen = useScreenType();

  return (
    <div className={s.footer}>
      <Button icon={<DoorIcon />} onClick={noop} stretched>
        Выйти из группы
      </Button>
      <Spacing size={1.6} horizontal={screen === 'desktop'} />
      <Button icon={<TrashIcon />} onClick={noop} stretched>
        Удалить группу
      </Button>
    </div>
  );
};

export default Footer;
