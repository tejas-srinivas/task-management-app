import { format, isToday, isTomorrow } from 'date-fns';
import { CircleCheckBig, Clock, ListChecks, MessageSquareMore, Paperclip } from 'lucide-react';

import { TaskType } from '@/__generated__/graphql';
import {
  Avatar,
  AvatarFallback,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';

import { cn } from '@/utils/classnames';
import { formatStatus, formatTag } from '@/utils/format-helpers';

interface TaskComponentProps {
  task: TaskType;
  onTaskEdit: (task: TaskType) => void;
  isRefetching?: boolean;
  draggableProps?: any;
  dragHandleProps?: any;
  innerRef?: (element?: HTMLElement | null) => void;
}

export default function TaskComponent({
  task,
  onTaskEdit,
  isRefetching = false,
  draggableProps,
  dragHandleProps,
  innerRef,
}: TaskComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'bg-todo-list-card-foreground rounded-[0.525rem] px-3 py-3 text-sm border border-border cursor-pointer',
              isRefetching && 'opacity-60'
            )}
            onClick={() => onTaskEdit(task)}
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
          >
            <div className="flex items-start justify-between">
              {task.title ? (
                <span
                  className="w-[16rem] whitespace-pre-line mr-1 mb-1"
                  aria-placeholder="Enter Card Title"
                >
                  {task.title}
                </span>
              ) : (
                <span
                  className="w-[16rem] whitespace-pre-line mr-1 text-muted-foreground"
                  aria-placeholder="Enter Card Title"
                >
                  No Task Title
                </span>
              )}
              {task.isCompleted && <CircleCheckBig className="w-4 h-4 text-chart-2 mt-1" />}
            </div>
            {task.assignees && (
              <div
                className={cn('flex flex-wrap gap-4 gap-y-1', {
                  'mt-2 mb-2': task.assignees.length > 0,
                })}
              >
                {task.assignees.map(a => (
                  <span
                    key={a?.assignedTo.fullName}
                    className="flex items-center gap-1 mb-1 text-muted-foreground"
                  >
                    <Avatar className="w-4 h-4 bg-foreground/50">
                      <AvatarFallback className="text-[0.55rem] text-foreground bg-background/70">
                        {a?.assignedTo.fullName?.charAt(0) ?? '?'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[0.65rem]">{a?.assignedTo.fullName}</span>
                  </span>
                ))}
              </div>
            )}
            {task.tags && (
              <div className={cn('flex flex-wrap gap-1', { 'my-1': task.tags.length > 0 })}>
                {task.tags.map(tag => (
                  <span key={tag} className="mb-2">
                    {formatTag(tag as string)}
                  </span>
                ))}
              </div>
            )}
            {(task.dueDate || task.attachments || task.comments || task.priority) && (
              <div className="flex items-end justify-between text-muted-foreground empty:hidden">
                {(task.dueDate || task.attachments || task.comments) && (
                  <div className="flex items-center gap-2">
                    {task.dueDate && !task.isCompleted && (
                      <span
                        className={cn('flex items-center gap-1 text-[0.65rem]', {
                          'bg-red-400 text-white px-2 py-1 rounded-sm': isToday(
                            new Date(task.dueDate)
                          ),
                          'bg-amber-400 text-white px-2 py-1 rounded-sm': isTomorrow(
                            new Date(task.dueDate)
                          ),
                        })}
                      >
                        <Clock className="w-3 h-3" />
                        {format(new Date(task.dueDate), 'MMM d y')}
                      </span>
                    )}
                    {task.attachments && task.attachments.length > 0 && (
                      <span className="flex items-center gap-1 text-xs">
                        <Paperclip className="w-3 h-3" />
                        {task.attachments.length}
                      </span>
                    )}
                    {task.comments && task.comments.length > 0 && (
                      <span className="flex items-center gap-1 text-xs">
                        <MessageSquareMore className="w-3 h-3" />
                        {task.comments.length}
                      </span>
                    )}
                    {task.checklists && task.checklists.length > 0 && (
                      <span className="flex items-center gap-1 text-xs">
                        <ListChecks className="w-3 h-3" />
                        {task.checklists.length}
                      </span>
                    )}
                  </div>
                )}
                {task.priority && (
                  <span className="text-[0.65rem] ml-auto">
                    {formatStatus(task.priority.toUpperCase())}
                  </span>
                )}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to edit or drag to move</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
