import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType } from "schema/user";
import { getUser } from "schema/user/services";
import getIndianDateObject from "utils/indian-date-object";
import {
  getAssigneesByTaskId,
  getAttachmentsByTaskId,
  getChecklistsByTaskId,
  getCommentsByTaskId,
  getTask,
} from "./services";
import { ListType } from "schema/list";
import { getList } from "schema/list/services";
import TaskPriorityEnumType from "./enums/task-priority";

export const TaskType = new GraphQLObjectType({
  name: "TaskType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (task) => task.id,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (task) => task.title,
    },
    description: {
      type: GraphQLString,
      resolve: (task) => task.description,
    },
    dueDate: {
      type: GraphQLString,
      resolve: (task) => task.dueDate !== null ? getIndianDateObject(task.dueDate) : null,
    },
    priority: {
      type: TaskPriorityEnumType,
      resolve: (task) => (task.priority ? task.priority : null),
    },
    position: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (task) => task.position,
    },
    isCompleted: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (task) => task.isCompleted
    },
    list: {
      type: new GraphQLNonNull(ListType),
      resolve: (task) => getList(task.listId),
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      resolve: (task) => (task.tags ? task.tags : null),
    },
    attachments: {
      type: new GraphQLList(AttachmentType),
      resolve: async (task) => {
        const attachments = await getAttachmentsByTaskId(task.id);
        return attachments && attachments.length > 0 ? attachments : null;
      },
    },
    checklists: {
      type: new GraphQLList(ChecklistItemType),
      resolve: async (task) => {
        const checklists = await getChecklistsByTaskId(task.id);
        return checklists && checklists.length > 0 ? checklists : null;
      },
    },
    assignees: {
      type: new GraphQLList(TaskAssigneeType),
      resolve: async (task) => {
        const assignees = await getAssigneesByTaskId(task.id);
        return assignees && assignees.length > 0 ? assignees : null;
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (task) => {
        const comments = await getCommentsByTaskId(task.id);
        return comments && comments.length > 0 ? comments : null;
      },
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (task) => getIndianDateObject(task.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (task) => getIndianDateObject(task.updatedAt),
    },
  }),
});

export const TasksType = new GraphQLObjectType({
  name: "TasksType",
  fields: () => ({
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TaskType))),
      resolve: (obj) => obj,
    }
  }),
});

export const AttachmentType = new GraphQLObjectType({
  name: "AttachmentType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (attachment) => attachment.id,
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (attachment) => attachment.url,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (attachment) => attachment.name,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (attachment) => attachment.type,
    },
    task: {
      type: new GraphQLNonNull(TaskType),
      resolve: (attachment) => getTask(attachment.taskId),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (attachment) => getIndianDateObject(attachment.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (attachment) => getIndianDateObject(attachment.updatedAt),
    },
  }),
});

export const ChecklistItemType = new GraphQLObjectType({
  name: "ChecklistItemType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (item) => item.id,
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (item) => item.label,
    },
    isCompleted: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (item) => item.isCompleted,
    },
    task: {
      type: new GraphQLNonNull(TaskType),
      resolve: (item) => getTask(item.taskId),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (item) => getIndianDateObject(item.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (item) => getIndianDateObject(item.updatedAt),
    },
  }),
});

export const TaskAssigneeType = new GraphQLObjectType({
  name: "TaskAssigneeType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (assignee) => assignee.id,
    },
    task: {
      type: new GraphQLNonNull(TaskType),
      resolve: (assignee) => getTask(assignee.taskId),
    },
    assignedTo: {
      type: new GraphQLNonNull(UserType),
      resolve: (assignee) => getUser(assignee.userId),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (assignee) => getIndianDateObject(assignee.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (assignee) => getIndianDateObject(assignee.updatedAt),
    },
  }),
});

export const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (comment) => comment.id,
    },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: (comment) => getUser(comment.authorId),
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (comment) => comment.text,
    },
    task: {
      type: new GraphQLNonNull(TaskType),
      resolve: (comment) => getTask(comment.taskId),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (comment) => getIndianDateObject(comment.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (comment) => getIndianDateObject(comment.updatedAt),
    },
  }),
});
