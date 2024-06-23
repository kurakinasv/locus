import * as React from 'react';

import { Button, ButtonTheme } from 'components/Button';
import { Spacing } from 'components/Spacing';

import s from './DefaultConfirm.module.scss';

type Props = React.PropsWithChildren & {
  cancelButton?: string;
  confirmButton: string;
  cancelAction?: VoidFunction;
  confirmAction?: VoidFunction;
};

const DefaultConfirm: React.FC<Props> = ({
  cancelAction,
  cancelButton,
  confirmAction,
  confirmButton,
  children,
}) => {
  return (
    <div className={s.wrapper}>
      <Spacing size={1.6} />
      <div className={s.content}>{children}</div>
      <Spacing size={3} />
      <div className={s['confirm__buttons']}>
        {cancelButton && cancelAction && (
          <>
            <Button theme={ButtonTheme.outlined} closesModal stretched onClick={cancelAction}>
              {cancelButton}
            </Button>
            <Spacing size={1} horizontal />
          </>
        )}
        <Button closesModal stretched onClick={confirmAction}>
          {confirmButton}
        </Button>
      </div>
    </div>
  );
};

export default DefaultConfirm;
