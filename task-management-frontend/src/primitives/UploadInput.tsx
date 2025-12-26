import { UploadIcon } from 'lucide-react';
import { ChangeEvent, ElementType, useRef } from 'react';

import { Input } from '@/components/ui/input';

import { cn } from '@/utils/classnames';

interface UploadInputProps {
  id?: string;
  label?: string;
  Icon?: ElementType;
  value?: File | null;
  onChange?: (files: File[]) => void;
  error?: string;
  helperText?: string;
  readOnly?: boolean;
  className?: string;
  maxFileSize?: number; // in MB
  isAvatar?: boolean;
  isPdf?: boolean;
}

const UploadInput = ({
  id,
  label,
  Icon,
  value,
  onChange,
  error,
  helperText,
  readOnly = false,
  className,
  maxFileSize = 5, // Default 5MB
  isAvatar = false,
  isPdf = false,
}: UploadInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!readOnly && inputRef.current) {
      inputRef.current.click();
    }
  };

  const validateFile = (file: File): string | null => {
    if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }

    if (isAvatar && !file.type.startsWith('image/')) {
      return 'File must be an image';
    }

    if (isPdf && file.type !== 'application/pdf') {
      return 'File must be a PDF';
    }

    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !onChange) return;

    const validationError = validateFile(files[0]);
    if (validationError) {
      // Clear the input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      // You might want to handle this error differently
      alert(validationError);
      return;
    }

    onChange(files);
  };

  const acceptTypes = isPdf ? '.pdf' : isAvatar ? 'image/*' : undefined;

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
        <div className="relative">
          <input
            ref={inputRef}
            type="file"
            accept={acceptTypes}
            onChange={handleChange}
            disabled={readOnly}
            className="hidden"
            id={id}
          />
          <Input
            id={id}
            readOnly={readOnly}
            placeholder={isAvatar ? 'Upload avatar' : isPdf ? 'Upload PDF' : 'Upload file'}
            value={value?.name || ''}
            onChange={handleChange}
            onClick={handleClick}
            className={cn(
              'cursor-pointer',
              error && 'border-red-500 dark:border-red-900',
              className
            )}
            leadingIcon={<UploadIcon className="h-4 w-4" />}
          />
        </div>
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

export default UploadInput;
