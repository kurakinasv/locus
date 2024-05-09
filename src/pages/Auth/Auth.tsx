import React, { FC, useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme, Spacing, Title } from 'components';
import { routes } from 'config/routes';
import { useRootStore } from 'store/RootStore/hooks';

import { RegisterForm, LoginForm } from './components';

import s from './Auth.module.scss';

const Auth: FC = () => {
  const { isDev } = useRootStore();
  const nav = useNavigate();

  const [hasAccount, setHasAccount] = useState(false);

  const onClick = useCallback(() => {
    nav(routes.faq.full);
  }, []);

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

export default Auth;
