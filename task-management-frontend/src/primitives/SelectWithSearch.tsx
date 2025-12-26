import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { type FC, useState } from 'react';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components';

import { cn } from '@/utils/classnames';

interface SelectWithSearchProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  readOnly?: boolean;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const SelectWithSearch: FC<SelectWithSearchProps> = ({
  id,
  label,
  placeholder = 'Search...',
  value,
  onChange,
  error,
  helperText,
  readOnly = false,
  className,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-primary">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={readOnly}
            className={cn(
              'w-full justify-between',
              error && 'border-red-500 dark:border-red-900',
              className
            )}
          >
            <span className={cn(!selectedOption && 'text-muted-foreground')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-fit p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label]}
                    onSelect={() => {
                      if (!readOnly) {
                        onChange?.(option.value);
                        setOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full px-1">
                      {option.label}
                      <CheckIcon
                        className={cn(
                          'h-4 w-4',
                          value === option.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
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
