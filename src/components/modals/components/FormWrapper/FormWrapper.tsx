import * as React from 'react';

import { FieldValues, FormState } from 'react-hook-form';

import { Button, ButtonTheme } from 'components/Button';
import { Spacing } from 'components/Spacing';
import { useScreenType } from 'store';

import s from './FormWrapper.module.scss';

type Props<FormFieldsT extends FieldValues> = React.PropsWithChildren & {
  formState: FormState<FormFieldsT>;
  actionButtonLabel: string;
  cancelButtonLabel?: string;
  hasCancelButton?: boolean;
  isSubmitDisabled?: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const FormWrapper = <FormFieldsT extends FieldValues>({
  children,
  formState,
  actionButtonLabel,
  cancelButtonLabel = 'Отменить',
  hasCancelButton = false,
  isSubmitDisabled,
  handleSubmit,
}: Props<FormFieldsT>) => {
  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.form__fields}>{children}</div>

      <div className={s['footer-buttons']}>
        {hasCancelButton && (
          <>
            <Button
              theme={ButtonTheme.outlined}
              stretched
              disabled={formState.isSubmitting}
              loading={formState.isSubmitting}
              closesModal
            >
              {cancelButtonLabel}
            </Button>
            <Spacing size={1} horizontal={!isMobile} stretched />
          </>
        )}
        <Button
          type="submit"
          stretched
          disabled={
            isSubmitDisabled !== undefined
              ? isSubmitDisabled
              : !formState.isDirty ||
                !Object.keys(formState.dirtyFields).length ||
                formState.isSubmitting
          }
          loading={formState.isSubmitting}
        >
          {actionButtonLabel}
        </Button>
      </div>
    </form>
  );
};

export default FormWrapper;
