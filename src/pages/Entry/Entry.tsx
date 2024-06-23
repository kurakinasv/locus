import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme, Spacing } from 'components';
import { RouterPaths, routes } from 'config/routes';
import { useUserStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';

import ArrowIcon from 'img/icons/arrow-left.svg?react';

import s from './Entry.module.scss';

const Entry: React.FC = () => {
  const navigate = useNavigate();

  const { userGroups } = useUserStore();

  const toGroupEnter = (route: RouterPaths) => () => {
    navigate(route);
  };

  const goToProfile = () => {
    navigate(routes.profileSettings.full, {
      state: { from: routes.entry.full },
    });
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
      <Spacing size={2.4} />
      {!!userGroups.length && (
        <Button
          className={s['enter-button']}
          onClick={goToProfile}
          theme={ButtonTheme.outlined}
          size={SizeEnum.xl}
          stretched
          after={<ArrowIcon className={s['arrow-icon']} />}
        >
          Войти в&nbsp;другую группу
        </Button>
      )}
    </div>
  );
};

export default Entry;
