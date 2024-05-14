import * as React from 'react';

import { Field, FieldInputProps, Form, Formik, FormikHelpers, FormikState } from 'formik';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Spacing } from 'components/Spacing';
import { FieldValues, registerInitialValues, registerFieldsConfig } from 'entities/user/form';
import { RegisterParams } from 'entities/user/params';
import { registerValidationSchema } from 'entities/user/validation';
import { useAuthStore } from 'store/RootStore/hooks';

import s from './RegisterForm.module.scss';

type FormikRenderProps<T, Values> = {
  field: FieldInputProps<T>;
  form: FormikHelpers<Values> & FormikState<Values>;
};

const RegisterForm: React.FC = () => {
  const { register } = useAuthStore();

  const submitHandler = async (data: RegisterParams) => {
    await register(data);
  };

  return (
    <Formik
      initialValues={registerInitialValues}
      onSubmit={submitHandler}
      validationSchema={registerValidationSchema}
    >
      {({ errors, touched, getFieldProps, isSubmitting, dirty }) => {
        return (
          <Form className={s.form}>
            {registerFieldsConfig.map(({ name, ...rest }) => (
              <React.Fragment key={name}>
                <Field name={name}>
                  {({ field }: FormikRenderProps<string, FieldValues>) => (
                    <Input
                      {...field}
                      {...rest}
                      touched={touched[name]}
                      errorMessage={errors[name]}
                      {...getFieldProps(name)}
                    />
                  )}
                </Field>
                <Spacing size={1.5} />
              </React.Fragment>
            ))}
            <Spacing size={4} />
            <Button
              stretched
              type="submit"
              disabled={isSubmitting || !dirty}
              loading={isSubmitting}
            >
              Зарегистрироваться
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(RegisterForm);
