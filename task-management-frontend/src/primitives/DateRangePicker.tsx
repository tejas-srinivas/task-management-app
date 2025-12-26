import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC } from 'react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/utils/classnames';

interface DateRangePickerProps {
  id?: string;
  label?: string;
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
  error?: string;
  helperText?: string;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  helperText,
  readOnly = false,
  className,
  placeholder = 'Select date range',
  minDate,
  maxDate,
}) => {
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return placeholder;
    if (!range.to) return format(range.from, 'PPP');
    return `${format(range.from, 'PPP')} - ${format(range.to, 'PPP')}`;
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <Popover modal={true}>
        <PopoverTrigger
          id={id}
          disabled={readOnly}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-default disabled:opacity-50',
            error && 'border-red-500 dark:border-red-900',
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span className={!value?.from ? 'text-muted-foreground' : ''}>
              {formatDateRange(value)}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            defaultMonth={value?.from}
            numberOfMonths={2}
            disabled={date =>
              (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
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
    </div>
  );
};

export default DateRangePicker;
