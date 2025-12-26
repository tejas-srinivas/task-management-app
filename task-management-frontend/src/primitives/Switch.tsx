import { Switch as SwitchUI } from '@/components';

import { cn } from '@/utils/classnames';

interface SwitchProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

const Switch = ({
  id,
  label,
  checked = false,
  onChange,
  error,
  helperText,
  disabled = false,
  className,
}: SwitchProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full my-2">
      <div className="flex items-center gap-2">
        <SwitchUI
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          className={className}
        />
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-primary">
            {label}
          </label>
        )}
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

export default Switch;
