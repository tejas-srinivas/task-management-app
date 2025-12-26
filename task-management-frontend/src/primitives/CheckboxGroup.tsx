import { Checkbox } from '@/components/ui/checkbox';

import { cn } from '@/utils/classnames';

interface CheckboxGroupProps {
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  displayCompact?: boolean;
  id?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const CheckboxGroup = ({
  label,
  value = [],
  onChange,
  error,
  helperText,
  disabled = false,
  className,
  displayCompact = false,
  id,
  options,
}: CheckboxGroupProps) => {
  const handleCheckboxChange = (checked: boolean, optionValue: string) => {
    if (!onChange) return;

    if (checked) {
      onChange([...(value || []), optionValue]);
    } else {
      onChange((value || []).filter(v => v !== optionValue));
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {label && <div className="text-sm font-medium text-primary">{label}</div>}
      <div
        className={cn('flex gap-2', displayCompact ? 'flex-row flex-wrap' : 'flex-col', className)}
      >
        {options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${id ? `${id}-` : ''}${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={checked => handleCheckboxChange(checked as boolean, option.value)}
              disabled={disabled}
            />
            <label htmlFor={`${id ? `${id}-` : ''}${option.value}`} className="text-sm">
              {option.label}
            </label>
          </div>
        ))}
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
    </div>
  );
};

export default CheckboxGroup;
