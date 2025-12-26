import { Dayjs } from "dayjs";
import React, { useContext } from "react";
import type { Dispatch, FC } from "react";

import CheckboxGroup from "@/primitives/CheckboxGroup";
import DatePicker from "@/primitives/DatePicker";
import DateRangePicker from "@/primitives/DateRangePicker";
import RadioGroup from "@/primitives/RadioGroup";
import Select from "@/primitives/Select";
import Switch from "@/primitives/Switch";
import TextField from "@/primitives/TextField";
import UploadInput from "@/primitives/UploadInput";

import { cn } from "@/utils/classnames";
import { compareValues } from "@/utils/compare-values";

import FormPanelContext from "./form-panel-context";
import type { ActionType, UpdateStateActionType } from "./form-panel-reducer";
import type { Validators } from "./validators";
import { SelectWithSearch } from "@/primitives/SelectWithSearch";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | "full";

type FormInputProps = {
  fieldName: string;
  defaultValue: any;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "currency"
    | "textarea"
    | "select"
    | "select-with-search"
    | "date"
    | "switch"
    | "date-range"
    | "radio-group"
    | "checkbox-group"
    | "upload"
    | "avatar"
    | "custom";
  helperText?: string;
  editable?: boolean;
  readOnlyMode?: boolean;
  options?: {
    label: string;
    value: string;
    color?: string;
  }[];
  validators?: Validators;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  maxFileSize?: number;
  placeholder?: string;
  onlyAcceptsPDF?: boolean;
  conditionsToShow?: {
    matches: {
      field: string;
      condition: "===" | "!==" | ">" | "<" | ">=" | "<=";
      value: string;
    }[];
    type?: "every" | "some";
  };
  customInput?: React.ElementType;
  onChange?: (value: any) => void;
  className?: string;
  colSpan?:
    | ColSpan
    | {
        default?: ColSpan;
        sm?: ColSpan;
        md?: ColSpan;
      };
  compact?: boolean;
};

const FormInput: FC<FormInputProps> = ({
  fieldName,
  type,
  label,
  placeholder,
  validators,
  options,
  onChange,
  editable = true,
  readOnlyMode = false,
  helperText,
  className,
  colSpan = "full",
  conditionsToShow,
  minDate,
  maxDate,
  maxFileSize,
  customInput,
  onlyAcceptsPDF,
  compact = false,
}) => {
  const { formState, formDispatch } = useContext(FormPanelContext);
  const updateStateDispatch: Dispatch<ActionType & UpdateStateActionType> =
    formDispatch;

  function hideFormInput() {
    if (!conditionsToShow) return false;
    if (!conditionsToShow.matches.length) return false;

    if (conditionsToShow.type === "some")
      return !conditionsToShow.matches.some((c) => {
        return compareValues(formState.data[c.field], c.condition, c.value);
      });
    else
      return !conditionsToShow.matches.every((c) => {
        return compareValues(formState.data[c.field], c.condition, c.value);
      });
  }

  if (validators) {
    if (validators.required !== undefined) {
      validators.required = !hideFormInput();
    }
    if (validators.isPhoneNumber) {
      validators.isPhoneNumber = !hideFormInput();
    }
  }

  const handleChange = (value: any) => {
    updateStateDispatch({
      type: "UPDATE_STATE",
      payload: {
        fieldName,
        value,
      },
    });
    if (onChange) {
      onChange({ ...formState.data, [fieldName]: value });
    }
  };

  if (hideFormInput()) {
    return null;
  }

  if (validators?.dependsOn && !formState.data[validators.dependsOn]) {
    return null;
  }

  const inputField = () => {
    switch (type) {
      case "text":
      case "number":
      case "currency":
      case "password":
      case "email":
        return (
          <TextField
            id={fieldName}
            type={type}
            label={label}
            placeholder={placeholder}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            readOnly={readOnlyMode || !editable}
          />
        );
      case "textarea":
        return (
          <TextField
            id={fieldName}
            type="textarea"
            label={label}
            placeholder={placeholder}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            readOnly={readOnlyMode || !editable}
            rows={3}
          />
        );
      case "select":
        return (
          <Select
            id={fieldName}
            label={label}
            placeholder={placeholder}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            options={options || []}
            readOnly={readOnlyMode || !editable}
          />
        );
      case "select-with-search":
        return (
          <SelectWithSearch
            id={fieldName}
            label={label}
            placeholder={placeholder}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            options={options || []}
            readOnly={readOnlyMode || !editable}
          />
        );
      case "radio-group":
        return (
          <RadioGroup
            id={fieldName}
            label={label}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            options={options || []}
            disabled={readOnlyMode || !editable}
          />
        );
      case "checkbox-group":
        return (
          <CheckboxGroup
            id={fieldName}
            label={label}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            options={options || []}
            disabled={readOnlyMode || !editable}
            displayCompact={compact}
          />
        );
      case "switch":
        return (
          <Switch
            id={fieldName}
            label={label}
            checked={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            disabled={readOnlyMode || !editable}
          />
        );
      case "date":
        return (
          <DatePicker
            id={fieldName}
            label={label}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            readOnly={readOnlyMode || !editable}
            minDate={minDate?.toDate()}
            maxDate={maxDate?.toDate()}
          />
        );
      case "date-range":
        return (
          <DateRangePicker
            id={fieldName}
            label={label}
            value={formState.data[fieldName]}
            onChange={handleChange}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            readOnly={readOnlyMode || !editable}
            minDate={minDate?.toDate()}
            maxDate={maxDate?.toDate()}
          />
        );
      case "upload":
      case "avatar":
        return (
          <UploadInput
            id={fieldName}
            label={label}
            value={formState.data[fieldName]}
            onChange={(files) => handleChange(files[0])}
            error={formState.errors ? formState.errors[fieldName] : ""}
            helperText={helperText}
            readOnly={readOnlyMode || !editable}
            maxFileSize={maxFileSize}
            isPdf={type === "upload" && onlyAcceptsPDF}
            isAvatar={type === "avatar"}
          />
        );
      case "custom": {
        const CustomInput = customInput ? customInput : () => <></>;

        return (
          <>
            <CustomInput
              id={fieldName}
              value={formState.data[fieldName]}
              onChange={(newValue: any) => handleChange(newValue)}
              readOnly={readOnlyMode}
              label={label}
              helperText={helperText}
              options={options}
              editable={editable}
            />
            <p>{formState.errors && formState.errors[fieldName]}</p>
          </>
        );
      }
    }
  };

  const getColSpanClass = (span: ColSpan) => {
    switch (span) {
      case 1:
        return "col-span-1";
      case 2:
        return "col-span-2";
      case 3:
        return "col-span-3";
      case 4:
        return "col-span-4";
      case 5:
        return "col-span-5";
      case 6:
        return "col-span-6";
      case "full":
        return "col-span-full";
      default:
        return "col-span-full";
    }
  };

  const colSpanClasses =
    typeof colSpan === "object"
      ? cn(
          colSpan.default && getColSpanClass(colSpan.default),
          colSpan.sm && `sm:${getColSpanClass(colSpan.sm)}`,
          colSpan.md && `md:${getColSpanClass(colSpan.md)}`
        )
      : getColSpanClass(colSpan);

  return <div className={cn(colSpanClasses, className)}>{inputField()}</div>;
};

export default FormInput;
