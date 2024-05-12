import * as React from 'react';

import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';

import WarningIcon from 'img/icons/error.svg?react';

import s from './WarningBlock.module.scss';

const WarningBlock: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={s['warning']}>
      <WarningIcon className={s['warning__icon']} />
      <Spacing horizontal />
      <Text className={s['warning__text']}>{children}</Text>
    </div>
  );
};

export default WarningBlock;
