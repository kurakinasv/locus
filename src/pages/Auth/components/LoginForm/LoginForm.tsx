import * as React from 'react';

import { Field, FieldInputProps, Form, Formik, FormikHelpers, FormikState } from 'formik';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Spacing } from 'components/Spacing';
import { loginFieldsConfig, loginInitialValues, FieldValuesLogin } from 'entities/user/form';
import { LoginParams } from 'entities/user/params';
import { loginValidationSchema } from 'entities/user/validation';
import { useAuthStore } from 'store/RootStore/hooks';

import s from './LoginForm.module.scss';

type FormikRenderProps<T, Values> = {
  field: FieldInputProps<T>;
  form: FormikHelpers<Values> & FormikState<Values>;
};

const LoginForm: React.FC = () => {
  const { login } = useAuthStore();

  const submitHandler = async (data: LoginParams) => {
    await login(data);
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      onSubmit={submitHandler}
      validationSchema={loginValidationSchema}
    >
      {({ errors, touched, getFieldProps, isSubmitting, dirty }) => {
        return (
          <Form className={s.form}>
            {loginFieldsConfig.map(({ name, ...rest }) => (
              <React.Fragment key={name}>
                <Field name={name}>
                  {({ field }: FormikRenderProps<string, FieldValuesLogin>) => (
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
              Войти
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(LoginForm);
