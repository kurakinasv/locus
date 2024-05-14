import { FC, PropsWithChildren } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Spacing } from 'components';
import { useScreenType } from 'store';

import s from './SidebarButton.module.scss';

type Props = {
  isActive: boolean;
  path: string;
  SidebarIcon: FC<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  withText?: boolean;
};

const SidebarButton: FC<PropsWithChildren<Props>> = ({
  SidebarIcon,
  path,
  withText = true,
  children,
  isActive,
}) => {
  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  return (
    <NavLink
      to={path}
      className={cn(s.wrapper, isActive && s.active, isMobile && s.wrapper_mobile)}
    >
      <SidebarIcon className={s.image} />
      {withText && (
        <>
          <Spacing horizontal />
          <div className={s.label}>{children}</div>
        </>
      )}
    </NavLink>
  );
};

export default SidebarButton;
