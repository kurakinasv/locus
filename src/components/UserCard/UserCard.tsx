import * as React from 'react';

import cn from 'classnames';

import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';

import UserImageStub from 'img/icons/user.svg?react';

import s from './UserCard.module.scss';

type Props = {
  name: string;
  image?: string;
  selected?: boolean;
  disabled?: boolean;
  footer?: React.ReactNode;
  replaceCurrentUserName?: boolean;
  onClick?: VoidFunction;
};

const UserCard: React.FC<Props> = ({
  name,
  image,
  selected = false,
  disabled = false,
  replaceCurrentUserName = false,
  footer,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn(s.wrapper, selected && s['wrapper_selected'])}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={s.photo}>
        {image ? (
          <img className={s.image} src={image} alt={`Аватар пользователя ${name}`} />
        ) : (
          <UserImageStub />
        )}
      </div>
      <Spacing />
      <Text className={s.name}>{replaceCurrentUserName ? 'Вы' : name}</Text>
      {footer ?? null}
    </button>
  );
};

export default React.memo(UserCard);
