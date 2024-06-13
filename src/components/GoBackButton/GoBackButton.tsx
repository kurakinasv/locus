import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'components/Button';

import ArrowIcon from 'img/icons/arrow-left.svg?react';

import s from './GoBackButton.module.scss';

const GoBackButton: React.FC<{ label?: string; stretched?: boolean }> = ({
  label = 'Назад',
  stretched = true,
}) => {
  const nav = useNavigate();

  const onGoBack = React.useCallback(() => {
    nav(-1);
  }, []);

  return (
    <Button
      className={s['arrow-button']}
      onClick={onGoBack}
      icon={<ArrowIcon className={s.arrow} />}
      stretched={stretched}
    >
      {label}
    </Button>
  );
};

export default GoBackButton;
