import { FC } from 'react';

import { Header, Dropdown, Input, Button, Spacing, Title, ButtonTheme } from 'components';
import { mockOptions } from 'config/mock/options';
import { useScreenType } from 'store';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils';

import PlusIcon from 'img/icons/plus.svg?react';

import s from './GroupSettings.module.scss';

const mockText =
  'Повседневная практика показывает, что новая модель организационной деятельности в значительной степени обуславливает создание форм развития. Повседневная практика показывает, что новая модель организационной деятельности в значительной степени обуславливает создание модели развития. Идейные соображения высшего порядка, а также укрепление и развитие структуры влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий. Повседневная практика показывает, что консультация с широким активом требуют определения и уточнения систем массового участия.';

const GroupSettings: FC = () => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  return (
    <div>
      <Spacing size={30} />
      <Header />
      <Spacing size={30} />
      <Dropdown placeholder="Категория" options={mockOptions} />
      <Spacing size={30} />
      <div className={s.inputs}>
        <Input placeholder="Пароль" />
        <Spacing size={10} horizontal={isDesktop} stretched={!isDesktop} className={s.spacing} />
        <Input placeholder="Пароль" disabled />
      </div>
      <Spacing size={30} />
      <Title>Заголовок второй</Title>
      <Spacing size={15} />
      <Title size="h2">Подзаголовок</Title>
      <Spacing size={30} />

      <p>
        В Avenir Next Cyr предусмотрена поддержка кириллицы,{' '}
        <a href="#" className={s.baselink}>
          латиницы
        </a>{' '}
        и греческих символов. {mockText}
      </p>

      <Spacing size={30} />
      <Button onClick={noop} size={SizeEnum.s}>
        Залитая цветом кнопка s
      </Button>
      <Spacing size={10} />
      <Button onClick={noop}>Залитая цветом кнопка m</Button>
      <Spacing size={10} />
      <Button onClick={noop} theme={ButtonTheme.outlined}>
        Обведенная кнопка m
      </Button>
      <Spacing size={10} />
      <Button onClick={noop} icon={<PlusIcon />} theme={ButtonTheme.outlined}>
        Обведенная кнопка m
      </Button>
      <Spacing size={10} />
      <Button onClick={noop} size={SizeEnum.xl}>
        Залитая цветом кнопка xl
      </Button>
      <Spacing size={10} />
      <Button onClick={noop} icon={<PlusIcon />}>
        Кнопка с иконкой
      </Button>
      <Spacing size={10} />
      <Button onClick={noop} disabled>
        Заблокированная кнопка
      </Button>
      <Spacing size={10} />
      <Button onClick={noop} stretched>
        Кнопка на всю ширину блока
      </Button>
    </div>
  );
};

export default GroupSettings;
