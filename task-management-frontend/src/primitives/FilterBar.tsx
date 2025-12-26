import { Search } from 'lucide-react';

import Select from './Select';
import TextField from './TextField';

export interface SelectConfig {
  value: any;
  onChange: (val: any) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  isMulti?: boolean;
}

export interface FilterBarProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  searchPlaceholder: string;
  selects?: SelectConfig[];
  className?: string;
}

export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  selects,
  className = '',
}: FilterBarProps) {
  return (
    <div
      className={`flex justify-between items-center py-2 bg-background ${className}`}
    >
      <div className="flex gap-2 items-center flex-wrap">
        <div className="relative">
          <TextField
            value={searchValue}
            onChange={val => onSearchChange(String(val))}
            placeholder={searchPlaceholder}
            className="w-48 pl-8"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        {selects?.map((select, idx) => (
          <Select key={idx} {...select} isTrigger={true} />
        ))}
      </div>
    </div>
  );
}
