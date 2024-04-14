import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Spacing } from 'components';
import { RouterPaths } from 'config/routes';
import { SizeEnum } from 'typings/ui';

import s from './Entry.module.scss';

const Entry: React.FC = () => {
  const navigate = useNavigate();

  const toGroupEnter = (route: RouterPaths) => () => {
    navigate(route);
  };

  return (
    <div className={s.wrapper}>
      <Button onClick={toGroupEnter(RouterPaths.createGroup)} size={SizeEnum.xl} stretched>
        Создать новую группу
      </Button>
      <Spacing size={2.4} />
      <Button onClick={toGroupEnter(RouterPaths.enterGroup)} size={SizeEnum.xl} stretched>
        Присоединиться к&nbsp;существующей группе
      </Button>
    </div>
  );
};

export default Entry;
