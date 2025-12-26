import { getPrismaInstance } from "datasources/prisma";
import { board, board_member, user } from "@prisma/client";
import { BoardsEntity } from "interfaces/board";
import { getEnumValue, getPageInfo } from "utils/misc";
import { getUserRole } from "schema/user/services";
import UserRoleEnumType from "schema/user/enums/user-role";
import InvalidOperationException from "utils/errors/invalid-operation";
import FailedOperationException from "utils/errors/failed-operation";
import { v4 } from "uuid";
import BoardStatusEnumType from "../enums/board-status";
import TaskPriorityEnumType from "../../task/enums/task-priority";
import UserStatusEnumType from "schema/user/enums/user-status";

const prisma = getPrismaInstance();

const getBoard = (id: string): Promise<board | null> => {
  return prisma.board.findUnique({
    where: {
      id,
    },
  });
};

const getBoards = async (
  currentUser: user,
  cursor?: string,
  limit?: number,
  filters?: { text?: string },
  sortBy: string = "createdAt",
  sortType: string = "DESC"
): Promise<BoardsEntity | null> => {
  const { text = "" } = filters || {};
  const userRole = await getUserRole(currentUser.id);
  const where: any = {
    OR: [
      { name: { contains: text, mode: "insensitive" } },
    ],
  };

  if (userRole !== getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN"))) {
    where.clientId = currentUser.clientId;
  }

  const result = await prisma.$transaction([
    prisma.board.count({ where }),
    prisma.board.findMany({
      skip: cursor ? 1 : 0,
      take: limit ? limit + 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: { [sortBy]: sortType.toLowerCase() },
    }),
  ]);

  const { resultSet, pageInfo } = getPageInfo(result, limit, cursor);

  return { boards: resultSet, pageInfo };
};

const getClientBoards = async (
  clientId: string,
  cursor?: string,
  limit?: number,
  filters?: { text?: string },
  sortBy: string = "createdAt",
  sortType: string = "DESC"
): Promise<BoardsEntity | null> => {
  const { text = "" } = filters || {};

  const result = await prisma.$transaction([
    prisma.board.count({
      where: {
        clientId,
        OR: [{ name: { contains: text } }],
      },
    }),
    prisma.board.findMany({
      skip: cursor ? 1 : 0,
      take: limit ? limit + 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        clientId,
        OR: [{ name: { contains: text } }],
      },
      orderBy: { [sortBy]: sortType.toLowerCase() },
    }),
  ]);

  const { resultSet, pageInfo } = getPageInfo(result, limit, cursor);

  return { boards: resultSet, pageInfo };
};

const getBoardMembers = async (boardId: string): Promise<board_member[]> => {
  return await prisma.board_member.findMany({
    where: {
      boardId,
      user: {
        status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
      },
    },
  });
};

const createBoard = async (clientId: string, name: string): Promise<board> => {
  if (!clientId || !name) {
    throw new InvalidOperationException(
      "ClientId and BoardName fields are required"
    );
  }

  const existingBoard = await prisma.board.findFirst({
    where: {
      clientId,
      name: { equals: name, mode: "insensitive" },
    },
  });
  if (existingBoard) {
    throw new InvalidOperationException(
      "A board with this name already exists for this client"
    );
  }

  try {
    const board = await prisma.board.create({
      data: {
        id: v4(),
        name,
        clientId,
        status: getEnumValue(BoardStatusEnumType.getValue("ACTIVE")),
      },
    });

    // Create template lists
    const todoList = await prisma.list.create({
      data: {
        id: v4(),
        boardId: board.id,
        name: "Todo",
        position: 1,
      },
    });

    const inProgressList = await prisma.list.create({
      data: {
        id: v4(),
        boardId: board.id,
        name: "In Progress",
        position: 2,
      },
    });

    const reviewList = await prisma.list.create({
      data: {
        id: v4(),
        boardId: board.id,
        name: "Review",
        position: 3,
      },
    });

    // Create sample tasks for Todo list
    const todoTasks = [
      {
        id: v4(),
        title: "Set up project requirements",
        description: "Define project scope, goals, and key deliverables",
        listId: todoList.id,
        priority: getEnumValue(TaskPriorityEnumType.getValue("HIGH")),
        position: 1,
        tags: ["Planning", "Requirements"],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        isCompleted: false,
      },
      {
        id: v4(),
        title: "Create project timeline",
        description: "Develop a detailed project schedule with milestones",
        listId: todoList.id,
        priority: getEnumValue(TaskPriorityEnumType.getValue("MEDIUM")),
        position: 2,
        tags: ["Planning", "Timeline"],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        isCompleted: false,
      },
      {
        id: v4(),
        title: "Review initial mockups",
        description: "Review and provide feedback on design mockups",
        listId: todoList.id,
        priority: getEnumValue(TaskPriorityEnumType.getValue("MEDIUM")),
        position: 3,
        tags: ["Design", "UX"],
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        isCompleted: false,
      },
    ];

    const inProgressTasks = [
      {
        id: v4(),
        title: "Database schema design",
        description: "Design and implement the database structure",
        listId: inProgressList.id,
        priority: getEnumValue(TaskPriorityEnumType.getValue("HIGH")),
        position: 1,
        tags: ["Backend", "Database"],
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        isCompleted: false,
      },
    ];

    const reviewTasks = [
      {
        id: v4(),
        title: "Project kickoff meeting",
        description: "Completed initial project kickoff with stakeholders",
        listId: reviewList.id,
        priority: getEnumValue(TaskPriorityEnumType.getValue("LOW")),
        position: 1,
        tags: ["Meeting", "Planning"],
        isCompleted: true,
      },
    ];

    await prisma.task.createMany({
      data: [...todoTasks, ...inProgressTasks, ...reviewTasks],
    });

    return board;
  } catch (error) {
    console.error(error);
    throw new FailedOperationException("Failed to create board");
  }
};

const updateBoardName = async (boardId: string, name: string) => {
  return await prisma.board.update({
    where: { id: boardId },
    data: { name },
  });
};

const updateBoardInformation = async (boardId: string, name: string, description: string) => {
  return await prisma.board.update({
    where: { id: boardId },
    data: { name, description },
  });
}

const updateBoardMembers = async (
  boardId: string,
  invitedBy: string,
  userIds: string[]
) => {
  await prisma.board_member.deleteMany({
    where: { boardId },
  });

  const createData = userIds.map((userId) => ({
    boardId,
    invitedBy,
    userId,
  }));

  if (createData.length > 0) {
    await prisma.board_member.createMany({
      data: createData,
      skipDuplicates: true,
    });
  }

  return prisma.board_member.findMany({
    where: { boardId },
    orderBy: { createdAt: "asc" },
  });
};

const closeBoard = async (boardId: string) => {
  return await prisma.board.update({
    where: {
      id: boardId,
    },
    data: {
      status: getEnumValue(BoardStatusEnumType.getValue("INACTIVE"))
    }
  });
};

export {
  getBoard,
  getBoards,
  getClientBoards,
  getBoardMembers,
  createBoard,
  updateBoardName,
  updateBoardMembers,
  updateBoardInformation,
  closeBoard
};
