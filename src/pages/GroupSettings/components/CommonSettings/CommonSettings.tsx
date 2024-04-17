import * as React from 'react';

import { Button, Input, Spacing, Title } from 'components';
import { PhotoUpload } from 'components/PhotoUpload';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

import s from './CommonSettings.module.scss';

const CommonSettings: React.FC = () => {
  const image = 'https://picsum.photos/200/200';

  return (
    <>
      <Title size="h2">Общие</Title>
      <Spacing size={2} />
      <PhotoUpload
        image={image}
        // todo: first letter
        stub={<div className={s.avatar__stub}>Н</div>}
      />
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
