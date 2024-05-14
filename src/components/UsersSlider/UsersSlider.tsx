import * as React from 'react';

import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UserCard } from 'components/UserCard';
import { User } from 'entities/user';
import { UsersSelectListType } from 'entities/user/service';
import { useScreenType } from 'store';

import s from './UsersSlider.module.scss';

type Props = {
  users: UsersSelectListType;
  disabled?: boolean;
  getCardFooter?: (user: User) => React.ReactNode;
  onUserClick?: (id: User['id']) => VoidFunction;
};

const UsersSlider: React.FC<Props> = ({ users, disabled = false, onUserClick, getCardFooter }) => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

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
        {users.map((user) => (
          <SwiperSlide key={user.id}>
            <UserCard
              name={user.name || user.username}
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
