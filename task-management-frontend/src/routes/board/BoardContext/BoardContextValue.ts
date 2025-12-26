import { createContext } from 'react';

import { DropResult } from '@hello-pangea/dnd';

import {
  AttachmentType,
  BoardStatusEnumType,
  ListType,
  TaskPriorityEnumType,
  UserType,
} from '@/__generated__/graphql';

export interface BoardType {
  __typename?: 'BoardType';
  id: string;
  name: string;
  projectName: string;
  status: BoardStatusEnumType;
  description: string;
  createdAt: string;
  updatedAt: string;
  client: {
    __typename?: 'ClientType';
    id: string;
    name: string;
  };
  clientAdmins?: {
    id: string;
    fullName: string;
  }[];
  boardMembers: {
    user: {
      id: string;
      fullName: string;
    };
  }[];
  lists?: ListType[];
  superAdmins?: {
    id: string;
    fullName: string;
  }[];
}

export type BoardContextType = {
  board: BoardType | undefined;
  lists: ListType[];
  setLists: (lists: ListType[]) => void;
  showAddList: boolean;
  currentUser: UserType;
  setShowAddList: (show: boolean) => void;

  handleDragEnd: (result: DropResult) => void;
  handleDragStart: () => void;

  updateListPosition: (boardId: string, listId: string, newPosition: number) => void;

  createTaskChecklistItem: (boardId: string, taskId: string, label: string) => void;
  createTaskComment: (boardId: string, taskId: string, authorId: string, text: string) => void;
  updateTaskName: (boardId: string, taskId: string, name: string) => void;
  updateTaskDescription: (boardId: string, taskId: string, description: string) => void;
  updateTaskAssignees: (boardId: string, taskId: string, assignees: string[]) => void;
  updateTaskDueDate: (boardId: string, taskId: string, dueDate: Date) => void;
  updateTaskStatus: (boardId: string, taskId: string, isCompleted: boolean) => void;
  updateTaskTags: (boardId: string, taskId: string, tags: string[]) => void;
  updateTaskPriority: (boardId: string, taskId: string, priority: TaskPriorityEnumType) => void;
  updateTaskPositionInList: (boardId: string, taskId: string, position: number) => void;
  updateTaskChecklistStatus: (
    boardId: string,
    checklistItemId: string,
    isCompleted: boolean
  ) => void;
  updateTaskAttachments: (boardId: string, taskId: string, attachments: AttachmentType[]) => void;
  changeTaskList: (boardId: string, taskId: string, newListId: string) => void;
  changeListWithPosition: (
    boardId: string,
    taskId: string,
    newListId: string,
    newPosition: number
  ) => void;
  updateTaskComment: (boardId: string, commentId: string, text: string) => void;
  deleteTaskComment: (boardId: string, commentId: string) => void;
};

export const BoardContext = createContext<BoardContextType | undefined>(undefined);
