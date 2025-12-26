import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } from "graphql";

import { ChecklistItemType, CommentType, TaskAssigneeType, TaskType } from "..";
import {
  createTask,
  createTaskChecklistItem,
  updateTaskName,
  updateTaskDueDate,
  updateTaskTags,
  updateTaskPriority,
  updateTaskPositionInList,
  updateTaskDescription,
  updateTaskChecklistStatus,
  createTaskComment,
  updateTaskAssignees,
  updateTaskStatus,
  changeList,
  changeTaskListWithPosition,
  updateTaskComment,
  deleteTaskComment,
} from "../services";
import TaskPriorityEnumType from "../enums/task-priority";

const CreateTask = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    listId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { listId, title }) => {
    return createTask(title, listId);
  },
};

const CreateTaskComment = {
  type: CommentType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    authorId: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { taskId, authorId, text }) => {
    return createTaskComment(taskId, authorId, text);
  },
};

const CreateTaskChecklistItem = {
  type: ChecklistItemType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    label: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { taskId, label }) => {
    return createTaskChecklistItem(taskId, label);
  },
};

const UpdateTaskName = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { taskId, title }) => {
    return updateTaskName(taskId, title);
  },
};

const UpdateTaskDueDate = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    dueDate: { type: new GraphQLNonNull(GraphQLString) }, // ISO string
  },
  resolve: async (_root, { taskId, dueDate }) => {
    return updateTaskDueDate(taskId, new Date(dueDate));
  },
};

const UpdateTaskTags = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
  },
  resolve: async (_root, { taskId, tags }) => {
    return updateTaskTags(taskId, tags);
  },
};

const UpdateTaskPriority = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    priority: { type: new GraphQLNonNull(TaskPriorityEnumType) },
  },
  resolve: async (_root, { taskId, priority }) => {
    return updateTaskPriority(taskId, priority);
  },
};

const UpdateTaskPositionInList = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    newPosition: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_root, { taskId, newPosition }) => {
    return updateTaskPositionInList(taskId, newPosition);
  },
};

const ChangeTaskList = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    newListId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_root, { taskId, newListId }) => {
    return changeList(taskId, newListId);
  },
};

const ChangeTaskListWithPosition = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    newListId: { type: new GraphQLNonNull(GraphQLID) },
    newPosition: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async (_root, { boardId, taskId, newListId, newPosition }) => {
    return changeTaskListWithPosition(boardId, taskId, newListId, newPosition);
  },
};

const UpdateTaskDescription = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { taskId, description }) => {
    return updateTaskDescription(taskId, description);
  },
};

const UpdateTaskStatus = {
  type: TaskType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    isCompleted: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (_root, { taskId, isCompleted }) => {
    return updateTaskStatus(taskId, isCompleted);
  },
}

const UpdateTaskChecklistStatus = {
  type: ChecklistItemType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    checklistItemId: { type: new GraphQLNonNull(GraphQLID) },
    isCompleted: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (_root, { checklistItemId, isCompleted }) => {
    return updateTaskChecklistStatus(checklistItemId, isCompleted);
  },
};

const UpdateTaskAssignees = {
  type: new GraphQLList(TaskAssigneeType),
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    assignees: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
  },
  resolve: async (_root, { taskId, assignees }) => {
    return updateTaskAssignees(taskId, assignees);
  },
};

const UpdateTaskComment = {
  type: CommentType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    commentId: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { commentId, text }) => {
    return updateTaskComment(commentId, text);
  }
};

const DeleteTaskComment = {
  type: CommentType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    commentId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_root, { commentId }) => {
    return deleteTaskComment(commentId);
  }
};

export {
  CreateTask,
  CreateTaskComment,
  CreateTaskChecklistItem,
  UpdateTaskName,
  UpdateTaskDueDate,
  UpdateTaskStatus,
  UpdateTaskTags,
  UpdateTaskPriority,
  UpdateTaskPositionInList,
  ChangeTaskList,
  ChangeTaskListWithPosition,
  UpdateTaskDescription,
  UpdateTaskChecklistStatus,
  UpdateTaskAssignees,
  UpdateTaskComment,
  DeleteTaskComment,
};
