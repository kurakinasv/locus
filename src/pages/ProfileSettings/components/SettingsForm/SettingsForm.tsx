import * as React from 'react';

import { Field, FieldInputProps, Form, Formik, FormikHelpers, FormikState } from 'formik';

import { Input, Button, Spacing, PhotoUpload } from 'components';
import { FieldValues, fieldsConfig, initialValues, validationSchema } from 'entities/profile';
import { useScreenType } from 'store';
import { useUserStore } from 'store/RootStore/hooks';
import { toBase64 } from 'utils/imageHandling';

import s from './SettingsForm.module.scss';

type FormikRenderProps<T, Values> = {
  field: FieldInputProps<T>;
  form: FormikHelpers<Values> & FormikState<Values>;
};

type UserRequestType = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  photo: File | null;
};

const SettingsForm: React.FC = () => {
  const screen = useScreenType();
  const { user, editUser } = useUserStore();

  const [photo, setPhoto] = React.useState<string | null>(user?.image ?? null);

  const submitHandler = async (data: UserRequestType, submitProps: FormikHelpers<FieldValues>) => {
    await editUser({
      name: (user?.name ?? '') !== data.name ? data.name : undefined,
      surname: (user?.surname ?? '') !== data.surname ? data.surname : undefined,
      photo: user?.image !== photo ? data.photo : undefined,
    });

    submitProps.resetForm({ values: { ...data, photo: null } });
  };

  if (!user) {
    return null;
  }

  const updatedInitialValues: FieldValues = {
    ...initialValues,
    name: user.name || initialValues.name,
    surname: user.surname || initialValues.surname,
    username: user.username,
    email: user.email,
    photo: null,
  };

  const setPhotoValue = async (file: File, form: FormikRenderProps<File, FieldValues>['form']) => {
    const base64Image: string | null | ArrayBuffer = await toBase64(file);

    if (typeof base64Image === 'string' || base64Image === null) {
      setPhoto(base64Image);
      form.setValues({ ...form.values, photo: file });
    }
  };

  return (
    <Formik
      initialValues={updatedInitialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      {({ errors, touched, getFieldProps, isSubmitting, dirty }) => (
        <Form className={s.form}>
          <Field name="photo">
            {({ field, form }: FormikRenderProps<File, FieldValues>) => (
              <PhotoUpload
                image={(field.value ? photo : user.image) ?? undefined}
                disabled={isSubmitting}
                name={field.name}
                setValue={async (file: File) => setPhotoValue(file, form)}
              />
            )}
          </Field>
          <Spacing size={3} />
          {fieldsConfig.map(({ name, ...rest }) => (
            <React.Fragment key={name}>
              <Field name={name}>
                {({ field }: FormikRenderProps<string, FieldValues>) => (
                  <Input
                    {...field}
                    {...rest}
                    touched={touched[name]}
                    errorMessage={errors[name]}
                    disabled={isSubmitting}
                    {...getFieldProps(name)}
                  />
                )}
              </Field>
              <Spacing size={1.5} />
            </React.Fragment>
          ))}
          <Spacing size={3} />
          <Button
            type="submit"
            disabled={isSubmitting || !dirty}
            loading={isSubmitting}
            stretched={screen === 'mobile'}
          >
            Сохранить изменения
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsForm;
