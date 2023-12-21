import { FC, PropsWithChildren, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Spacing } from 'components';
import { useScreenType } from 'hooks/useScreenType';

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
  isActive = false,
}) => {
  const nav = useNavigate();

  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const onClick = useCallback(() => {
    nav(path);
  }, []);

  return (
    <div
      className={cn(s.wrapper, isActive && s.active, isMobile && s.wrapper_mobile)}
      onClick={onClick}
    >
      <SidebarIcon className={s.image} />
      {withText && (
        <>
          <Spacing size={8} horizontal />
          <div className={s.label}>{children}</div>
        </>
      )}
    </div>
  );
};

export default SidebarButton;
