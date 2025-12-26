import { ElementType, FC, useState } from 'react';

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  Select as SelectUI,
  SelectValue,
} from '@/components';

import { cn } from '@/utils/classnames';
import { formatStatus } from '@/utils/format-helpers';

interface SelectProps {
  id?: string;
  label?: string;
  Icon?: ElementType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onOpen?: (open: boolean) => void;
  error?: string;
  helperText?: string;
  readOnly?: boolean;
  className?: string;
  isFormat?: boolean;
  isTrigger?: boolean;
  options: {
    label: string;
    value: string;
  }[];
}

const getLabel = (opt: string | { value: string; label: string }) =>
  typeof opt === 'string' ? opt : opt.label;
const getValue = (opt: string | { value: string; label: string }) =>
  typeof opt === 'string' ? opt : opt.value;

const Select: FC<SelectProps> = ({
  id,
  label,
  Icon,
  placeholder,
  value,
  onChange,
  onOpen,
  error,
  helperText,
  className,
  isFormat = false,
  readOnly = false,
  isTrigger = false,
  options,
}) => {
  const [open, setOpen] = useState(isTrigger);
  if (!open) {
    return (
      <div className="grid grid-cols-2 h-9">
        {label && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <label htmlFor={id} className="text-sm font-medium text-primary">
              {label}
            </label>
          </div>
        )}
        <span
          className={`pt-1 cursor-pointer text-muted-foreground ${className || ''}`}
          onClick={() => setOpen(true)}
        >
          {typeof value === 'string' && value
            ? isFormat
              ? formatStatus(value.toUpperCase())
              : getLabel(options.find(opt => getValue(opt) === value) || value)
            : 'Empty'}
        </span>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center gap-2">
        {label && (
          <div className="flex items-center gap-2 w-full">
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <label htmlFor={id} className="text-sm font-medium text-primary">
              {label}
            </label>
          </div>
        )}
        <SelectUI value={value} onValueChange={onChange} disabled={readOnly} onOpenChange={onOpen}>
          <SelectTrigger
            id={id}
            className={cn(error && 'border-red-500 dark:border-red-900', className)}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {isFormat ? formatStatus(getLabel(option).toUpperCase()) : getLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectUI>
      </div>
      {(error || helperText) && (
        <p
          className={cn(
            'text-sm mt-0.5',
            error ? 'text-red-500 dark:text-red-400' : 'text-neutral-500 dark:text-neutral-400'
          )}
        >
          {error || helperText}
        </p>
      )}
    </>
  );
};

export default Select;
