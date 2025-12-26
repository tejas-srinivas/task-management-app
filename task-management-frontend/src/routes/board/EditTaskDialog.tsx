import {
  AlertTriangle,
  ArrowUp,
  BookmarkCheck,
  Clock,
  Contact,
  Hash,
  List as ListIcon,
  Move,
  Tag,
} from 'lucide-react';
import { FC, useEffect, useMemo, useState } from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { TaskPriorityEnumType, TaskType } from '@/__generated__/graphql';
import { EditableTextTrigger } from '@/primitives/EditableTextTrigger';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

import { getUser } from '@/utils/auth';
import { TAG_OPTIONS } from '@/utils/constants';
import useDebouncedCallback from '@/utils/debounce';

import { GET_TASK_QUERY } from './BoardContext/mutations';
import { useBoard } from './BoardContext/useBoard';
import { ChecklistComponent } from './Components/ChecklistComponent';
import CommentComponent from './Components/CommentComponent';

const GET_BOARD_MEMBERS = gql(`
  query BoardMembers($boardId: ID!) {
    board(id: $boardId) {
      boardMembers {
        user {
          id
          fullName
        }
      }
    }
  }
`);

const PRIORITY_OPTIONS = [
  TaskPriorityEnumType.Immediate,
  TaskPriorityEnumType.High,
  TaskPriorityEnumType.Medium,
  TaskPriorityEnumType.Low,
];

const TASK_STATUS_OPTIONS = ['Pending', 'Completed'];

interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  task: TaskType;
  triggerRef?: React.RefObject<HTMLElement>;
}

const EditTaskDialog: FC<EditTaskDialogProps> = ({ open, onClose, task, triggerRef }) => {
  const user = getUser();
  const {
    board,
    lists,
    updateTaskChecklistStatus,
    updateTaskDescription,
    changeTaskList,
    updateTaskPositionInList,
    createTaskComment,
    createTaskChecklistItem,
    updateTaskPriority,
    updateTaskTags,
    updateTaskDueDate,
    updateTaskName,
    updateTaskAssignees,
    updateTaskStatus,
    updateTaskComment,
    deleteTaskComment,
  } = useBoard();
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const { data } = useQuery(GET_TASK_QUERY, {
    variables: {
      boardId: board?.id as string,
      taskId: task.id,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [loadBoardMembers, { data: boardMembersData }] = useLazyQuery(GET_BOARD_MEMBERS, {
    variables: {
      boardId: board?.id as string,
    },
  });

  const debouncedUpdateTaskName = useDebouncedCallback(
    (val: string) => updateTaskName(board?.id as string, task.id, val),
    1000
  );

  const debouncedUpdateTaskDescription = useDebouncedCallback(
    (val: string) => updateTaskDescription(board?.id as string, task.id, val),
    1000
  );

  useEffect(() => {
    if (!open && triggerRef?.current) {
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 100);
    }
  }, [open, triggerRef]);

  const currentTask = data?.task;
  const checklist = (currentTask?.checklists ?? []).filter(Boolean);
  const dueDate = currentTask?.dueDate ? new Date(currentTask.dueDate) : undefined;
  const listId = currentTask?.list.id;
  const currentList = Array.isArray(lists) ? lists?.find((l: any) => l.id === listId) : undefined;
  const position = currentTask?.position;
  const assignees = useMemo(
    () =>
      (currentTask?.assignees ?? [])
        .filter(a => a && a.assignedTo)
        .map(a => ({
          label: a?.assignedTo.fullName,
          value: a?.assignedTo.id,
        })),
    [currentTask?.assignees]
  );

  const checklistItems = useMemo(
    () =>
      checklist
        .filter((item: any): item is { id: string; label: string; isCompleted: boolean } => !!item)
        .map((item: any) => ({
          id: item.id,
          label: item.label,
          isCompleted: item.isCompleted,
        })),
    [checklist]
  );

  const boardMemberOptions = useMemo(() => {
    const members =
      boardMembersData?.board.boardMembers?.map(m => ({
        label: m?.user.fullName as string,
        value: m?.user.id as string,
      })) || [];

    const superAdmins = board?.superAdmins || [];
    const superAdminOptions =
      superAdmins?.map(sa => ({
        label: sa.fullName as string,
        value: sa.id as string,
      })) || [];

    const clientAdmins = board?.clientAdmins || [];
    const clientAdminOptions =
      clientAdmins?.map(ca => ({
        label: ca.fullName as string,
        value: ca.id as string,
      })) || [];

    const allOptions = [...members, ...clientAdminOptions, ...superAdminOptions];
    const uniqueOptions = Array.from(new Map(allOptions.map(opt => [opt.value, opt])).values());

    return uniqueOptions;
  }, [boardMembersData?.board.boardMembers, board?.superAdmins, board?.clientAdmins]);

  const listChangeOptions = useMemo(
    () => (Array.isArray(lists) ? lists.map((l: any) => ({ label: l.name, value: l.id })) : []),
    [lists]
  );

  const taskPositionChangeOptions = useMemo(
    () =>
      Array.isArray(lists)
        ? (() => {
            const selectedList = lists.find((l: any) => l.id === currentTask?.list.id);
            return (
              selectedList?.tasks?.nodes?.map((_: any, idx: number) => ({
                label: String(idx + 1),
                value: String(idx + 1),
              })) || []
            );
          })()
        : [],
    [lists, currentTask?.list.id]
  );

  // Progress calculation
  const progress = useMemo(() => {
    const completedCount = checklistItems.filter(item => item.isCompleted).length;
    return checklistItems.length > 0
      ? Math.round((completedCount / checklistItems.length) * 100)
      : 0;
  }, [checklistItems]);

  if (!board) return null;
  if (!currentTask) return null;

  const handleChecklistStatus = (checklistItemId: string, checked: boolean) => {
    updateTaskChecklistStatus(board.id, checklistItemId, checked);
  };

  const handlePositionChange = (newPosition: string) => {
    if (!currentTask || !currentList) return;
    updateTaskPositionInList(board.id, currentTask.id, Number(newPosition));
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    debouncedUpdateTaskName(val);
  };

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
    debouncedUpdateTaskDescription(val);
  };

  const handleListChange = (val: string) => {
    changeTaskList(board.id, currentTask.id, val);
  };

  const handleTaskStatusChange = (val: string) => {
    const isCompleted = val === 'Pending' ? false : true;
    updateTaskStatus(board.id, currentTask.id, isCompleted);
  };

  const handleAssignees = (selected: { label: string; value: string }[]) => {
    const ids = selected.map(v => v.value);
    updateTaskAssignees(board.id, currentTask.id, ids);
  };

  const handleTags = (tags: { label: string; value: string }[]) => {
    const selectedTags = tags.map(tag => tag.value);
    updateTaskTags(board.id, currentTask.id, selectedTags);
  };

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()} modal={true}>
      <SheetContent side="right" className="w-full! max-w-[28rem]! p-0 overflow-y-auto">
        <SheetTitle className="sr-only">Edit Task</SheetTitle>
        <SheetDescription className="sr-only">
          Edit task details including title, description, due date, tags, priority, and more.
        </SheetDescription>
        <div className="flex flex-col w-full gap-2 p-8">
          <EditableTextTrigger
            value={title}
            onChange={handleTitleChange}
            type="TEXTAREA"
            placeholder="Task title"
            className="pr-12 text-2xl! font-bold mb-2 p-0 resize-none min-h-[40px] w-full border-none bg-transparent outline-none rounded-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0"
            textClassName="text-2xl! font-bold mb-2 min-h-[40px] block"
          />

          <EditableTextTrigger
            value={description}
            onChange={handleDescriptionChange}
            type="TEXTAREA"
            placeholder="Add a more detailed description..."
            className="max-h-[100px] overflow-y-auto w-full resize-none"
            textClassName="text-sm max-h-[100px] w-full inline-block "
            autoFocus
            label="Task Description"
            Icon={Hash}
          />

          <div className="flex flex-col gap-4 mt-4 mb-2 md:pr-8">
            <EditableTextTrigger
              value={assignees}
              onChange={handleAssignees}
              options={boardMemberOptions}
              type="MULTI_SELECT"
              label="Assign"
              Icon={Contact}
              onOpen={open => {
                if (open) loadBoardMembers();
              }}
            />

            {/* <EditableTextTrigger
                attachments={attachments as AttachmentType[]}
                onChange={handleAttachmentChange}
                type="ATTACHMENT"
                label="Attachments"
                Icon={Link}
              /> */}

            <EditableTextTrigger
              value={dueDate || null}
              onChange={date => updateTaskDueDate(board.id, currentTask.id, date)}
              type="CALENDAR"
              label="Due Date"
              Icon={Clock}
            />

            <EditableTextTrigger
              value={currentTask.tags?.map(tag => ({
                label: tag,
                value: tag,
              }))}
              onChange={handleTags}
              options={TAG_OPTIONS}
              type="MULTI_SELECT"
              label="Tags"
              Icon={Tag}
            />

            <EditableTextTrigger
              value={currentTask.priority}
              onChange={val => updateTaskPriority(board.id, currentTask.id, val)}
              options={PRIORITY_OPTIONS}
              type="SELECT"
              isFormat
              label="Priority"
              Icon={AlertTriangle}
            />

            <EditableTextTrigger
              value={currentTask.isCompleted ? 'Completed' : 'Pending'}
              onChange={handleTaskStatusChange}
              options={TASK_STATUS_OPTIONS}
              type="SELECT"
              label="Status"
              Icon={BookmarkCheck}
            />

            <EditableTextTrigger
              value={currentTask.list.id}
              onChange={handleListChange}
              options={listChangeOptions}
              type="SELECT"
              label="List"
              Icon={ListIcon}
            />

            <EditableTextTrigger
              value={String(position)}
              onChange={handlePositionChange}
              options={taskPositionChangeOptions}
              type="SELECT"
              label="Position"
              Icon={Move}
            />
          </div>

          <div className="my-4">
            <ChecklistComponent
              checklist={checklistItems}
              onChecklistChange={handleChecklistStatus}
              onCreateChecklistItem={label =>
                createTaskChecklistItem(board.id, currentTask.id, label)
              }
              progress={progress}
            />
          </div>

          {/* <div>
              <div className="font-semibold mb-1 flex items-center gap-2">
                <Paperclip className="w-4 h-4" /> View Attachments
              </div>
              {attachments.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {attachments.map(
                    (att: any) =>
                      att && (
                        <li key={att.id} className="flex items-center gap-2 text-xs">
                          {att.type && att.type.startsWith('image/') && att.url ? (
                            <a href={att.url} target="_blank">
                              <img
                                src={att.url}
                                alt={att.name}
                                className="h-10 w-10 object-cover rounded"
                              />
                            </a>
                          ) : (
                            <Paperclip className="w-3 h-3" />
                          )}
                          <span>{att.name}</span>
                        </li>
                      )
                  )}
                </ul>
              )}
            </div> */}

          <div>
            <div className="font-semibold text-base mt-2 mb-2">Comments</div>
            <div className="relative">
              <Textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[75px] pr-10"
                rows={4}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 bottom-1"
                onClick={() => {
                  if (comment.trim() && currentTask) {
                    createTaskComment(board.id, currentTask.id, user.id, comment);
                    setComment('');
                  }
                }}
              >
                <ArrowUp />
              </Button>
            </div>
            <div className="border-t border-border my-4" />
            <div className="mt-4">
              {currentTask.comments && currentTask.comments.length > 0 ? (
                <ul className="space-y-2">
                  {currentTask.comments
                    .filter(Boolean)
                    .map(
                      (c: any) =>
                        c && (
                          <CommentComponent
                            key={c.id}
                            comment={c}
                            boardId={board.id}
                            onDelete={deleteTaskComment}
                            onUpdate={val => updateTaskComment(board?.id as string, c.id, val)}
                          />
                        )
                    )}
                </ul>
              ) : (
                <div className="text-muted-foreground text-sm">No comments found</div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditTaskDialog;
