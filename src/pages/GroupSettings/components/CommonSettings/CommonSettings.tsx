import * as React from 'react';

import { Button, Input, Spacing, Title } from 'components';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

import s from './CommonSettings.module.scss';

const CommonSettings: React.FC = () => {
  const image = 'https://picsum.photos/200/200';

  return (
    <>
      <Title size="h2">Общие</Title>
      <Spacing size={2} />
      <div className={s.photo}>
        <div className={s.avatar}>
          {/* todo: first letter */}
          {image ? <img src={image} alt="avatar" /> : <div className={s.avatar__stub}>Н</div>}
        </div>
        <Spacing size={1.2} />
        <Button size={SizeEnum.s} onClick={noop}>
          Загрузить фото
        </Button>
      </div>
      <Spacing size={3.3} />
      <Input placeholder="Название группы" value="" onChange={noop} />
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={noop}>
        Сохранить
      </Button>
    </>
  );
};

export default CommonSettings;
