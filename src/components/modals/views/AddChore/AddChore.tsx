import * as React from 'react';

import cn from 'classnames';
import { Field, FieldProps, Form, Formik, FormikTouched, useFormik } from 'formik';

import { Button, ButtonTheme } from 'components/Button';
import { Dropdown } from 'components/Dropdown';
import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';
import { CREATE_CATEGORY_ID } from 'config/chores';
import { VALIDATION_MESSAGES } from 'config/form';
import { ChoreCategoryIcon, choreCategoryIconsMap, choreCategoryIconsNames } from 'entities/chore';
import { FormValues, fieldsConfigMap, initialValues } from 'entities/chore/form';
import { addChoreValidationSchema } from 'entities/chore/validation';
import { useChoreCategoriesStore, useChoresStore, useUIStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

import s from './AddChore.module.scss';

const AddChore: React.FC = () => {
  const { createChore } = useChoresStore();
  const { categoriesOptionsWithCreate, createCategory } = useChoreCategoriesStore();
  const { closeModal } = useUIStore();

  const [option, setOption] = React.useState<string>('');
  const [selectedIcon, setIcon] = React.useState<ChoreCategoryIcon>('other');

  const createNewCategory = option === CREATE_CATEGORY_ID;

  const submitHandler = async () => {
    setSubmitting(true);

    let categoryId;

    if (createNewCategory && values.category) {
      const category = await createCategory({ name: values.category, icon: selectedIcon });

      if (!category) {
        return;
      }

      categoryId = category.id;
    }

    const created = await createChore({
      name: values.name,
      points: Number(values.points),
      categoryId: categoryId ? Number(categoryId) : option ? Number(option) : null,
    });

    if (!created) {
      setSubmitting(false);
      return false;
    }

    setSubmitting(false);
    return true;
  };

  const {
    values,
    setSubmitting,
    isSubmitting: isSubmittingHook,
    validateForm,
    setTouched,
    setFieldError,
    setFieldTouched,
    errors,
    touched,
    getFieldProps,
    setErrors,
    dirty,
  } = useFormik<FormValues>({
    initialValues,
    onSubmit: submitHandler,
    validationSchema: addChoreValidationSchema,
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const val = await validateForm();

    setErrors(val);
    await setTouched(
      Object.keys({ ...val, ...touched }).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as FormikTouched<FormValues>
      )
    );

    if (!option) {
      await setFieldTouched(fieldsConfigMap.categoryOption.name, true);
      setFieldError(fieldsConfigMap.categoryOption.name, VALIDATION_MESSAGES.required);

      return;
    }

    if (createNewCategory && !values.category) {
      await setFieldTouched(fieldsConfigMap.category.name, true);
      setFieldError(fieldsConfigMap.category.name, VALIDATION_MESSAGES.required);

      return;
    }

    if (Object.keys(val).length !== 0) {
      return;
    }

    const submitted = await submitHandler();

    if (!submitted) {
      return;
    }

    closeModal();
  };

  const onChooseIcon = (category: ChoreCategoryIcon) => () => {
    setIcon(category);
  };

  const icons = React.useMemo(() => {
    return choreCategoryIconsNames.map((icon) => {
      const Icon = choreCategoryIconsMap[icon];

      return (
        <Button
          key={icon}
          theme={ButtonTheme.text}
          size={SizeEnum.s}
          className={cn(
            s['category-button'],
            icon === selectedIcon && s['category-button_selected']
          )}
          onClick={onChooseIcon(icon)}
          type="button"
        >
          <Icon className={s.icon} />
        </Button>
      );
    });
  }, [selectedIcon]);

  return (
    <Formik<FormValues> initialValues={initialValues} onSubmit={noop}>
      <Form className={s.form}>
        <div className={s.content}>
          <Field name={fieldsConfigMap.name.name}>
            {({ field }: FieldProps<FormValues>) => (
              <Input
                {...field}
                {...fieldsConfigMap.name}
                touched={touched[fieldsConfigMap.name.name]}
                errorMessage={errors[fieldsConfigMap.name.name]}
                {...getFieldProps(fieldsConfigMap.name.name)}
              />
            )}
          </Field>
          <Spacing size={1.5} />

          <Field name={fieldsConfigMap.points.name}>
            {({ field }: FieldProps<FormValues>) => (
              <Input
                {...field}
                {...fieldsConfigMap.points}
                touched={touched[fieldsConfigMap.points.name]}
                errorMessage={errors[fieldsConfigMap.points.name]}
                {...getFieldProps(fieldsConfigMap.points.name)}
              />
            )}
          </Field>
          <Spacing size={1.5} />

          <div>
            <Dropdown
              name={fieldsConfigMap.categoryOption.name}
              selectedOption={option}
              onChange={setOption}
              options={categoriesOptionsWithCreate}
              placeholder="Категория"
              stretched
            />
            <ErrorMessageLabel
              name={fieldsConfigMap.categoryOption.name}
              message={errors[fieldsConfigMap.categoryOption.name]}
              formik
            />
          </div>
          <Spacing size={0.6} />

          {createNewCategory && (
            <>
              <Field name={fieldsConfigMap.category.name}>
                {({ field }: FieldProps<FormValues>) => (
                  <Input
                    {...field}
                    placeholder="Введите название категории"
                    type="text"
                    touched={touched[fieldsConfigMap.category.name]}
                    errorMessage={errors[fieldsConfigMap.category.name]}
                    {...getFieldProps(fieldsConfigMap.category.name)}
                  />
                )}
              </Field>
              <Spacing size={1} />
              <Text color="gray">Выберите иконку категории</Text>
              <Spacing size={1} />
              <div className={s['category-icons']}>{icons}</div>
            </>
          )}
          <Spacing size={4} />
        </div>

        <Button
          onClick={onSubmit}
          stretched
          type="submit"
          disabled={isSubmittingHook || !dirty}
          loading={isSubmittingHook}
          closesModal
        >
          Создать
        </Button>
      </Form>
    </Formik>
  );
};

export default AddChore;
