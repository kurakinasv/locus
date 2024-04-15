import * as React from 'react';

import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, Spacing, Text, Title } from 'components';
import { MOCK_USERS } from 'entities/mock/user';
import { User } from 'entities/user';
import { useScreenType } from 'store';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

import { UserCard } from './UserCard';

import s from './RightsSettings.module.scss';

const RightsSettings: React.FC = () => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const [users, setUsers] = React.useState<Array<User & { selected: boolean }>>(() =>
    MOCK_USERS.reduce(
      // todo: change to group id
      (prev, user) => [...prev, { ...user, selected: user.adminInGroups?.includes(1) ?? false }],
      [] as Array<User & { selected: boolean }>
    )
  );

  const onUserClick = React.useCallback(
    (id: number) => () => {
      setUsers((prev) =>
        prev.map((user) => (id === user.id ? { ...user, selected: !user.selected } : user))
      );
    },
    []
  );

  return (
    <>
      <Title size="h2">Права</Title>
      <Spacing size={2} />
      <Text color="gray">
        Настройте права для участников группы. Выберите участников, которые получат или потеряют
        права администратора группы.
      </Text>
      <Spacing size={1.5} />
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
                name={user.name}
                image={user.image}
                selected={user.selected}
                onClick={onUserClick(user.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={noop}>
        Сохранить
      </Button>
    </>
  );
};

export default RightsSettings;
