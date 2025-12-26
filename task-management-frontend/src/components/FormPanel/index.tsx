import { Children, isValidElement, useReducer, useState } from 'react';
import type { Dispatch, FC, ReactElement, ReactNode } from 'react';

import { ErrorAlert } from '@/components/ErrorAlert';
import { Button } from '@/components/ui/button';

import { cn } from '@/utils/classnames';
import { compareValues } from '@/utils/compare-values';

import FormInput from './FormInput';
import FormPanelContext from './form-panel-context';
import reducer from './form-panel-reducer';
import type { ActionType, ResetFormActionType, UpdateErrorsActionType } from './form-panel-reducer';
import { getFormInputElements, getReactElementClones } from './process-form-panel-children';
import validate from './validators';

type ConditionsToShow = {
  matches: {
    field: string;
    condition: '===' | '!==' | '>' | '<' | '>=' | '<=';
    value: string;
  }[];
  type?: 'every' | 'some';
};

function getInitialDataAndValidatorsFromChildren(
  children: ReactNode
): [Record<string, any>, Record<string, any>, Record<string, any>] {
  let initialData = {};
  let validators = {};
  let conditionsToShow = {};
  Children.forEach(children, element => {
    if (!isValidElement(element)) return;

    const elementProps = element.props as {
      fieldName: string;
      defaultValue: any;
      validators: any;
      conditionsToShow: any;
    };

    initialData = {
      ...initialData,
      [elementProps.fieldName]: elementProps.defaultValue,
    };
    validators = {
      ...validators,
      [elementProps.fieldName]: elementProps.validators,
    };
    conditionsToShow = {
      ...conditionsToShow,
      [elementProps.fieldName]: elementProps.conditionsToShow,
    };
  });

  return [initialData, validators, conditionsToShow];
}

type FormPanelBaseProps = {
  children: ReactElement | ReactElement[];
  onSubmit: (data: any) => void;
  loading: boolean;
  error: any;
  cancelButtonLabel?: string;
  submitButtonLabel?: string;
  buttonRef?: React.RefObject<{
    submit: () => void;
    cancel: () => void;
    reset?: () => void;
  }>;
  className?: string;
};

function shouldHideFormInput(conditionsToShow: ConditionsToShow, formData: Record<string, any>) {
  if (!conditionsToShow) return false;
  if (!conditionsToShow.matches.length) return false;

  if (conditionsToShow.type === 'some') {
    return !conditionsToShow.matches.some(c =>
      compareValues(formData[c.field], c.condition, c.value)
    );
  } else {
    return !conditionsToShow.matches.every(c =>
      compareValues(formData[c.field], c.condition, c.value)
    );
  }
}

function useFormPanelLogic(children: ReactElement | ReactElement[], readOnlyMode?: boolean) {
  const formInputElements = getFormInputElements(children);
  const reactElementClones = getReactElementClones(children, readOnlyMode);

  const [initialData, validators, conditionsToShow] =
    getInitialDataAndValidatorsFromChildren(formInputElements);

  const [formState, formDispatch] = useReducer(reducer, { data: initialData });
  const formContext = { formState, formDispatch };

  function validateForm() {
    let errors = {};

    // Validate each field with its validators
    Object.keys(formState.data).forEach(f => {
      if (validators[f]) {
        if (!shouldHideFormInput(conditionsToShow[f], formState.data)) {
          const error = validate(validators[f], formState, formState.data[f]);
          if (error) {
            errors = { ...errors, [f]: error };
          }
        }
      }
    });

    // Validate date ranges
    formInputElements.forEach(c => {
      const props = c.props as { type?: string; fieldName: string };

      if (
        props.type === 'date-range' &&
        formState.data[props.fieldName][0] > formState.data[props.fieldName][1]
      ) {
        errors = {
          ...errors,
          [props.fieldName]: "'From Date' must be before 'To Date'",
        };
      }
    });

    return errors;
  }

  return {
    formInputElements,
    reactElementClones,
    initialData,
    validators,
    conditionsToShow,
    formState,
    formDispatch,
    formContext,
    validateForm,
  };
}

const FormPanel: FC<
  FormPanelBaseProps & {
    onCancel?: () => void;
    onReset?: () => void;
  }
> = ({ className, ...props }) => {
  const { reactElementClones, initialData, formState, formDispatch, formContext, validateForm } =
    useFormPanelLogic(props.children);

  const updateErrorsDispatch: Dispatch<ActionType & UpdateErrorsActionType> = formDispatch;
  const resetFormDispatch: Dispatch<ActionType & ResetFormActionType> = formDispatch;

  function handleSubmit() {
    const errors = validateForm();

    updateErrorsDispatch({
      type: 'UPDATE_ERRORS',
      payload: { errors },
    });

    if (Object.keys(errors).length < 1) {
      props.onSubmit(formState.data);
    }
  }

  function handleCancel() {
    if (props.onCancel) props.onCancel();
  }

  function handleReset() {
    resetFormDispatch({
      type: 'RESET_FORM',
      payload: { initialData },
    });
    if (props.onReset) props.onReset();
  }

  if (props.buttonRef) {
    props.buttonRef.current = {
      submit: handleSubmit,
      cancel: handleCancel,
      reset: handleReset,
    };
  }

  function formActions() {
    if (props.buttonRef) return null;

    return (
      <div className="col-span-full flex gap-2">
        <Button loading={props.loading} onClick={handleSubmit}>
          {props.submitButtonLabel ? props.submitButtonLabel : 'Submit'}
        </Button>
        {props.onCancel ? (
          <Button onClick={handleCancel} variant="secondary">
            {props.cancelButtonLabel ? props.cancelButtonLabel : 'Cancel'}
          </Button>
        ) : null}
        {props.onReset ? <Button onClick={handleReset}>Reset</Button> : null}
      </div>
    );
  }

  return (
    <FormPanelContext.Provider value={formContext}>
      <div className={cn('min-w-96 grid grid-cols-1 gap-3 sm:grid-cols-6', className)}>
        {reactElementClones}
      </div>
      <div className="mb-4">{props.error ? <ErrorAlert error={props.error} /> : null}</div>
      {formActions()}
    </FormPanelContext.Provider>
  );
};

const FormPanelWithReadMode: FC<
  FormPanelBaseProps & {
    isInReadOnlyMode?: (arg0: boolean) => void;
    disableEdit?: boolean;
    title?: string;
    subTitle?: string;
  }
> = ({ className, ...props }) => {
  const [readOnlyMode, toggleReadOnlyMode] = useState(true);

  const { initialData, formState, formDispatch, formContext, reactElementClones, validateForm } =
    useFormPanelLogic(props.children, readOnlyMode);

  const updateErrorsDispatch: Dispatch<ActionType & UpdateErrorsActionType> = formDispatch;
  const resetFormDispatch: Dispatch<ActionType & ResetFormActionType> = formDispatch;

  function handleSubmit() {
    const errors = validateForm();

    updateErrorsDispatch({
      type: 'UPDATE_ERRORS',
      payload: { errors },
    });

    if (Object.keys(errors).length < 1) {
      props.onSubmit(formState.data);
      toggleReadOnlyMode(true);
    }
  }

  function handleCancel() {
    resetFormDispatch({
      type: 'RESET_FORM',
      payload: { initialData },
    });
    toggleReadOnlyMode(true);
    if (props.isInReadOnlyMode) props.isInReadOnlyMode(false);
  }

  if (props.buttonRef) {
    props.buttonRef.current = {
      submit: handleSubmit,
      cancel: handleCancel,
    };
  }

  function formActions() {
    if (props.disableEdit) {
      return null;
    }

    return (
      <div
        className={cn(
          'flex items-center gap-x-3 border-t border-border p-4',
          readOnlyMode ? 'justify-start' : 'justify-end'
        )}
      >
        {readOnlyMode ? (
          <Button
            variant="outline"
            onClick={() => {
              toggleReadOnlyMode(false);
              if (props.isInReadOnlyMode) props.isInReadOnlyMode(true);
            }}
          >
            Make Changes
          </Button>
        ) : (
          <>
            <Button loading={props.loading} onClick={handleSubmit}>
              {props.submitButtonLabel ? props.submitButtonLabel : 'Submit'}
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              {props.cancelButtonLabel ? props.cancelButtonLabel : 'Cancel'}
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <FormPanelContext.Provider value={formContext}>
      <div
        className={cn(
          'min-w-96 shadow-sm ring-1 ring-border rounded-md sm:rounded-lg md:col-span-2',
          {
            'ring-2 ring-ring': !readOnlyMode,
          },
          className
        )}
      >
        {(props.title || props.subTitle) && (
          <div className="border-b border-border px-4 py-2">
            {props.title && (
              <h2 className="text-lg font-semibold leading-7 text-foreground sm:truncate sm:text-lg sm:tracking-tight">
                {props.title}
              </h2>
            )}
            {props.subTitle && (
              <div className="flex items-center text-sm text-muted-foreground">
                {props.subTitle}
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 px-4 py-3">{reactElementClones}</div>
        <div>{props.error ? <ErrorAlert error={props.error} /> : null}</div>
        {formActions()}
      </div>
    </FormPanelContext.Provider>
  );
};

export { FormPanel, FormPanelWithReadMode, FormInput };
