import { useRef, useState } from 'react';
import React from 'react';

import { AttachmentType } from '@/__generated__/graphql';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components';

import DatePicker from './DatePicker';
import { MultiSelectTrigger } from './MultiSelect';
import Select from './Select';
import TextField from './TextField';
import UploadInput from './UploadInput';

// Helper to normalize options for the Select component
const normalizeSelectOptions = (options: (string | { label: string; value: string })[]) => {
  if (!options) return [];
  return options.map(opt => (typeof opt === 'string' ? { label: opt, value: opt } : opt));
};

interface EditableTextTriggerProps {
  value?: any;
  attachments?: AttachmentType[];
  onChange: (val: any) => void;
  onOpen?: (open: boolean) => void;
  type?: 'SELECT' | 'MULTI_SELECT' | 'CALENDAR' | 'INPUT' | 'TEXTAREA' | 'ATTACHMENT';
  placeholder?: string;
  className?: string;
  textClassName?: string;
  options?: (string | { label: string; value: string })[];
  isFormat?: boolean;
  autoFocus?: boolean;
  Icon?: React.ElementType;
  label?: string;
  error?: string;
  helperText?: string;
}

export const EditableTextTrigger: React.FC<EditableTextTriggerProps> = ({
  value,
  attachments,
  onChange,
  onOpen,
  type = 'INPUT',
  placeholder = 'Empty',
  className = '',
  textClassName = '',
  autoFocus = false,
  Icon,
  label,
  error,
  helperText,
  isFormat,
  ...rest
}) => {
  const [editing, setEditing] = useState(autoFocus);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      if (inputRef.current) {
        inputRef.current.focus();
        const val = value || '';
        (inputRef.current as HTMLTextAreaElement).setSelectionRange(val.length, val.length);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, type]);

  const handleBlur = () => {
    if (autoFocus) return;
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (type === 'INPUT' || e.key === 'Escape') {
        if (autoFocus) return;
        setEditing(false);
      }
    }
  };

  let triggerContent;

  switch (type) {
    case 'ATTACHMENT':
      triggerContent = (
        <UploadInput
          value={attachments?.[0] as File | undefined}
          onChange={files => onChange(files)}
          error={error}
          helperText={helperText}
          className={className}
          label={label}
          Icon={Icon}
        />
      );
      break;
    case 'CALENDAR':
      triggerContent = (
        <DatePicker
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          className={className}
          placeholder={placeholder}
          label={label}
          Icon={Icon}
        />
      );
      break;
    case 'MULTI_SELECT':
      triggerContent = (
        <MultiSelectTrigger
          value={value}
          onChange={onChange}
          onOpen={onOpen}
          options={normalizeSelectOptions(rest.options || [])}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          className={className}
          label={label}
          Icon={Icon}
        />
      );
      break;
    case 'SELECT':
      triggerContent = (
        <Select
          value={value}
          onChange={onChange}
          onOpen={onOpen}
          options={normalizeSelectOptions(rest.options || [])}
          error={error}
          helperText={helperText}
          className={className}
          placeholder={placeholder}
          label={label}
          Icon={Icon}
          isFormat={isFormat}
        />
      );
      break;
    case 'INPUT':
    case 'TEXTAREA':
    default:
      if (editing) {
        triggerContent = (
          <TextField
            type={type === 'TEXTAREA' ? 'textarea' : 'text'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            error={error}
            helperText={helperText}
            ref={inputRef}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            label={label}
            Icon={Icon}
          />
        );
        return triggerContent;
      } else {
        triggerContent = (
          <span
            className={`cursor-pointer whitespace-pre-line ${textClassName}`}
            onClick={() => setEditing(true)}
          >
            {value && typeof value === 'string' && value.trim() ? (
              value
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
        );
      }
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{triggerContent}</TooltipTrigger>
      <TooltipContent>Click to edit</TooltipContent>
    </Tooltip>
  );
};
