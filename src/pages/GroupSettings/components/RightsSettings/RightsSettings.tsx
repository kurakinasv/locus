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

type Props = {
  userId: User['id'];
  usersInGroup: User[];
  editGroup: (userIds: Array<User['id']>) => void;
};

const RightsSettings: React.FC<Props> = ({ usersInGroup, userId, editGroup }) => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const [touched, setTouched] = React.useState(false);

  const [users, setUsers] = React.useState<Array<User & { selected: boolean }>>(() =>
    usersInGroup.reduce(
      // todo: set other admins
      (prev, user) => [...prev, { ...user, selected: user.id === userId }],
      [] as Array<User & { selected: boolean }>
    )
  );

  const onUserClick = React.useCallback(
    (id: User['id']) => () => {
      if (userId === id) {
        return;
      }

      setUsers((prev) =>
        prev.map((user) => (id === user.id ? { ...user, selected: !user.selected } : user))
      );
      setTouched(true);
    },
    [userId]
  );

  const onSaveClick = React.useCallback(() => {
    const selectedUsers = users.filter((user) => user.selected);

    editGroup(selectedUsers.map((user) => user.id));
  }, [users, editGroup]);

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
                name={user.name || user.username}
                // todo: pass image
                // image={user.image}
                selected={user.selected}
                onClick={onUserClick(user.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={onSaveClick} disabled={!touched}>
        Сохранить
      </Button>
    </>
  );
};

export default React.memo(RightsSettings);
