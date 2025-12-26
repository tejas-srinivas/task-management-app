import {
  attachment,
  task,
  checklist_item,
  task_assignee,
  comment,
} from "@prisma/client";
import { getPrismaInstance } from "datasources/prisma";
import { getEnumValue, getISTDayRange, getISTWeekRange } from "utils/misc";
import { v4 } from "uuid";
import TaskPriorityEnumType from "../enums/task-priority";
import dayjs from "dayjs";

const prisma = getPrismaInstance();

const getTask = async (id: string): Promise<task | null> => {
  return await prisma.task.findUnique({
    where: {
      id,
    },
  });
};

const getTasks = async (): Promise<task[] | null> => {
  return await prisma.task.findMany();
};

const getTasksByListId = async (
  listId: string,
  filters?: { text?: string; dueDate?: string; tags?: string[]; priority?: number; assigneeId: string; }
): Promise<task[] | null> => {
  const { text, dueDate, tags, priority, assigneeId } = filters || {};
  const IST_TZ = 'Asia/Kolkata';

  let dueDateFilter: any = undefined;
  if (dueDate) {
    switch (dueDate.toUpperCase()) {
      case 'TODAY': {
        const { startUTC, endUTC } = getISTDayRange(0);
        dueDateFilter = { gte: startUTC, lt: endUTC };
        break;
      }
      case 'TOMORROW': {
        const { startUTC, endUTC } = getISTDayRange(1);
        dueDateFilter = { gte: startUTC, lt: endUTC };
        break;
      }
      case 'THIS_WEEK': {
        const { startUTC, endUTC } = getISTWeekRange();
        dueDateFilter = { gte: startUTC, lt: endUTC };
        break;
      }
      case 'OVERDUE': {
        dueDateFilter = { lt: new Date() };
        break;
      }
      default: {
        // Assume ISO date string, treat as IST day
        const date = dayjs(dueDate).tz(IST_TZ);
        const startIST = date.startOf('day');
        const endIST = startIST.add(1, 'day');
        dueDateFilter = { gte: startIST.utc().toDate(), lt: endIST.utc().toDate() };
        break;
      }
    }
  }

  const where = {
    listId,
    ...(text && {
      title: { contains: text, mode: 'insensitive' },
    }),
    ...(dueDateFilter && { dueDate: dueDateFilter }),
    ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
    ...(priority !== undefined && { priority }),
    ...(assigneeId && {
      assignees: { some: { userId: assigneeId } }
    }),
  };

  return await prisma.task.findMany({
    where,
    orderBy: { position: 'asc' },
  });
};

const getAttachmentsByTaskId = async (
  id: string
): Promise<attachment[] | null> => {
  return await prisma.attachment.findMany({
    where: { taskId: id },
  });
};

const getChecklistItem = async (checklistItemId: string): Promise<checklist_item | null> => {
  return await prisma.checklist_item.findUnique({
    where: { id: checklistItemId }
  });
};

const getChecklistsByTaskId = async (
  taskId: string
): Promise<checklist_item[] | null> => {
  return await prisma.checklist_item.findMany({
    where: { taskId },
    orderBy: { createdAt: "asc" },
  });
};

const getAssigneesByTaskId = async (
  taskId: string
): Promise<task_assignee[] | null> => {
  return await prisma.task_assignee.findMany({
    where: { taskId },
    include: {
      user: true,
    },
  });
};

const getCommentsByTaskId = async (taskId: string): Promise<comment[]> => {
  return await prisma.comment.findMany({
    where: { taskId },
    orderBy: { createdAt: "desc" },
  });
};

const createTask = async (title: string, listId: string) => {
  const tasksCount = await prisma.task.count({
    where: { listId },
  });

  return await prisma.task.create({
    data: {
      id: v4(),
      title,
      listId,
      description: null,
      priority: getEnumValue(TaskPriorityEnumType.getValue("NOT_SET")),
      dueDate: undefined,
      tags: [],
      isCompleted: false,
      position: tasksCount + 1,
    },
  });
};

const createTaskChecklistItem = async (taskId: string, label: string) => {
  return await prisma.checklist_item.create({
    data: {
      id: v4(),
      taskId,
      label,
      isCompleted: false,
    },
  });
};

const createTaskAttachment = async (
  taskId: string,
  name: string,
  url: string,
  type: string
) => {
  return await prisma.attachment.create({
    data: {
      id: v4(),
      taskId,
      name,
      url,
      type,
    },
  });
};

const createTaskComment = async (
  taskId: string,
  authorId: string,
  text: string
) => {
  return await prisma.comment.create({
    data: {
      id: v4(),
      taskId,
      authorId,
      text,
    },
  });
};

const updateTaskComment = async (
  commentId: string,
  text: string
) => {
  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      text,
    },
  });
};

const updateTaskStatus = async (id: string, isCompleted: boolean) => {
  return await prisma.task.update({
    where: {
      id,
    },
    data: {
      isCompleted,
      dueDate: null
    }
  });
};

const updateTaskAssignees = async (
  taskId: string,
  assignees: string[]
) => {
  return prisma.$transaction(async (tx) => {
    // Remove all existing assignees for the task
    await tx.task_assignee.deleteMany({ where: { taskId } });

    // Add new assignees if provided
    if (assignees && assignees.length > 0) {
      await tx.task_assignee.createMany({
        data: assignees.map((a) => ({
          id: v4(),
          taskId: taskId,
          userId: a,
        })),
      });
    }

    // Return the new list of assignees for the task
    return tx.task_assignee.findMany({ where: { taskId } });
  });
};

const updateTaskChecklistStatus = async (checklistItemId: string, isCompleted: boolean) => {
  return await prisma.checklist_item.update({
    where: {
      id: checklistItemId,
    },
    data: {
      isCompleted,
    },
  });
};

interface AttachmentInput {
  id: string;
  name: string;
  url: string;
  type: string;
}

const updateTaskAttachments = (
  taskId: string,
  attachments: AttachmentInput[]
) => {
  return prisma.$transaction(async (tx) => {
    await tx.attachment.deleteMany({
      where: { taskId },
    });

    if (attachments.length > 0) {
      const attachmentsData = attachments.map((att) => ({
        ...att,
        taskId,
      }));

      await tx.attachment.createMany({
        data: attachmentsData,
      });
    }

    return tx.attachment.findMany({
      where: { taskId },
    });
  });
};

const updateTaskDescription = async (id: string, description: string) => {
  return await prisma.task.update({
    where: { id },
    data: {
      description,
    },
  });
};

const changeList = async (taskId: string, newListId: string) => {
  return await prisma.$transaction(async (tx) => {
    // Get the task and its current list/position
    const task = await tx.task.findUniqueOrThrow({ where: { id: taskId } });
    const oldListId = task.listId;
    const oldPosition = task.position;

    // Remove from old list: decrement positions after the old position
    await tx.task.updateMany({
      where: {
        listId: oldListId,
        position: { gt: oldPosition },
      },
      data: { position: { decrement: 1 } },
    });

    // Find the new position (end of new list, but must be at least 1)
    const taskCount = await tx.task.count({ where: { listId: newListId } });
    const newPosition = taskCount === 0 ? 1 : taskCount + 1;

    // Move the task
    return tx.task.update({
      where: { id: taskId },
      data: { listId: newListId, position: newPosition },
    });
  });
};

const updateTaskPositionInList = async (
  taskId: string,
  newPosition: number
) => {
  return prisma.$transaction(async (tx) => {
    const task = await tx.task.findUniqueOrThrow({ where: { id: taskId } });
    const listId = task.listId;
    const oldPosition = task.position;

    if (oldPosition === newPosition) return task;

    if (oldPosition < newPosition) {
      // Move down: decrement positions between oldPosition+1 and newPosition
      await tx.task.updateMany({
        where: {
          listId,
          position: { gt: oldPosition, lte: newPosition },
        },
        data: { position: { decrement: 1 } },
      });
    } else {
      // Move up: increment positions between newPosition and oldPosition-1
      await tx.task.updateMany({
        where: {
          listId,
          position: { gte: newPosition, lt: oldPosition },
        },
        data: { position: { increment: 1 } },
      });
    }

    // Move the task
    return tx.task.update({
      where: { id: taskId },
      data: { position: newPosition },
    });
  });
};

const updateTaskPriority = async (taskId: string, priority: number) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { priority },
  });
};

const updateTaskTags = async (taskId: string, tags: string[]) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { tags },
  });
};

const updateTaskDueDate = async (taskId: string, dueDate: Date) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { dueDate: new Date(dueDate), isCompleted: false },
  });
};

const updateTaskName = async (taskId: string, title: string) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { title },
  });
};

const changeTaskListWithPosition = async (
  boardId: string,
  taskId: string,
  newListId: string,
  newPosition: number
) => {
  return prisma.$transaction(async (tx) => {
    // Get the task and its current list/position, ensure it belongs to the board
    const task = await tx.task.findUniqueOrThrow({
      where: { id: taskId },
      include: { list: true }
    });
    if (task.list.boardId !== boardId) {
      throw new Error('Task does not belong to the specified board');
    }
    const oldListId = task.listId;
    const oldPosition = task.position;

    // Remove from old list: decrement positions after the old position, scoped to board
    await tx.task.updateMany({
      where: {
        listId: oldListId,
        position: { gt: oldPosition },
        list: { boardId }
      },
      data: { position: { decrement: 1 } },
    });

    // In the new list, increment positions >= newPosition, scoped to board
    await tx.task.updateMany({
      where: {
        listId: newListId,
        position: { gte: newPosition },
        list: { boardId }
      },
      data: { position: { increment: 1 } },
    });

    // Move the task
    return tx.task.update({
      where: { id: taskId },
      data: { listId: newListId, position: newPosition },
    });
  });
};

const deleteTaskComment = async (commentId: string) => {
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

export {
  getTask,
  getTasks,
  getTasksByListId,
  getChecklistItem,
  getAttachmentsByTaskId,
  getChecklistsByTaskId,
  getAssigneesByTaskId,
  getCommentsByTaskId,
  createTask,
  createTaskAttachment,
  createTaskChecklistItem,
  createTaskComment,
  updateTaskComment,
  updateTaskStatus,
  updateTaskChecklistStatus,
  updateTaskAttachments,
  updateTaskDescription,
  changeList,
  updateTaskPositionInList,
  updateTaskPriority,
  updateTaskTags,
  updateTaskDueDate,
  updateTaskName,
  updateTaskAssignees,
  changeTaskListWithPosition,
  deleteTaskComment,
};
