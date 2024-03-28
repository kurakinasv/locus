import React, { FC, useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme, Input, Spacing, Title } from 'components';
import { routes } from 'config/routes';
import { useUserStore } from 'store/RootStore/hooks';

import s from './Auth.module.scss';

const registerFields = ['Юзернейм', 'Почта', 'Пароль', 'Введите пароль повторно'];
const loginFields = ['Почта', 'Пароль'];

const Auth: FC = () => {
  const { login } = useUserStore();
  const nav = useNavigate();

  const [hasAccount, setHasAccount] = useState(false);

  const currentFields = hasAccount ? loginFields : registerFields;

  const onClick = useCallback(() => {
    nav(routes.faq.full);
  }, []);

  return (
    <>
      <div className={s.wrapper}>
        <Title size="modal">{hasAccount ? 'Вход' : 'Регистрация'}</Title>
        <Spacing size={4.5} />
        {currentFields.map((field, i) => (
          <React.Fragment key={i}>
            <Input placeholder={field} />
            {i !== currentFields.length - 1 && <Spacing size={1.5} />}
          </React.Fragment>
        ))}
        <Spacing size={4} />
        <Button stretched onClick={login}>
          {hasAccount ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Spacing size={1} />
        <div>
          {hasAccount ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}{' '}
          <button className={s.baselink} onClick={() => setHasAccount((v) => !v)}>
            {hasAccount ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </div>
      <Spacing size={4} />
      <Button onClick={onClick} theme={ButtonTheme.outlined}>
        FAQ
      </Button>
    </>
  );
};

export default Auth;
