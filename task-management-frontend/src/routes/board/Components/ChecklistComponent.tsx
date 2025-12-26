import { CheckSquare, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import { cn } from '@/utils/classnames';

interface ChecklistComponentProps {
  checklist: { id: string; label: string; isCompleted: boolean }[];
  onChecklistChange: (id: string, checked: boolean) => void;
  onCreateChecklistItem: (label: string) => void;
  progress: number;
}

export function ChecklistComponent({
  checklist,
  onChecklistChange,
  onCreateChecklistItem,
  progress,
}: ChecklistComponentProps) {
  const [showChecklistInput, setShowChecklistInput] = useState(false);
  const [newChecklistLabel, setNewChecklistLabel] = useState('');

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4" />
          <span className="font-semibold">Checklist</span>
        </div>
        <Button variant="ghost" onClick={() => setShowChecklistInput(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Checklist
        </Button>
      </div>
      <div className="flex justify-end">
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded mb-2">
        <div className="h-2 bg-primary rounded" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex flex-col gap-2">
        {checklist.map(item => (
          <label key={item.id} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={item.isCompleted}
              onCheckedChange={checked => onChecklistChange(item.id, !!checked)}
            />
            <span
              className={cn('text-base', {
                'line-through text-muted-foreground': item.isCompleted,
              })}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
      {showChecklistInput && (
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newChecklistLabel.trim()) {
              onCreateChecklistItem(newChecklistLabel.trim());
              setNewChecklistLabel('');
              setShowChecklistInput(false);
            }
          }}
          className="flex items-center gap-2 mt-2"
        >
          <Input
            value={newChecklistLabel}
            onChange={e => setNewChecklistLabel(e.target.value)}
            autoFocus
            placeholder="Checklist item"
            className="h-8 text-sm"
          />
          <Button size="icon" type="submit" variant="ghost">
            <Plus className="w-4 h-4" />
          </Button>
        </form>
      )}
    </div>
  );
}
