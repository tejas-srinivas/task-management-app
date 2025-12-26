/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AttachmentType = {
  __typename?: 'AttachmentType';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  task: TaskType;
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AuthPayloadType = {
  __typename?: 'AuthPayloadType';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

export type BoardFilterInputType = {
  text?: InputMaybe<Scalars['String']['input']>;
};

export type BoardMemberType = {
  __typename?: 'BoardMemberType';
  board: BoardType;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invitedByUser?: Maybe<UserType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: UserType;
};

export type BoardMembersType = {
  __typename?: 'BoardMembersType';
  nodes?: Maybe<Array<Maybe<BoardMemberType>>>;
};

export enum BoardStatusEnumType {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type BoardType = {
  __typename?: 'BoardType';
  boardMembers?: Maybe<Array<Maybe<BoardMemberType>>>;
  client: ClientType;
  clientAdmins: Array<UserType>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lists?: Maybe<ListsType>;
  name: Scalars['String']['output'];
  status: BoardStatusEnumType;
  updatedAt: Scalars['String']['output'];
};

export type BoardsType = {
  __typename?: 'BoardsType';
  nodes: Array<BoardType>;
  pageInfo: PaginationType;
};

export type ChecklistItemType = {
  __typename?: 'ChecklistItemType';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  task: TaskType;
  updatedAt: Scalars['String']['output'];
};

export type ClientFilterInputType = {
  text?: InputMaybe<Scalars['String']['input']>;
};

export enum ClientStatusEnumType {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type ClientType = {
  __typename?: 'ClientType';
  boards?: Maybe<BoardsType>;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  members?: Maybe<UsersType>;
  name: Scalars['String']['output'];
  status: ClientStatusEnumType;
  updatedAt: Scalars['String']['output'];
};

export type ClientsType = {
  __typename?: 'ClientsType';
  nodes: Array<ClientType>;
  pageInfo: PaginationType;
};

export type CommentType = {
  __typename?: 'CommentType';
  author: UserType;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  task: TaskType;
  text: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type DashboardStatsType = {
  __typename?: 'DashboardStatsType';
  boardCount: Scalars['Int']['output'];
  clientCount: Scalars['Int']['output'];
  completedTaskCount: Scalars['Int']['output'];
  highPriorityTaskCount: Scalars['Int']['output'];
  immediatePriorityTaskCount: Scalars['Int']['output'];
  memberCount: Scalars['Int']['output'];
  pendingTaskCount: Scalars['Int']['output'];
  taskCount: Scalars['Int']['output'];
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type ListType = {
  __typename?: 'ListType';
  board: BoardType;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  tasks: TasksType;
  updatedAt: Scalars['String']['output'];
};


export type ListTypeTasksArgs = {
  filters?: InputMaybe<TaskFilterInputType>;
};

export type ListsType = {
  __typename?: 'ListsType';
  nodes: Array<ListType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptUserInvite?: Maybe<AuthPayloadType>;
  changeTaskList?: Maybe<TaskType>;
  changeTaskListWithPosition?: Maybe<TaskType>;
  closeBoard?: Maybe<BoardType>;
  createBoard?: Maybe<BoardType>;
  createClientAdminUser?: Maybe<UserType>;
  createClientByAdmin?: Maybe<ClientType>;
  createList?: Maybe<ListType>;
  createMemberUser?: Maybe<UserType>;
  createTask?: Maybe<TaskType>;
  createTaskChecklistItem?: Maybe<ChecklistItemType>;
  createTaskComment?: Maybe<CommentType>;
  createUser?: Maybe<UserType>;
  deleteList?: Maybe<ListType>;
  deleteTaskComment?: Maybe<CommentType>;
  forgotPassword?: Maybe<ForgotPassword>;
  login?: Maybe<AuthPayloadType>;
  removeUser?: Maybe<UserType>;
  resetPassword?: Maybe<ForgotPassword>;
  signup?: Maybe<AuthPayloadType>;
  updateBoardInformation?: Maybe<BoardType>;
  updateBoardMembers?: Maybe<Array<Maybe<BoardMemberType>>>;
  updateBoardName?: Maybe<BoardType>;
  updateClientInformation?: Maybe<ClientType>;
  updateListName?: Maybe<ListType>;
  updateListPosition?: Maybe<ListType>;
  updateTaskAssignees?: Maybe<Array<Maybe<TaskAssigneeType>>>;
  updateTaskChecklistStatus?: Maybe<ChecklistItemType>;
  updateTaskComment?: Maybe<CommentType>;
  updateTaskDescription?: Maybe<TaskType>;
  updateTaskDueDate?: Maybe<TaskType>;
  updateTaskName?: Maybe<TaskType>;
  updateTaskPositionInList?: Maybe<TaskType>;
  updateTaskPriority?: Maybe<TaskType>;
  updateTaskStatus?: Maybe<TaskType>;
  updateTaskTags?: Maybe<TaskType>;
  updateUserRole?: Maybe<UserType>;
  updateUserStatus?: Maybe<UserType>;
};


export type MutationAcceptUserInviteArgs = {
  inviteToken: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationChangeTaskListArgs = {
  boardId: Scalars['ID']['input'];
  newListId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationChangeTaskListWithPositionArgs = {
  boardId: Scalars['ID']['input'];
  newListId: Scalars['ID']['input'];
  newPosition: Scalars['Int']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationCloseBoardArgs = {
  boardId: Scalars['ID']['input'];
};


export type MutationCreateBoardArgs = {
  clientId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateClientAdminUserArgs = {
  clientId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
};


export type MutationCreateClientByAdminArgs = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateListArgs = {
  boardId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateMemberUserArgs = {
  clientId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateTaskChecklistItemArgs = {
  boardId: Scalars['ID']['input'];
  label: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationCreateTaskCommentArgs = {
  authorId: Scalars['ID']['input'];
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteListArgs = {
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
};


export type MutationDeleteTaskCommentArgs = {
  boardId: Scalars['ID']['input'];
  commentId: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  callBackUrl: Scalars['String']['input'];
  emailId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateBoardInformationArgs = {
  boardId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateBoardMembersArgs = {
  boardId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateBoardNameArgs = {
  boardId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateClientInformationArgs = {
  clientId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: ClientStatusEnumType;
};


export type MutationUpdateListNameArgs = {
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateListPositionArgs = {
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
  newPosition: Scalars['Int']['input'];
};


export type MutationUpdateTaskAssigneesArgs = {
  assignees: Array<InputMaybe<Scalars['ID']['input']>>;
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateTaskChecklistStatusArgs = {
  boardId: Scalars['ID']['input'];
  checklistItemId: Scalars['ID']['input'];
  isCompleted: Scalars['Boolean']['input'];
};


export type MutationUpdateTaskCommentArgs = {
  boardId: Scalars['ID']['input'];
  commentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationUpdateTaskDescriptionArgs = {
  boardId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateTaskDueDateArgs = {
  boardId: Scalars['ID']['input'];
  dueDate: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateTaskNameArgs = {
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateTaskPositionInListArgs = {
  boardId: Scalars['ID']['input'];
  newPosition: Scalars['Int']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateTaskPriorityArgs = {
  boardId: Scalars['ID']['input'];
  priority: TaskPriorityEnumType;
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateTaskStatusArgs = {
  boardId: Scalars['ID']['input'];
  isCompleted: Scalars['Boolean']['input'];
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateTaskTagsArgs = {
  boardId: Scalars['ID']['input'];
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  taskId: Scalars['ID']['input'];
};


export type MutationUpdateUserRoleArgs = {
  id: Scalars['ID']['input'];
  role: UserRoleEnumType;
};


export type MutationUpdateUserStatusArgs = {
  id: Scalars['ID']['input'];
  status: UserStatusEnumType;
};

export type PaginationType = {
  __typename?: 'PaginationType';
  cursor?: Maybe<Scalars['ID']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  board: BoardType;
  boards: BoardsType;
  client: ClientType;
  clients: ClientsType;
  dashboard?: Maybe<DashboardStatsType>;
  list: ListType;
  lists?: Maybe<ListsType>;
  me: UserType;
  superAdmins: Array<UserType>;
  task: TaskType;
  tasks: TasksType;
  user: UserType;
  users: UsersType;
};


export type QueryBoardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBoardsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<BoardFilterInputType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SortTypeEnumType>;
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientsArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<ClientFilterInputType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SortTypeEnumType>;
};


export type QueryListArgs = {
  listId: Scalars['ID']['input'];
};


export type QueryListsArgs = {
  boardId: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
};


export type QueryTasksArgs = {
  listId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<UserFilterInputType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SortTypeEnumType>;
};

export enum SortTypeEnumType {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type TaskAssigneeType = {
  __typename?: 'TaskAssigneeType';
  assignedTo: UserType;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  task: TaskType;
  updatedAt: Scalars['String']['output'];
};

export type TaskFilterInputType = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<TaskPriorityEnumType>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export enum TaskPriorityEnumType {
  High = 'HIGH',
  Immediate = 'IMMEDIATE',
  Low = 'LOW',
  Medium = 'MEDIUM',
  NotSet = 'NOT_SET'
}

export type TaskType = {
  __typename?: 'TaskType';
  assignees?: Maybe<Array<Maybe<TaskAssigneeType>>>;
  attachments?: Maybe<Array<Maybe<AttachmentType>>>;
  checklists?: Maybe<Array<Maybe<ChecklistItemType>>>;
  comments?: Maybe<Array<Maybe<CommentType>>>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  list: ListType;
  position: Scalars['Int']['output'];
  priority?: Maybe<TaskPriorityEnumType>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type TasksType = {
  __typename?: 'TasksType';
  nodes: Array<TaskType>;
};

export type UserFilterInputType = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserStatusEnumType>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export enum UserRoleEnumType {
  ClientAdmin = 'CLIENT_ADMIN',
  Member = 'MEMBER',
  SuperAdmin = 'SUPER_ADMIN'
}

export enum UserStatusEnumType {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Invited = 'INVITED'
}

export type UserType = {
  __typename?: 'UserType';
  client?: Maybe<ClientType>;
  clientId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  hasAccessTo?: Maybe<BoardMembersType>;
  id: Scalars['ID']['output'];
  role: UserRoleEnumType;
  status: UserStatusEnumType;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type UsersType = {
  __typename?: 'UsersType';
  nodes: Array<UserType>;
  pageInfo: PaginationType;
};

export type ListsQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
  filters?: InputMaybe<TaskFilterInputType>;
}>;


export type ListsQuery = { __typename?: 'Query', lists?: { __typename?: 'ListsType', nodes: Array<{ __typename?: 'ListType', id: string, name: string, position: number, createdAt: string, updatedAt: string, tasks: { __typename?: 'TasksType', nodes: Array<{ __typename?: 'TaskType', id: string, title: string, description?: string | null, dueDate?: string | null, tags?: Array<string | null> | null, priority?: TaskPriorityEnumType | null, position: number, isCompleted: boolean, createdAt: string, updatedAt: string, list: { __typename?: 'ListType', id: string, name: string }, assignees?: Array<{ __typename?: 'TaskAssigneeType', assignedTo: { __typename?: 'UserType', fullName?: string | null } } | null> | null, checklists?: Array<{ __typename?: 'ChecklistItemType', id: string } | null> | null, comments?: Array<{ __typename?: 'CommentType', id: string } | null> | null }> } }> } | null };

export type TaskQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
}>;


export type TaskQuery = { __typename?: 'Query', task: { __typename?: 'TaskType', id: string, title: string, description?: string | null, dueDate?: string | null, priority?: TaskPriorityEnumType | null, position: number, isCompleted: boolean, tags?: Array<string | null> | null, createdAt: string, updatedAt: string, list: { __typename?: 'ListType', id: string, name: string }, checklists?: Array<{ __typename?: 'ChecklistItemType', id: string, label: string, isCompleted: boolean } | null> | null, assignees?: Array<{ __typename?: 'TaskAssigneeType', id: string, assignedTo: { __typename?: 'UserType', id: string, fullName?: string | null } } | null> | null, comments?: Array<{ __typename?: 'CommentType', id: string, text: string, createdAt: string, updatedAt: string, author: { __typename?: 'UserType', id: string, fullName?: string | null } } | null> | null } };

export type CreateTaskChecklistItemMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  label: Scalars['String']['input'];
}>;


export type CreateTaskChecklistItemMutation = { __typename?: 'Mutation', createTaskChecklistItem?: { __typename?: 'ChecklistItemType', id: string, label: string, isCompleted: boolean } | null };

export type CreateTaskCommentMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  authorId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateTaskCommentMutation = { __typename?: 'Mutation', createTaskComment?: { __typename?: 'CommentType', id: string, text: string, author: { __typename?: 'UserType', fullName?: string | null } } | null };

export type UpdateListPositionMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
  newPosition: Scalars['Int']['input'];
}>;


export type UpdateListPositionMutation = { __typename?: 'Mutation', updateListPosition?: { __typename?: 'ListType', id: string, name: string, position: number, createdAt: string, updatedAt: string } | null };

export type UpdateTaskNameMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;


export type UpdateTaskNameMutation = { __typename?: 'Mutation', updateTaskName?: { __typename?: 'TaskType', id: string, title: string } | null };

export type UpdateTaskDescriptionMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
}>;


export type UpdateTaskDescriptionMutation = { __typename?: 'Mutation', updateTaskDescription?: { __typename?: 'TaskType', id: string, description?: string | null } | null };

export type UpdateTaskAssigneesMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  assignees: Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>;
}>;


export type UpdateTaskAssigneesMutation = { __typename?: 'Mutation', updateTaskAssignees?: Array<{ __typename?: 'TaskAssigneeType', id: string, assignedTo: { __typename?: 'UserType', fullName?: string | null } } | null> | null };

export type UpdateTaskDueDateMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  dueDate: Scalars['String']['input'];
}>;


export type UpdateTaskDueDateMutation = { __typename?: 'Mutation', updateTaskDueDate?: { __typename?: 'TaskType', id: string, dueDate?: string | null } | null };

export type UpdateTaskStatusMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  isCompleted: Scalars['Boolean']['input'];
}>;


export type UpdateTaskStatusMutation = { __typename?: 'Mutation', updateTaskStatus?: { __typename?: 'TaskType', id: string, isCompleted: boolean } | null };

export type UpdateTaskTagsMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  tags: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTaskTagsMutation = { __typename?: 'Mutation', updateTaskTags?: { __typename?: 'TaskType', id: string, tags?: Array<string | null> | null } | null };

export type UpdateTaskPriorityMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  priority: TaskPriorityEnumType;
}>;


export type UpdateTaskPriorityMutation = { __typename?: 'Mutation', updateTaskPriority?: { __typename?: 'TaskType', id: string, priority?: TaskPriorityEnumType | null } | null };

export type UpdateTaskCommentMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  commentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type UpdateTaskCommentMutation = { __typename?: 'Mutation', updateTaskComment?: { __typename?: 'CommentType', id: string, text: string } | null };

export type DeleteTaskCommentMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  commentId: Scalars['ID']['input'];
}>;


export type DeleteTaskCommentMutation = { __typename?: 'Mutation', deleteTaskComment?: { __typename?: 'CommentType', id: string } | null };

export type UpdateTaskPositionInListMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  newPosition: Scalars['Int']['input'];
}>;


export type UpdateTaskPositionInListMutation = { __typename?: 'Mutation', updateTaskPositionInList?: { __typename?: 'TaskType', id: string, title: string, dueDate?: string | null, tags?: Array<string | null> | null, priority?: TaskPriorityEnumType | null, position: number, isCompleted: boolean, list: { __typename?: 'ListType', id: string, name: string, position: number, createdAt: string, updatedAt: string, tasks: { __typename?: 'TasksType', nodes: Array<{ __typename?: 'TaskType', id: string, title: string, dueDate?: string | null, tags?: Array<string | null> | null, priority?: TaskPriorityEnumType | null, position: number, isCompleted: boolean, createdAt: string, updatedAt: string, list: { __typename?: 'ListType', id: string, name: string }, assignees?: Array<{ __typename?: 'TaskAssigneeType', assignedTo: { __typename?: 'UserType', fullName?: string | null } } | null> | null, checklists?: Array<{ __typename?: 'ChecklistItemType', id: string } | null> | null, comments?: Array<{ __typename?: 'CommentType', id: string } | null> | null }> } } } | null };

export type UpdateTaskChecklistStatusMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  checklistItemId: Scalars['ID']['input'];
  isCompleted: Scalars['Boolean']['input'];
}>;


export type UpdateTaskChecklistStatusMutation = { __typename?: 'Mutation', updateTaskChecklistStatus?: { __typename?: 'ChecklistItemType', id: string, isCompleted: boolean } | null };

export type ChangeTaskListMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  newListId: Scalars['ID']['input'];
}>;


export type ChangeTaskListMutation = { __typename?: 'Mutation', changeTaskList?: { __typename?: 'TaskType', id: string, list: { __typename?: 'ListType', id: string } } | null };

export type ChangeTaskListWithPositionMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
  newListId: Scalars['ID']['input'];
  newPosition: Scalars['Int']['input'];
}>;


export type ChangeTaskListWithPositionMutation = { __typename?: 'Mutation', changeTaskListWithPosition?: { __typename?: 'TaskType', id: string, title: string, dueDate?: string | null, tags?: Array<string | null> | null, priority?: TaskPriorityEnumType | null, position: number, isCompleted: boolean, list: { __typename?: 'ListType', id: string, name: string, createdAt: string, updatedAt: string, tasks: { __typename?: 'TasksType', nodes: Array<{ __typename?: 'TaskType', id: string, title: string, dueDate?: string | null, tags?: Array<string | null> | null, priority?: TaskPriorityEnumType | null, position: number, isCompleted: boolean, createdAt: string, updatedAt: string, list: { __typename?: 'ListType', id: string, name: string }, assignees?: Array<{ __typename?: 'TaskAssigneeType', assignedTo: { __typename?: 'UserType', fullName?: string | null } } | null> | null, checklists?: Array<{ __typename?: 'ChecklistItemType', id: string } | null> | null, comments?: Array<{ __typename?: 'CommentType', id: string } | null> | null }> } } } | null };

export type CreateListMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList?: { __typename?: 'ListType', id: string, name: string } | null };

export type ClientMembersQueryVariables = Exact<{
  clientId: Scalars['ID']['input'];
}>;


export type ClientMembersQuery = { __typename?: 'Query', client: { __typename?: 'ClientType', members?: { __typename?: 'UsersType', nodes: Array<{ __typename?: 'UserType', id: string, fullName?: string | null, role: UserRoleEnumType }> } | null } };

export type UpdateBoardMembersMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type UpdateBoardMembersMutation = { __typename?: 'Mutation', updateBoardMembers?: Array<{ __typename?: 'BoardMemberType', id: string, createdAt?: string | null, updatedAt?: string | null, invitedByUser?: { __typename?: 'UserType', id: string, fullName?: string | null } | null, user: { __typename?: 'UserType', id: string, fullName?: string | null } } | null> | null };

export type DeleteListMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList?: { __typename?: 'ListType', id: string, name: string, position: number } | null };

export type UpdateListNameMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateListNameMutation = { __typename?: 'Mutation', updateListName?: { __typename?: 'ListType', id: string, name: string } | null };

export type CreateTaskMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  listId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'TaskType', id: string, title: string } | null };

export type BoardMembersQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type BoardMembersQuery = { __typename?: 'Query', board: { __typename?: 'BoardType', boardMembers?: Array<{ __typename?: 'BoardMemberType', user: { __typename?: 'UserType', id: string, fullName?: string | null } } | null> | null } };

export type CloseBoardMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type CloseBoardMutation = { __typename?: 'Mutation', closeBoard?: { __typename?: 'BoardType', id: string, name: string } | null };

export type BoardInformationQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type BoardInformationQuery = { __typename?: 'Query', board: { __typename?: 'BoardType', id: string, name: string, description?: string | null, status: BoardStatusEnumType } };

export type UpdateBoardInformationMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type UpdateBoardInformationMutation = { __typename?: 'Mutation', updateBoardInformation?: { __typename?: 'BoardType', id: string, name: string, description?: string | null } | null };

export type BoardDetailsQueryVariables = Exact<{
  boardId: Scalars['ID']['input'];
}>;


export type BoardDetailsQuery = { __typename?: 'Query', board: { __typename?: 'BoardType', id: string, name: string, status: BoardStatusEnumType, description?: string | null, createdAt: string, updatedAt: string, client: { __typename?: 'ClientType', id: string, name: string }, boardMembers?: Array<{ __typename?: 'BoardMemberType', user: { __typename?: 'UserType', id: string, fullName?: string | null } } | null> | null, clientAdmins: Array<{ __typename?: 'UserType', id: string, fullName?: string | null }> } };

export type GetSuperAdminsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuperAdminsQuery = { __typename?: 'Query', superAdmins: Array<{ __typename?: 'UserType', id: string, fullName?: string | null }> };

export type UpdateBoardNameMutationVariables = Exact<{
  boardId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateBoardNameMutation = { __typename?: 'Mutation', updateBoardName?: { __typename?: 'BoardType', id: string, name: string } | null };

export type CreateBoardMutationVariables = Exact<{
  clientId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard?: { __typename?: 'BoardType', id: string, name: string, createdAt: string, updatedAt: string } | null };

export type BoardsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<BoardFilterInputType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SortTypeEnumType>;
}>;


export type BoardsQuery = { __typename?: 'Query', boards: { __typename?: 'BoardsType', nodes: Array<{ __typename?: 'BoardType', id: string, name: string, status: BoardStatusEnumType, createdAt: string, updatedAt: string, client: { __typename?: 'ClientType', name: string } }>, pageInfo: { __typename?: 'PaginationType', cursor?: string | null, totalCount?: number | null, hasNextPage?: boolean | null } } };

export type CreateClientAdminUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  clientId: Scalars['String']['input'];
}>;


export type CreateClientAdminUserMutation = { __typename?: 'Mutation', createClientAdminUser?: { __typename?: 'UserType', id: string } | null };

export type CreateMemberUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  clientId: Scalars['String']['input'];
}>;


export type CreateMemberUserMutation = { __typename?: 'Mutation', createMemberUser?: { __typename?: 'UserType', id: string } | null };

export type UpdateClientInformationMutationVariables = Exact<{
  clientId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: ClientStatusEnumType;
}>;


export type UpdateClientInformationMutation = { __typename?: 'Mutation', updateClientInformation?: { __typename?: 'ClientType', id: string, name: string, description: string, status: ClientStatusEnumType, createdAt: string, updatedAt: string } | null };

export type ClientQueryVariables = Exact<{
  clientId: Scalars['ID']['input'];
}>;


export type ClientQuery = { __typename?: 'Query', client: { __typename?: 'ClientType', id: string, name: string, description: string, status: ClientStatusEnumType, createdAt: string, updatedAt: string, members?: { __typename?: 'UsersType', nodes: Array<{ __typename?: 'UserType', id: string, fullName?: string | null, email?: string | null, role: UserRoleEnumType, status: UserStatusEnumType, createdAt?: string | null, updatedAt?: string | null }>, pageInfo: { __typename?: 'PaginationType', cursor?: string | null, totalCount?: number | null, hasNextPage?: boolean | null } } | null, boards?: { __typename?: 'BoardsType', nodes: Array<{ __typename?: 'BoardType', id: string, name: string, status: BoardStatusEnumType, createdAt: string, updatedAt: string }>, pageInfo: { __typename?: 'PaginationType', cursor?: string | null, totalCount?: number | null, hasNextPage?: boolean | null } } | null } };

export type CreateClientByAdminMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateClientByAdminMutation = { __typename?: 'Mutation', createClientByAdmin?: { __typename?: 'ClientType', id: string, name: string, description: string, status: ClientStatusEnumType, createdAt: string, updatedAt: string } | null };

export type ClientsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<ClientFilterInputType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SortTypeEnumType>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: { __typename?: 'ClientsType', nodes: Array<{ __typename?: 'ClientType', id: string, name: string, description: string, status: ClientStatusEnumType, createdAt: string, updatedAt: string }>, pageInfo: { __typename?: 'PaginationType', cursor?: string | null, hasNextPage?: boolean | null, totalCount?: number | null } } };

export type DashboardQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardQueryQuery = { __typename?: 'Query', dashboard?: { __typename?: 'DashboardStatsType', boardCount: number, memberCount: number, clientCount: number, taskCount: number, completedTaskCount: number, pendingTaskCount: number, immediatePriorityTaskCount: number, highPriorityTaskCount: number } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayloadType', token?: string | null, user?: { __typename?: 'UserType', id: string, fullName?: string | null, role: UserRoleEnumType, email?: string | null, clientId: string, status: UserStatusEnumType } | null } | null };

export type UpdateUserStatusMutationVariables = Exact<{
  updateUserStatusId: Scalars['ID']['input'];
  status: UserStatusEnumType;
}>;


export type UpdateUserStatusMutation = { __typename?: 'Mutation', updateUserStatus?: { __typename?: 'UserType', id: string, fullName?: string | null, status: UserStatusEnumType } | null };

export type UserInformationQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type UserInformationQuery = { __typename?: 'Query', user: { __typename?: 'UserType', id: string, fullName?: string | null, email?: string | null, role: UserRoleEnumType, status: UserStatusEnumType, createdAt?: string | null, updatedAt?: string | null, client?: { __typename?: 'ClientType', id: string, name: string, boards?: { __typename?: 'BoardsType', nodes: Array<{ __typename?: 'BoardType', id: string, name: string, status: BoardStatusEnumType, createdAt: string, updatedAt: string }> } | null } | null, hasAccessTo?: { __typename?: 'BoardMembersType', nodes?: Array<{ __typename?: 'BoardMemberType', board: { __typename?: 'BoardType', id: string, name: string, status: BoardStatusEnumType, createdAt: string, updatedAt: string } } | null> | null } | null } };

export type MembersQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filters?: InputMaybe<UserFilterInputType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SortTypeEnumType>;
}>;


export type MembersQuery = { __typename?: 'Query', users: { __typename?: 'UsersType', nodes: Array<{ __typename?: 'UserType', id: string, fullName?: string | null, email?: string | null, role: UserRoleEnumType, status: UserStatusEnumType, createdAt?: string | null, updatedAt?: string | null, client?: { __typename?: 'ClientType', name: string } | null }>, pageInfo: { __typename?: 'PaginationType', cursor?: string | null, totalCount?: number | null, hasNextPage?: boolean | null } } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'ForgotPassword', status?: boolean | null, message?: string | null } | null };


export const ListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Lists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskFilterInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"checklists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ListsQuery, ListsQueryVariables>;
export const TaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Task"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"checklists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TaskQuery, TaskQueryVariables>;
export const CreateTaskChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskChecklistItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]} as unknown as DocumentNode<CreateTaskChecklistItemMutation, CreateTaskChecklistItemMutationVariables>;
export const CreateTaskCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>;
export const UpdateListPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateListPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosition"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateListPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPosition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosition"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateListPositionMutation, UpdateListPositionMutationVariables>;
export const UpdateTaskNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;
export const UpdateTaskDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>;
export const UpdateTaskAssigneesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskAssignees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignees"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskAssignees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"assignees"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignees"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskAssigneesMutation, UpdateTaskAssigneesMutationVariables>;
export const UpdateTaskDueDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskDueDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dueDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskDueDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"dueDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dueDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>;
export const UpdateTaskStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCompleted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isCompleted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCompleted"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskStatusMutation, UpdateTaskStatusMutationVariables>;
export const UpdateTaskTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskTagsMutation, UpdateTaskTagsMutationVariables>;
export const UpdateTaskPriorityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskPriority"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"priority"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskPriorityEnumType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskPriority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"priority"},"value":{"kind":"Variable","name":{"kind":"Name","value":"priority"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskPriorityMutation, UpdateTaskPriorityMutationVariables>;
export const UpdateTaskCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskCommentMutation, UpdateTaskCommentMutationVariables>;
export const DeleteTaskCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTaskComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskCommentMutation, DeleteTaskCommentMutationVariables>;
export const UpdateTaskPositionInListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskPositionInList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosition"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskPositionInList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPosition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosition"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"checklists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskPositionInListMutation, UpdateTaskPositionInListMutationVariables>;
export const UpdateTaskChecklistStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskChecklistStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checklistItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCompleted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskChecklistStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"checklistItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checklistItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isCompleted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCompleted"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskChecklistStatusMutation, UpdateTaskChecklistStatusMutationVariables>;
export const ChangeTaskListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeTaskList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeTaskList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newListId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newListId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeTaskListMutation, ChangeTaskListMutationVariables>;
export const ChangeTaskListWithPositionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeTaskListWithPosition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosition"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeTaskListWithPosition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newListId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newListId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPosition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosition"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"checklists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeTaskListWithPositionMutation, ChangeTaskListWithPositionMutationVariables>;
export const CreateListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateListMutation, CreateListMutationVariables>;
export const ClientMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClientMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ClientMembersQuery, ClientMembersQueryVariables>;
export const UpdateBoardMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoardMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitedByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardMembersMutation, UpdateBoardMembersMutationVariables>;
export const DeleteListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<DeleteListMutation, DeleteListMutationVariables>;
export const UpdateListNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateListName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateListName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateListNameMutation, UpdateListNameMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"listId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const BoardMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BoardMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<BoardMembersQuery, BoardMembersQueryVariables>;
export const CloseBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CloseBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CloseBoardMutation, CloseBoardMutationVariables>;
export const BoardInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BoardInformation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<BoardInformationQuery, BoardInformationQueryVariables>;
export const UpdateBoardInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoardInformation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardInformation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardInformationMutation, UpdateBoardInformationMutationVariables>;
export const BoardDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BoardDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"boardMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"clientAdmins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<BoardDetailsQuery, BoardDetailsQueryVariables>;
export const GetSuperAdminsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSuperAdmins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"superAdmins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]} as unknown as DocumentNode<GetSuperAdminsQuery, GetSuperAdminsQueryVariables>;
export const UpdateBoardNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoardName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardNameMutation, UpdateBoardNameMutationVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const BoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Boards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BoardFilterInputType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortTypeEnumType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<BoardsQuery, BoardsQueryVariables>;
export const CreateClientAdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClientAdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClientAdminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}},{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateClientAdminUserMutation, CreateClientAdminUserMutationVariables>;
export const CreateMemberUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMemberUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMemberUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}},{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateMemberUserMutation, CreateMemberUserMutationVariables>;
export const UpdateClientInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClientInformation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientStatusEnumType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClientInformation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateClientInformationMutation, UpdateClientInformationMutationVariables>;
export const ClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Client"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ClientQuery, ClientQueryVariables>;
export const CreateClientByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClientByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClientByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateClientByAdminMutation, CreateClientByAdminMutationVariables>;
export const ClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Clients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientFilterInputType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortTypeEnumType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<ClientsQuery, ClientsQueryVariables>;
export const DashboardQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardCount"}},{"kind":"Field","name":{"kind":"Name","value":"memberCount"}},{"kind":"Field","name":{"kind":"Name","value":"clientCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"pendingTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"immediatePriorityTaskCount"}},{"kind":"Field","name":{"kind":"Name","value":"highPriorityTaskCount"}}]}}]}}]} as unknown as DocumentNode<DashboardQueryQuery, DashboardQueryQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdateUserStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserStatusId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserStatusEnumType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserStatusId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>;
export const UserInformationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserInformation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"boards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasAccessTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UserInformationQuery, UserInformationQueryVariables>;
export const MembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Members"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserFilterInputType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortTypeEnumType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;