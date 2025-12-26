import { format } from 'date-fns';
import { ElementType, FC } from 'react';

import { Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components';

import { cn } from '@/utils/classnames';

interface DatePickerProps {
  id?: string;
  label?: string;
  Icon?: ElementType;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  error?: string;
  helperText?: string;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: FC<DatePickerProps> = ({
  id,
  label,
  Icon,
  value,
  onChange,
  error,
  helperText,
  readOnly = false,
  className,
  placeholder = 'Pick a date',
  minDate,
  maxDate,
}) => {
  return (
    <>
      <div className="grid grid-cols-2">
        {label && (
          <div className="flex items-center gap-2 w-fit">
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <label htmlFor={id} className="text-sm font-medium text-primary">
              {label}
            </label>
          </div>
        )}
        <Popover modal={true}>
          <PopoverTrigger
            id={id}
            disabled={readOnly}
            className={cn(
              'flex h-10 w-full items-center justify-between cursor-pointer rounded-md bg-background px-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 dark:border-red-900',
              className
            )}
          >
            <span className={!value ? 'text-muted-foreground text-base -ml-1' : ''}>
              {value ? format(value, 'PPP') : placeholder}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 -ml-10" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              disabled={date =>
                (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
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

export default DatePicker;
