import * as React from 'react';

import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UserCard } from 'components/UserCard';
import { User } from 'entities/user';
import { UsersSelectListType } from 'entities/user/service';
import { useScreenType } from 'store';
import { useUserStore } from 'store/RootStore/hooks';

import s from './UsersSlider.module.scss';

type Props = {
  users: UsersSelectListType;
  disabled?: boolean;
  replaceCurrentUserName?: boolean;
  pinCurrentUser?: boolean;
  getCardFooter?: (user: User) => React.ReactNode;
  onUserClick?: (id: User['id']) => VoidFunction;
};

const UsersSlider: React.FC<Props> = ({
  users,
  disabled = false,
  replaceCurrentUserName = false,
  pinCurrentUser = false,
  onUserClick,
  getCardFooter,
}) => {
  const { user: currentUser } = useUserStore();

  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const filteredUsers = React.useMemo(() => {
    if (!pinCurrentUser) {
      return users;
    }

    const current = users.find((user) => user.id === currentUser?.id);

    if (!current) {
      return users;
    }

    const filtered = users.filter((user) => user.id !== currentUser?.id);
    filtered.unshift(current);

    return filtered;
  }, [currentUser?.id, pinCurrentUser, users]);

  return (
    <div className={s.list}>
      <Swiper
        direction="horizontal"
        slidesPerView="auto"
        spaceBetween={isDesktop ? 16 : 10}
        slidesOffsetBefore={12}
        slidesOffsetAfter={12}
        modules={[Mousewheel]}
        mousewheel={{
          releaseOnEdges: true,
        }}
        longSwipesRatio={0.05}
      >
        {filteredUsers.map((user) => (
          <SwiperSlide key={user.id}>
            <UserCard
              name={
                user.id === currentUser?.id && replaceCurrentUserName
                  ? 'Вы'
                  : user.name || user.username
              }
              // todo: pass image
              // image={user.image}
              selected={user.selected}
              disabled={disabled}
              onClick={onUserClick?.(user.id)}
              footer={getCardFooter?.(user)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(UsersSlider);
