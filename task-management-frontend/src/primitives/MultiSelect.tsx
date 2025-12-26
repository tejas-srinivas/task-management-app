import { ElementType, useMemo, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { cn } from '@/utils/classnames';
import { formatTag } from '@/utils/format-helpers';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  id?: string;
  label?: string;
  Icon?: ElementType;
  value: Option[];
  onChange: (val: Option[]) => void;
  onOpen?: (open: boolean) => void;
  options?: Option[];
  className?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
}

export const MultiSelectTrigger: React.FC<MultiSelectProps> = ({
  id,
  label,
  Icon,
  value = [],
  options = [],
  className,
  placeholder,
  error,
  helperText,
  onChange,
  onOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedIds = value.map(item => item.value);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    return options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [options, searchQuery]);

  const toggleOption = (option: Option, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter(v => v.value !== option.value));
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchQuery('');
    }
    onOpen?.(open);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        {label && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <label htmlFor={id} className="text-sm font-medium text-primary">
              {label}
            </label>
          </div>
        )}
        <DropdownMenu onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                'w-full min-h-9 rounded-md py-1 flex items-center flex-wrap gap-1 cursor-pointer text-left',
                className
              )}
            >
              {value.length > 0 ? (
                value.map(item => (
                  <span key={item.value} className="mr-1 mb-1">
                    {formatTag(item.label)}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder || 'Empty'}</span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-border">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-8 text-sm"
                autoFocus
              />
            </div>

            {/* Options List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-muted-foreground text-sm">
                  {searchQuery ? 'No tags found' : 'No options found'}
                </div>
              ) : (
                filteredOptions.map(option => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={selectedIds.includes(option.value)}
                    onCheckedChange={checked => toggleOption(option, checked)}
                    className="px-3 py-2"
                  >
                    <span className="ml-6">{option.label}</span>
                  </DropdownMenuCheckboxItem>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
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
