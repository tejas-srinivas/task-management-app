import { list } from "@prisma/client";
import { getPrismaInstance } from "datasources/prisma";
import { v4 } from "uuid";

const prisma = getPrismaInstance();

const getList = async (id: string): Promise<list | null> => {
  return await prisma.list.findUnique({ where: { id } });
};

const getListsByBoardId = async (boardId: string): Promise<list[]> => {
  return await prisma.list.findMany({ 
    where: { boardId },
    orderBy: { position: 'asc' } 
  });
};

const getNextPosition = async (boardId: string): Promise<number> => {
  const lastList = await prisma.list.findFirst({
    where: { boardId },
    orderBy: { position: 'desc' },
  });
  return lastList ? lastList.position + 1 : 1;
};

const createList = async (boardId: string, name: string) => {
  const position = await getNextPosition(boardId);
  return await prisma.list.create({
    data: {
      id: v4(),
      boardId,
      name,
      position,
    }
  });
}

const updateListName = async (listId: string, name: string) => {
  return await prisma.list.update({
    where: { id: listId },
    data: {
      name
    }
  });
};

const updateListPosition = async (listId: string, newPosition: number) => {
  return await prisma.list.update({
    where: { id: listId },
    data: {
      position: newPosition
    }
  });
};

const reorderLists = async (boardId: string, listId: string, newPosition: number) => {
  const currentList = await prisma.list.findUnique({
    where: { id: listId }
  });

  if (!currentList) {
    throw new Error('List not found');
  }

  const currentPosition = currentList.position;

  if (currentPosition === newPosition) {
    return currentList;
  }

  // Validate that newPosition is at least 1
  if (newPosition < 1) {
    throw new Error('Position must be at least 1');
  }

  // Get total number of lists in the board to validate upper bound
  const totalLists = await prisma.list.count({
    where: { boardId }
  });

  if (newPosition > totalLists) {
    throw new Error(`Position cannot be greater than ${totalLists}`);
  }

  // Move the list to a temporary position first to avoid conflicts
  await prisma.list.update({
    where: { id: listId },
    data: { position: -1 } // Temporary position
  });

  if (newPosition > currentPosition) {
    // Moving down: shift lists between current+1 and new position up by 1
    await prisma.list.updateMany({
      where: {
        boardId,
        position: {
          gte: currentPosition + 1,
          lte: newPosition
        }
      },
      data: {
        position: {
          decrement: 1
        }
      }
    });
  } else {
    // Moving up: shift lists between new position and current-1 down by 1
    await prisma.list.updateMany({
      where: {
        boardId,
        position: {
          gte: newPosition,
          lte: currentPosition - 1
        }
      },
      data: {
        position: {
          increment: 1
        }
      }
    });
  }

  // Move the list to its final position
  return await updateListPosition(listId, newPosition);
};

const deleteList = async (listId: string) => {
  const list = await prisma.list.findUnique({
    where: { id: listId }
  });

  if (!list) {
    throw new Error('List not found');
  }

  // Use a transaction to ensure all operations succeed or fail together
  await prisma.$transaction(async (tx) => {
    const tasks = await tx.task.findMany({
      where: { listId },
      select: { id: true }
    });

    const taskIds = tasks.map(task => task.id);

    if (taskIds.length > 0) {
      await tx.comment.deleteMany({
        where: { taskId: { in: taskIds } }
      });
      await tx.task_assignee.deleteMany({
        where: { taskId: { in: taskIds } }
      });
      await tx.attachment.deleteMany({
        where: { taskId: { in: taskIds } }
      });
      await tx.checklist_item.deleteMany({
        where: { taskId: { in: taskIds } }
      });
      await tx.task.deleteMany({
        where: { listId }
      });
    }

    await tx.list.delete({
      where: { id: listId }
    });

    // Update positions of remaining lists in the same board
    await tx.list.updateMany({
      where: {
        boardId: list.boardId,
        position: {
          gt: list.position
        }
      },
      data: {
        position: {
          decrement: 1
        }
      }
    });
  });

  return list;
};

export { getList, getListsByBoardId, createList, updateListName, updateListPosition, reorderLists, deleteList };
