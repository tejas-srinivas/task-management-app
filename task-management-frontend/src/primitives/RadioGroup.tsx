import { RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroup as RadioGroupUI } from '@/components/ui/radio-group';

import { cn } from '@/utils/classnames';

interface RadioGroupProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const RadioGroup = ({
  label,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  className,
  id,
  options,
}: RadioGroupProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      {label && <div className="text-sm font-medium text-primary">{label}</div>}
      <RadioGroupUI
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className={cn('flex flex-col gap-2', className)}
        id={id}
      >
        {options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${id}-${option.value}`} />
            <label htmlFor={`${id}-${option.value}`} className="text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroupUI>
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

export default RadioGroup;
