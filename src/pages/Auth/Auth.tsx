import React, { FC, useCallback, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme, Spacing, Spinner, Title } from 'components';
import { routes } from 'config/routes';
import { useAuthStore, useRootStore } from 'store/RootStore/hooks';

import { RegisterForm, LoginForm } from './components';

import s from './Auth.module.scss';

const Auth: FC = () => {
  const { isDev } = useRootStore();
  const { meta } = useAuthStore();

  const nav = useNavigate();

  const [hasAccount, setHasAccount] = useState(false);

  const onClick = useCallback(() => {
    nav(routes.faq.full);
  }, []);

  if (meta.loading) {
    return <Spinner />;
  }

  return (
    <>
      <Spacing size={8} />
      <div className={s.wrapper}>
        <Title size="modal">{hasAccount ? 'Вход' : 'Регистрация'}</Title>
        <Spacing size={4.5} />
        {hasAccount ? <LoginForm /> : <RegisterForm />}
        <Spacing size={1} />
        <div>
          {hasAccount ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}{' '}
          <button className={s.baselink} onClick={() => setHasAccount((v) => !v)}>
            {hasAccount ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </div>
      {isDev && (
        <>
          <Spacing size={4} />
          <Button onClick={onClick} theme={ButtonTheme.outlined}>
            FAQ
          </Button>
        </>
      )}
    </>
  );
};

export default observer(Auth);
