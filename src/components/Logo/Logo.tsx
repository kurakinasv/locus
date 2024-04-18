import { FC } from 'react';

import cn from 'classnames';

import LogoAlt from 'img/icons/logo-icon-alt.svg?react';
import LogoDefault from 'img/icons/logo-icon.svg?react';

import s from './Logo.module.scss';

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
