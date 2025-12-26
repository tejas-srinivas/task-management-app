import { ArrowUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import { gql } from '@/__generated__/gql';
import {
  BoardStatusEnumType,
  ListType,
  TaskPriorityEnumType,
  TaskType,
} from '@/__generated__/graphql';
import { ChatBotLayout } from '@/layouts/ChatBotLayout';
import TaskBoardLayout from '@/layouts/TaskBoardLayout';
import { EditableTextTrigger } from '@/primitives/EditableTextTrigger';
import FilterBar from '@/primitives/FilterBar';
import { BoardProvider } from '@/routes/board/BoardContext/BoardContext';

import { ErrorAlert } from '@/components/ErrorAlert';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';

import { cn } from '@/utils/classnames';
import { DUEDATE_OPTIONS, TAG_OPTIONS } from '@/utils/constants';
import useDebouncedCallback from '@/utils/debounce';
import { withAllOption } from '@/utils/withAlloptions';

import { BoardType } from './BoardContext/BoardContextValue';
import { GET_LIST_QUERY } from './BoardContext/mutations';
import { useBoard } from './BoardContext/useBoard';
import { ChatBotComponent } from './ChatBot';
import AddListComponent from './Components/AddListComponent';
import BoardActionsComponent from './Components/BoardActionsComponent';
import ListComponent from './Components/ListComponent';
import EditTaskDialog from './EditTaskDialog';

const GET_BOARD_DETAILS = gql(`
  query BoardDetails($boardId: ID!) {
    board(id: $boardId) {
      id
      name
      status
      description
      client {
        id
        name
      }
      boardMembers {
        user {
          id
          fullName
        }
      }
      clientAdmins {
        id
        fullName
      }
      createdAt
      updatedAt
    }
  }
`);

const GET_SUPER_ADMINS = gql(`
  query GetSuperAdmins {
    superAdmins {
      id
      fullName
    }
  }
`);

const UPDATE_BOARD_NAME = gql(`
  mutation UpdateBoardName($boardId: ID!, $name: String!) {
    updateBoardName(boardId: $boardId, name: $name) {
      id
      name
    }
  }
`);

interface FiltersState {
  search: string;
  dueDate: string;
  tags: string;
  priority: string;
  assignee: string;
}

const priorityOptions = withAllOption(
  Object.values(TaskPriorityEnumType).map(priority => ({
    label: priority.charAt(0) + priority.slice(1).toLowerCase(),
    value: priority,
  }))
);

const tagOptions = withAllOption(TAG_OPTIONS);

const dueDateOptions = withAllOption(DUEDATE_OPTIONS);

const BoardActionsSection = ({
  loading,
  error,
  onShowFilterBar,
}: {
  loading: boolean;
  error: ApolloError | undefined;
  onShowFilterBar: () => void;
}) => {
  const { board } = useBoard();
  const [updateBoardName, { loading: updateBoardNameLoading, error: updateBoardNameError }] =
    useMutation(UPDATE_BOARD_NAME);

  const [name, setName] = useState(board?.name);
  const debouncedSaveName = useDebouncedCallback((val: string) => {
    if (val !== board?.name) {
      updateBoardName({
        variables: {
          boardId: board?.id as string,
          name: val,
        },
      });
    }
  }, 1000);

  const handleNameChange = (newName: string) => {
    setName(newName);
    debouncedSaveName(newName);
  };

  useEffect(() => {
    if (board?.name) {
      setName(board.name);
    }
  }, [board?.name]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 px-6 min-w-0 mx-auto flex-shrink-0 gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4">
          <EditableTextTrigger
            value={name}
            onChange={handleNameChange}
            type="INPUT"
            placeholder="Board name"
            className="text-2xl! font-bold border-b border-muted outline-none px-1"
            textClassName="text-2xl! font-bold"
          />
          {(loading || updateBoardNameLoading) && <Loader />}
        </div>
        <div className="text-muted-foreground text-base cursor-default">{board?.client?.name}</div>
        <div className="text-xs">{error?.message || updateBoardNameError?.message}</div>
      </div>
      <div className="flex-shrink-0">
        <BoardActionsComponent boardId={board?.id as string} onShowFilterBar={onShowFilterBar} />
      </div>
    </div>
  );
};

const BoardListsSection = ({
  loading,
  error,
  onTaskEdit,
  isRightSidebarOpen,
}: {
  loading: boolean;
  error: ApolloError | undefined;
  onTaskEdit: (task: TaskType) => void;
  isRightSidebarOpen: boolean;
}) => {
  const { lists } = useBoard();

  if (error) {
    return (
      <div className="flex items-center justify-center m-auto">
        <ErrorAlert error={error.message} />
      </div>
    );
  }

  if (loading && !lists?.length) {
    return (
      <div className="flex justify-center m-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex-grow transition-all duration-300 ease-in-out min-w-0',
        isRightSidebarOpen && 'pr-4'
      )}
    >
      <Droppable droppableId="lists" direction="horizontal" type="LIST">
        {provided => (
          <div
            className="flex gap-6 px-6 pb-8 min-w-0"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lists?.map((list, index) => (
              <Draggable draggableId={list.id} index={index} key={list.id}>
                {provided => (
                  <div
                    className="flex-shrink-0"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListComponent
                      list={list as ListType}
                      onTaskEdit={onTaskEdit}
                      isRefetching={loading}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddListComponent />
          </div>
        )}
      </Droppable>
    </div>
  );
};

function BoardContent({
  isRightSidebarOpen,
  boardDetailsLoading,
  boardDetailsError,
  listDataLoading,
  listDataError,
  filters,
  setFilters,
}: {
  isRightSidebarOpen: boolean;
  boardDetailsLoading: boolean;
  boardDetailsError: ApolloError | undefined;
  listDataLoading: boolean;
  listDataError: ApolloError | undefined;
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}) {
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const { board, handleDragEnd, handleDragStart } = useBoard();

  const boardMembers = board?.boardMembers;

  const memberOptions = useMemo(
    () => [
      { label: 'All', value: 'ALL' },
      ...(boardMembers?.map(m => ({ label: m.user.fullName, value: m.user.id })) ?? []),
    ],
    [boardMembers]
  );

  const handleTaskEdit = (task: TaskType) => {
    setEditingTask(task);
  };

  const handleTaskEditClose = () => {
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col max-h-[calc(100vh-65px)] min-w-0">
      <div className="flex-shrink-0">
        <BoardActionsSection
          loading={boardDetailsLoading}
          error={boardDetailsError}
          onShowFilterBar={() => setShowFilterBar(v => !v)}
        />
      </div>
      <div
        className={`transition-all duration-300 mb-4 border-t flex-shrink-0 ${
          showFilterBar ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2">
          <FilterBar
            searchValue={filters.search}
            onSearchChange={val => setFilters((prev: FiltersState) => ({ ...prev, search: val }))}
            searchPlaceholder="Search tasks..."
            selects={[
              {
                value: filters.dueDate,
                onChange: (val: string) =>
                  setFilters((prev: FiltersState) => ({ ...prev, dueDate: val })),
                options: dueDateOptions,
                placeholder: 'Due Date',
              },
              {
                value: filters.tags,
                onChange: (val: string) =>
                  setFilters((prev: FiltersState) => ({ ...prev, tags: val })),
                options: tagOptions,
                placeholder: 'Tags',
              },
              {
                value: filters.priority,
                onChange: (val: string) =>
                  setFilters((prev: FiltersState) => ({ ...prev, priority: val })),
                options: priorityOptions,
                placeholder: 'Priority',
              },
              ...(memberOptions.length > 0
                ? [
                    {
                      value: filters.assignee,
                      onChange: (val: string) =>
                        setFilters((prev: FiltersState) => ({ ...prev, assignee: val })),
                      options: memberOptions,
                      placeholder: 'Member',
                    },
                  ]
                : []),
            ]}
            className="pl-6"
          />
          <Button
            variant="ghost"
            onClick={() => {
              setFilters({ search: '', dueDate: '', tags: '', priority: '', assignee: '' });
              setShowFilterBar(false);
            }}
            className="p-2 rounded hover:bg-muted hover:scale-105"
            aria-label="Close filters"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {board?.status === BoardStatusEnumType.Inactive ? (
        <div className="flex items-center justify-center m-auto">
          <ErrorAlert
            error={
              'This board has been closed by admin and is no longer accessible. Please contact your admin for more information.'
            }
          />
        </div>
      ) : (
        <div className="flex-1 min-w-0 overflow-auto">
          <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <BoardListsSection
              loading={listDataLoading}
              error={listDataError}
              onTaskEdit={handleTaskEdit}
              isRightSidebarOpen={isRightSidebarOpen}
            />
          </DragDropContext>
        </div>
      )}
      {editingTask && (
        <EditTaskDialog open={!!editingTask} onClose={handleTaskEditClose} task={editingTask} />
      )}
    </div>
  );
}

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    dueDate: '',
    tags: '',
    priority: '',
    assignee: '',
  });

  const {
    data: boardDetails,
    loading: boardDetailsLoading,
    error: boardDetailsError,
  } = useQuery(GET_BOARD_DETAILS, {
    variables: {
      boardId: id as string,
    },
    skip: !id,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const {
    data: listData,
    loading: listDataLoading,
    error: listDataError,
  } = useQuery(GET_LIST_QUERY, {
    variables: {
      boardId: id!,
      filters: {
        text: filters.search || undefined,
        dueDate: filters.dueDate && filters.dueDate !== 'ALL' ? filters.dueDate : undefined,
        tags: filters.tags && filters.tags !== 'ALL' ? [filters.tags] : undefined,
        priority:
          filters.priority && filters.priority !== 'ALL'
            ? (filters.priority as TaskPriorityEnumType)
            : undefined,
        assigneeId: filters.assignee && filters.assignee !== 'ALL' ? filters.assignee : undefined,
      },
    },
    skip: !id,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const { data: superAdminsData } = useQuery(GET_SUPER_ADMINS, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const board = boardDetails?.board;
  const lists = listData?.lists?.nodes;
  const superAdmins = superAdminsData?.superAdmins || [];

  const boardData = {
    ...board,
    lists,
    superAdmins,
  } as BoardType;

  function renderContent() {
    return (
      <BoardProvider boardData={boardData}>
        <BoardContent
          boardDetailsLoading={boardDetailsLoading}
          boardDetailsError={boardDetailsError}
          listDataLoading={listDataLoading}
          listDataError={listDataError}
          isRightSidebarOpen={isRightSidebarOpen}
          filters={filters}
          setFilters={setFilters}
        />
        <ChatBotLayout
          isOpen={isRightSidebarOpen}
          onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        >
          <ChatBotComponent />
        </ChatBotLayout>
      </BoardProvider>
    );
  }

  return <TaskBoardLayout>{renderContent()}</TaskBoardLayout>;
}
