/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import cn from 'classnames';

import s from './Logo.module.scss';

// todo: fix
// @ts-ignore
import LogoDefault from 'img/icons/logo-icon.svg?react';
// @ts-ignore
import LogoAlt from 'img/icons/logo-icon-alt.svg?react';

type Props = {
  theme?: 'default' | 'alt';
};

const Logo: FC<Props> = ({ theme = 'default' }) => {
  return (
    <div className={s.logo}>
      {theme === 'default' ? (
        <LogoDefault className={s.logo__image} />
      ) : (
        <LogoAlt className={s.logo__image} />
      )}
      <div className={cn(s.logo__name, s[`logo__name_${theme}`])}>locus</div>
    </div>
  );
};

export default Logo;
