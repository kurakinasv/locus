import * as React from 'react';

import cn from 'classnames';

import type { CommonProps } from 'typings/props';
import { SizeEnum } from 'typings/ui';

import type { TextSize, TextTag } from './types';

import s from './Text.module.scss';

type Props = CommonProps & {
  size?: TextSize;
  tag?: TextTag;
};

const Text: React.FC<Props> = ({ size = SizeEnum.m, tag: Tag = 'p', className, children }) => {
  return <Tag className={cn(s.text, size && s[`text_size-${size}`], className)}>{children}</Tag>;
};

export default Text;
