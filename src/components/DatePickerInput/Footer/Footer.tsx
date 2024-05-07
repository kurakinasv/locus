import * as React from 'react';

import { DateRange } from 'react-day-picker';

import { Button, ButtonTheme } from 'components/Button';
import { Spacing } from 'components/Spacing';
import { SizeEnum } from 'typings/ui';

type Props = {
  range: DateRange | undefined;
  onClick: VoidFunction;
};

const Footer: React.FC<Props> = ({ range, onClick }) => {
  return (
    <>
      <Spacing />
      <Button
        onClick={onClick}
        size={SizeEnum.s}
        theme={ButtonTheme.outlined}
        disabled={!range?.from || !range?.to}
      >
        Ок
      </Button>
    </>
  );
};

export default React.memo(Footer);
