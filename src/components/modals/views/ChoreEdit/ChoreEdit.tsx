import * as React from 'react';

import cn from 'classnames';
import { Field, FieldProps, Form, Formik, FormikTouched, useFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { Button, ButtonTheme } from 'components/Button';
import { Dropdown } from 'components/Dropdown';
import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';
import { WarningBlock } from 'components/WarningBlock';
import { CREATE_CATEGORY_ID } from 'config/chores';
import { VALIDATION_MESSAGES } from 'config/form';
import { ChoreCategoryIcon, choreCategoryIconsMap, choreCategoryIconsNames } from 'entities/chore';
import { FormValues, fieldsConfigMap, initialValues } from 'entities/chore/form';
import { addChoreValidationSchema } from 'entities/chore/validation';
import { MOCK_CHORES_CATEGORIES } from 'entities/mock/chores';
import { useScreenType } from 'store';
import { useChoresStore, useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

import s from './ChoreEdit.module.scss';

const ChoreEdit: React.FC = () => {
  const { getChore, editChore, createCategory, categoriesOptions, activeChore } = useChoresStore();
  const { closeModal, modalState } = useUIStore<{ choreId: DefaultId }>();

  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const [option, setOption] = React.useState<string>('');
  const [selectedIcon, setIcon] = React.useState<ChoreCategoryIcon>('other');

  const [initial, setInitial] = React.useState(initialValues);

  const createNewCategory = option === CREATE_CATEGORY_ID;

  const init = async () => {
    if (!modalState?.choreId) {
      return;
    }

    const chore = await getChore(modalState.choreId);

    if (!chore) {
      return;
    }

    const categoryOption = String(MOCK_CHORES_CATEGORIES[chore.category.id - 1].id);

    setInitial({
      name: chore.name,
      points: chore.points,
      category: '',
      categoryOption,
    });

    setOption(categoryOption);

    await setTouched(
      Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {} as FormikTouched<FormValues>
      )
    );
  };

  React.useEffect(() => {
    init();
  }, []);

  const submitHandler = async () => {
    let categoryId;

    if (createNewCategory && values.category) {
      categoryId = await createCategory({ name: values.category, icon: selectedIcon });
    }

    if (modalState?.choreId) {
      await editChore({
        name: values.name,
        points: Number(values.points),
        categoryId: categoryId ? Number(categoryId) : Number(option),
        choreId: modalState?.choreId,
      });
    }
  };

  const {
    values,
    setSubmitting,
    isSubmitting: isSubmittingHook,
    validateForm,
    setTouched,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    getFieldProps,
    setErrors,
    dirty,
  } = useFormik<FormValues>({
    initialValues: initial,
    onSubmit: submitHandler,
    validationSchema: addChoreValidationSchema,
    enableReinitialize: true,
  });

  React.useEffect(() => {
    setFieldValue(fieldsConfigMap.categoryOption.name, option);
  }, [option]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setSubmitting(true);

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
      setSubmitting(false);

      return;
    }

    if (createNewCategory && !values.category) {
      await setFieldTouched(fieldsConfigMap.category.name, true);
      setFieldError(fieldsConfigMap.category.name, VALIDATION_MESSAGES.required);
      setSubmitting(false);

      return;
    }

    if (Object.keys(val).length !== 0) {
      setSubmitting(false);
      return;
    }

    await submitHandler();

    setSubmitting(false);
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

  if (!activeChore) {
    return null;
  }

  return (
    <>
      <WarningBlock>
        Изменение задачи изменит все незавершенные запланированные задачи, связанные с&nbsp;ней
      </WarningBlock>
      <Spacing size={1.4} />

      <Formik<FormValues> initialValues={initial} onSubmit={noop}>
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
                options={categoriesOptions}
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

          <div className={s['footer-buttons']}>
            <Button
              theme={ButtonTheme.outlined}
              stretched
              disabled={isSubmittingHook}
              loading={isSubmittingHook}
              closesModal
            >
              Отменить
            </Button>
            <Spacing size={1} horizontal={!isMobile} stretched />
            <Button
              onClick={onSubmit}
              stretched
              type="submit"
              disabled={isSubmittingHook || !dirty}
              loading={isSubmittingHook}
              closesModal
            >
              Сохранить
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default observer(ChoreEdit);
