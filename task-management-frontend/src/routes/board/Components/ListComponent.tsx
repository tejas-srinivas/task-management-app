import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import { gql } from '@/__generated__/gql';
import { ListType, TaskType } from '@/__generated__/graphql';
import { EditableTextTrigger } from '@/primitives/EditableTextTrigger';

import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import useDebouncedCallback from '@/utils/debounce';

import { useBoard } from '../BoardContext/useBoard';
import ListActionsComponent from './ListActionsComponent';
import TaskComponent from './TaskComponent';

const UPDATE_LIST_NAME = gql(`
  mutation UpdateListName($boardId: ID!, $listId: ID!, $name: String!) {
    updateListName(boardId: $boardId, listId: $listId, name: $name) {
      id
      name
    }
  }
`);

const CREATE_TASK = gql(`
  mutation CreateTask($boardId: ID!, $listId: ID!, $title: String!) {
    createTask(boardId: $boardId, listId: $listId, title: $title) {
      id
      title
    }
  }
`);

interface ListComponentProps {
  list: ListType;
  onTaskEdit: (task: TaskType) => void;
  isRefetching?: boolean;
}

export default function ListComponent({
  list,
  onTaskEdit,
  isRefetching = false,
}: ListComponentProps) {
  const { board } = useBoard();
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [name, setName] = useState(list.name);

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: ['Lists'],
  });
  const [updateListName, { loading: updateListNameLoading, error: updateListNameError }] =
    useMutation(UPDATE_LIST_NAME);

  const debouncedSaveName = useDebouncedCallback((newName: string) => {
    if (newName !== list.name) {
      updateListName({
        variables: {
          boardId: board?.id as string,
          listId: list.id,
          name: newName.trim(),
        },
        refetchQueries: ['Lists'],
      });
    }
  }, 1000);

  const handleNameChange = (newName: string) => {
    setName(newName);
    debouncedSaveName(newName);
  };

  const handleAddCard = () => {
    if (cardTitle.trim()) {
      createTask({
        variables: {
          boardId: board?.id as string,
          listId: list.id,
          title: cardTitle.trim(),
        },
        onCompleted(data) {
          if (data.createTask?.id) {
            setCardTitle('');
            setShowAddCard(false);
          }
        },
        refetchQueries: ['Lists'],
      });
    }
  };

  return (
    <div className="bg-todo-list-card-background rounded-[0.525rem] shadow-sm w-72 p-2 mb-6 flex flex-col h-fit relative">
      {/* List Header */}
      <div className="flex items-center justify-between mb-2 sticky top-0 z-10 bg-todo-list-card-background border-b border-muted/30 h-10">
        <div className="font-semibold text-sm truncate ml-3" title={list.name}>
          <EditableTextTrigger
            value={name}
            onChange={handleNameChange}
            type="INPUT"
            placeholder="List name"
            className="text-sm font-semibold border-none bg-todo-list-card-background! p-0! rounded-none focus:ring-0 focus:outline-none focus:border-muted w-full"
            textClassName="text-sm font-semibold"
          />
          {updateListNameError && <div className="text-xs">{error?.message}</div>}
        </div>
        <div className="flex items-center gap-1">
          {updateListNameLoading && <Loader />}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => setShowAddCard(true)}
          >
            <Plus className="w-5 h-5" />
          </Button>
          <ListActionsComponent listId={list.id} />
        </div>
      </div>
      {/* Tasks as Droppable */}
      <Droppable droppableId={list.id}>
        {provided => (
          <div
            className="flex flex-col gap-2 mb-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.tasks.nodes.length === 0 ? (
              <div className="text-sm text-center text-muted-foreground py-4">No Tasks Found</div>
            ) : (
              list.tasks.nodes.map((task: TaskType, index: number) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {provided => (
                    <TaskComponent
                      task={task}
                      onTaskEdit={onTaskEdit}
                      isRefetching={isRefetching}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      innerRef={provided.innerRef}
                    />
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* Add Card UI */}
      {showAddCard ? (
        <div>
          <Textarea
            className="mb-2 bg-todo-list-card-foreground"
            placeholder="Enter a title for this task..."
            value={cardTitle}
            onChange={e => setCardTitle(e.target.value)}
            autoFocus
            rows={2}
          />
          <div className="flex gap-2 items-center justify-between">
            <div>
              <Button size="sm" onClick={handleAddCard}>
                <Plus className="w-5 h-5" /> Add Task
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setShowAddCard(false);
                  setCardTitle('');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {loading && <Loader />}
          </div>
          {error && <div className="text-xs">{error.message}</div>}
        </div>
      ) : (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-1 flex gap-2 items-center justify-start text-muted-foreground"
            onClick={() => setShowAddCard(true)}
          >
            <Plus className="w-4 h-4" /> Create a Task
          </Button>
        </div>
      )}
    </div>
  );
}
