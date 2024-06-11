import * as React from 'react';

import cn from 'classnames';

import { SizeEnum } from 'typings/ui';

import s from './Avatar.module.scss';

type Props = {
  image?: string;
  stub?: React.ReactNode;
  size?: SizeEnum;
};

const Avatar: React.FC<Props> = ({ image, stub, size = SizeEnum.m }) => {
  return (
    <div className={cn(s.avatar, s[`avatar_size-${size}`])}>
      {image && <img src={image} alt="avatar" />}
      {!image && stub && stub}
    </div>
  );
};

export default Avatar;
