import * as React from 'react';

import cn from 'classnames';

import { Spacing } from 'components/Spacing';
import { Title } from 'components/Title';
import { CommonProps } from 'typings/props';

import s from './ThematicBlock.module.scss';

type Props = CommonProps & {
  title: string;
};

const ThematicBlock: React.FC<Props> = ({ title, children, className }) => {
  return (
    <div className={cn(s.wrapper, className)}>
      <Title size="h2">{title}</Title>
      <Spacing size={1.4} />
      {children}
    </div>
  );
};

export default ThematicBlock;
