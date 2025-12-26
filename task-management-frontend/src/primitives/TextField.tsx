import React, { ElementType, forwardRef } from 'react';

import { Input, Textarea } from '@/components';

import { cn } from '@/utils/classnames';

interface TextFieldProps {
  id?: string;
  label?: string;
  Icon?: ElementType;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: string;
  helperText?: string;
  readOnly?: boolean;
  className?: string;
  type?: 'text' | 'number' | 'password' | 'currency' | 'textarea' | 'email';
  rows?: number;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      id,
      label,
      Icon,
      placeholder,
      value,
      onChange,
      error,
      helperText,
      readOnly = false,
      className,
      type = 'text',
      rows = 3,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      const inputValue = e.target.value;

      switch (type) {
        case 'number':
          onChange(inputValue ? parseFloat(inputValue) : '');
          break;
        case 'currency':
          onChange(!isNaN(Number(inputValue)) ? Number(inputValue) : '');
          break;
        default:
          onChange(inputValue);
          break;
      }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!onChange) return;
      onChange(e.target.value);
    };

    const getCurrencyIcon = () => {
      return <span className="text-sm">$</span>;
    };

    return (
      <>
        <div className="flex flex-col gap-y-2">
          {label && (
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
              <label htmlFor={id} className="text-sm font-medium text-primary">
                {label}
              </label>
            </div>
          )}
          {type === 'textarea' ? (
            <Textarea
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={handleTextareaChange}
              readOnly={readOnly}
              aria-invalid={!!error}
              rows={rows}
              className={cn(error && 'border-red-500 dark:border-red-900', className)}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              ref={ref as any}
            />
          ) : (
            <Input
              id={id}
              type={type === 'currency' ? 'text' : type}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              readOnly={readOnly}
              aria-invalid={!!error}
              leadingIcon={type === 'currency' ? getCurrencyIcon() : undefined}
              className={cn(error && 'border-red-500 dark:border-red-900', className)}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              ref={ref as any}
              {...props}
            />
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
      </>
    );
  }
);
TextField.displayName = 'TextField';
export default TextField;
