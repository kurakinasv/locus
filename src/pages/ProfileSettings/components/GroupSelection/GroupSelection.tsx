import * as React from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme, Spacing, Text, ThematicBlock } from 'components';
import { MAX_GROUPS } from 'config/group';
import { routes } from 'config/routes';
import { useScreenType } from 'store';
import GroupModel from 'store/models/GroupModel';
import { useGroupMemberStore, useGroupStore, useUserStore } from 'store/RootStore/hooks';

import { GroupCard } from './GroupCard';

import s from './GroupSelection.module.scss';

const GroupSelection: React.FC = () => {
  const nav = useNavigate();
  const isDesktop = useScreenType() === 'desktop';

  const { group, getGroup } = useGroupStore();
  const { userGroups } = useUserStore();
  const { switchGroup, meta } = useGroupMemberStore();

  const [groups, setGroups] = React.useState<GroupModel[]>([]);

  const goToCreateGroup = () => {
    nav(routes.createAnotherGroup.full);
  };

  const goToJoinGroup = () => {
    nav(routes.joinAnotherGroup.full);
  };

  React.useEffect(() => {
    Promise.all(userGroups.map((groupId) => getGroup(groupId))).then((groups) => {
      const filteredGroups: GroupModel[] = groups.filter(
        (group) => group && group instanceof GroupModel
      ) as GroupModel[];

      setGroups(filteredGroups);
    });
  }, [userGroups]);

  return (
    <ThematicBlock title="Изменить текущую группу">
      <div className={cn(s.cards, groups.length === 3 && isDesktop && s.cards_stretch)}>
        {groups.map(({ id, name, image }) => (
          <GroupCard
            key={id}
            name={name}
            image={image ?? undefined}
            onClick={() => switchGroup(id)}
            disabled={meta.switchGroup.loading || group?.id === id}
            selected={group?.id === id}
          />
        ))}
      </div>
      {groups.length < MAX_GROUPS && (
        <>
          <Spacing size={2.5} />
          <Button
            stretched
            onClick={goToCreateGroup}
            theme={ButtonTheme.outlined}
            disabled={meta.switchGroup.loading}
          >
            Создать группу
          </Button>
          <Spacing size={1} />
          <Button
            stretched
            onClick={goToJoinGroup}
            theme={ButtonTheme.outlined}
            disabled={meta.switchGroup.loading}
          >
            Войти в группу по коду
          </Button>
        </>
      )}
      {groups.length >= MAX_GROUPS && (
        <>
          <Spacing size={1} />
          <Text className={s.text}>Максимальное количество групп: {MAX_GROUPS}</Text>
        </>
      )}
    </ThematicBlock>
  );
};

export default observer(GroupSelection);
