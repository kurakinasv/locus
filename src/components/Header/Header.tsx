/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';

import { Logo, Spacing, Title } from 'components';

// @ts-ignore
import LogoDefault from 'img/icons/logo-icon.svg?react';
// @ts-ignore
import LogoAlt from 'img/icons/logo-icon-alt.svg?react';

import s from './Header.module.scss';

type Props = {
  title?: string;
  hasGroup?: boolean;
};

const Header: FC<Props> = ({ title, hasGroup = false }) => {
  return (
    <div className={s.wrapper}>
      {title ? <Title size="h1">{title}</Title> : <Logo />}
      <div className={s.icons}>
        {hasGroup && (
          <>
            <LogoAlt />
            <Spacing size={15} horizontal />
          </>
        )}
        <LogoDefault />
      </div>
    </div>
  );
};

export default Header;
