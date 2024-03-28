import { FC, ReactNode } from 'react';

import cn from 'classnames';

import s from './Title.module.scss';

type Props = {
  children?: ReactNode;
  size?: 'h1' | 'h2' | 'modal';
};

const Title: FC<Props> = ({ children, size = 'modal' }) => {
  return <p className={cn(s.wrapper, s[`wrapper_${size}`])}>{children}</p>;
};

export default Title;
