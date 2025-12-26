import { format } from 'date-fns';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { CommentType } from '@/__generated__/graphql';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { EditableTextTrigger } from '@/primitives/EditableTextTrigger';

import useDebouncedCallback from '@/utils/debounce';

interface CommentComponentProps {
  comment: CommentType;
  boardId: string;
  onDelete: (boardId: string, commentId: string) => void;
  onUpdate: (text: string) => void;
}

export default function CommentComponent({
  comment,
  boardId,
  onDelete,
  onUpdate,
}: CommentComponentProps) {
  const handleEditingText = useDebouncedCallback((text: string) => {
    onUpdate(text);
  }, 1000);

  const [editingText, setEditingText] = useState(comment.text);

  return (
    <li className="flex flex-col mb-4 bg-accent p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-1 -mt-2">
        <span className="text-xs text-ring">@{comment.author?.fullName ?? 'Unknown'}</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {comment.createdAt !== comment.updatedAt ? '(Edited)   ' : ''}
          {comment.createdAt ? format(new Date(comment.createdAt), 'MMMM do, yyyy') : ''}
        </span>
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger asChild>
            <Button className="ml-1 p-0!" variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(boardId, comment.id)}>
              <Trash2 className="w-4 h-4" /> Delete Comment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EditableTextTrigger
        key={comment.id}
        value={editingText}
        type="TEXTAREA"
        onChange={val => {
          setEditingText(val);
          handleEditingText(val);
        }}
        className="text-sm! mb-2 p-0 resize-none min-h-[25px] w-full border-none bg-transparent! outline-none rounded-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0"
        textClassName="text-sm! mb-2 min-h-[25px] block"
      />
    </li>
  );
}
