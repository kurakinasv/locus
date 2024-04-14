import { FC, ReactNode } from 'react';

import cn from 'classnames';

import { PropsWithClassName } from 'typings/props';

import s from './Title.module.scss';

type Props = PropsWithClassName & {
  children?: ReactNode;
  size?: 'h1' | 'h2' | 'modal';
};

const Title: FC<Props> = ({ children, size = 'modal', className }) => {
  return <p className={cn(s.wrapper, s[`wrapper_${size}`], className)}>{children}</p>;
};

export default Title;
