import * as React from 'react';

import cn from 'classnames';

import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';
import GroupImageStub from 'img/groupSettings/image-stub.png';
import { useScreenType } from 'store';

import s from './GroupCard.module.scss';

type Props = {
  name: string;
  image?: string;
  selected?: boolean;
  disabled?: boolean;
  footer?: React.ReactNode;
  onClick?: VoidFunction;
};

const GroupCard: React.FC<Props> = ({
  name,
  image,
  selected = false,
  disabled = false,
  footer,
  onClick,
}) => {
  const isMobile = useScreenType() === 'mobile';

  // todo: move to common components
  return (
    <button
      type="button"
      className={cn(s.wrapper, selected && s['wrapper_selected'])}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={s.photo}>
        <img className={s.image} src={image ?? GroupImageStub} alt={`Аватар группы ${name}`} />
      </div>
      <Spacing horizontal={isMobile} />
      <Text className={s.name}>{name}</Text>
      {footer ?? null}
    </button>
  );
};

export default React.memo(GroupCard);
