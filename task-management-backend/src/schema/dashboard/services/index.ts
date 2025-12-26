import { user } from "@prisma/client";
import { getPrismaInstance } from "datasources/prisma";
import TaskPriorityEnumType from "schema/task/enums/task-priority";
import UserRoleEnumType from "schema/user/enums/user-role";
import { getEnumValue } from "utils/misc";

const prisma = getPrismaInstance();

export const getDashboardStats = async (user: user) => {
  const isSuperAdmin =
    user?.role === getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN"));
  const clientFilter = isSuperAdmin ? {} : { clientId: user?.clientId };

  // 1. Get all board IDs for the client
  const boardIds = (
    await prisma.board.findMany({
      where: clientFilter,
      select: { id: true },
    })
  ).map(b => b.id);

  // 2. Get all list IDs for those boards
  const listIds = (
    await prisma.list.findMany({
      where: boardIds.length > 0 ? { boardId: { in: boardIds } } : undefined,
      select: { id: true },
    })
  ).map(l => l.id);

  const [
    boardCount,
    memberCount,
    clientCount,
    taskCount,
    completedTaskCount,
    pendingTaskCount,
    immediatePriorityTaskCount,
    highPriorityTaskCount,
  ] = await Promise.all([
    prisma.board.count({ where: clientFilter }),
    prisma.user.count({ where: clientFilter }),
    prisma.client.count({ where: isSuperAdmin ? {} : { id: user?.clientId } }),
    listIds.length === 0 ? 0 : prisma.task.count({ where: { listId: { in: listIds } } }),
    listIds.length === 0 ? 0 : prisma.task.count({ where: { listId: { in: listIds }, isCompleted: true } }),
    listIds.length === 0 ? 0 : prisma.task.count({ where: { listId: { in: listIds }, isCompleted: false } }),
    listIds.length === 0 ? 0 : prisma.task.count({
      where: {
        listId: { in: listIds },
        priority: getEnumValue(TaskPriorityEnumType.getValue("IMMEDIATE")),
      },
    }),
    listIds.length === 0 ? 0 : prisma.task.count({
      where: {
        listId: { in: listIds },
        priority: getEnumValue(TaskPriorityEnumType.getValue("HIGH")),
      },
    }),
  ]);

  return {
    boardCount,
    memberCount,
    clientCount,
    taskCount,
    completedTaskCount,
    pendingTaskCount,
    immediatePriorityTaskCount,
    highPriorityTaskCount,
  };
};
