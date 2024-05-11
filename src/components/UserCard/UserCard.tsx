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
  onClick?: VoidFunction;
};

const UserCard: React.FC<Props> = ({ name, image, selected = false, onClick }) => {
  return (
    <button
      type="button"
      className={cn(s.wrapper, selected && s['wrapper_selected'])}
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
      <Text className={s.name}>{name}</Text>
    </button>
  );
};

export default React.memo(UserCard);
