import { FC, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Spacing, Button } from 'components';
import { useUserStore } from 'store/RootStore/hooks';

// import s from './ProfileSettings.module.scss';

const ProfileSettings: FC = () => {
  const { logout } = useUserStore();

  const nav = useNavigate();

  const onClick = useCallback(() => {
    nav(-1);
  }, []);

  return (
    <div>
      <div>ProfileSettings</div>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={onClick}>Назад</Button>
    </div>
  );
};

export default ProfileSettings;
