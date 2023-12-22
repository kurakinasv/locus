import { FC, useState } from 'react';

import { Button, Input, Logo, Spacing, Title } from 'components';
import { useAuthContext } from 'store/context/authContext';

import s from './Auth.module.scss';

const registerFields = ['Юзернейм', 'Почта', 'Пароль', 'Введите пароль повторно'];
const loginFields = ['Почта', 'Пароль'];

const Auth: FC = () => {
  const { setIsAuth } = useAuthContext();

  const [hasAccount, setHasAccount] = useState(false);

  const currentFields = hasAccount ? loginFields : registerFields;

  return (
    <div className={s.container}>
      <Logo />
      <Spacing size={80} />
      <div className={s.wrapper}>
        <Title size="modal">{hasAccount ? 'Вход' : 'Регистрация'}</Title>
        <Spacing size={45} />
        {currentFields.map((field, i) => (
          <>
            <Input placeholder={field} />
            {i !== currentFields.length - 1 && <Spacing size={15} />}
          </>
        ))}
        <Spacing size={40} />
        <Button stretched onClick={() => setIsAuth(true)}>
          {hasAccount ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Spacing size={10} />
        <div>
          {hasAccount ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}{' '}
          <button className={s.baselink} onClick={() => setHasAccount((v) => !v)}>
            {hasAccount ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
