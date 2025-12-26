import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { toast } from 'sonner';
import { useMutation } from '@apollo/client';
import { DropResult } from '@hello-pangea/dnd';

import { ListType, TaskPriorityEnumType, UserType } from '@/__generated__/graphql';

import { getUser } from '@/utils/auth';

import { BoardContext, BoardType } from './BoardContextValue';
import {
  CHANGE_TASK_LIST,
  CHANGE_TASK_LIST_WITH_POSITION,
  CREATE_TASK_CHECKLIST_ITEM,
  CREATE_TASK_COMMENT,
  GET_LIST_QUERY,
  UPDATE_CHECKLIST_STATUS,
  UPDATE_LIST_POSITION,
  UPDATE_TASK_ASSIGNEES,
  UPDATE_TASK_DESCRIPTION,
  UPDATE_TASK_DUEDATE,
  UPDATE_TASK_NAME,
  UPDATE_TASK_POSITION,
  UPDATE_TASK_PRIORITY,
  UPDATE_TASK_STATUS,
  UPDATE_TASK_TAGS,
  UPDATE_TASK_COMMENT,
  DELETE_TASK_COMMENT,
} from './mutations';
import { GET_TASK_QUERY } from './mutations';

export function BoardProvider({
  children,
  boardData,
}: {
  children: ReactNode;
  boardData?: BoardType | undefined;
}) {
  const currentUser: UserType = getUser();
  const [board, setBoard] = useState<BoardType | undefined>(boardData);
  const [lists, setLists] = useState<ListType[]>([]);
  const [showAddList, setShowAddList] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    setBoard(boardData);
  }, [boardData]);

  useEffect(() => {
    if (boardData?.lists && !isDragging) {
      setLists(boardData.lists);
    }
  }, [boardData?.lists, isDragging]);

  const [createTaskChecklistItemMutation] = useMutation(CREATE_TASK_CHECKLIST_ITEM, {
    onError: () => toast.error('Failed to create checklist item'),
  });
  const [createTaskCommentMutation] = useMutation(CREATE_TASK_COMMENT, {
    onError: () => toast.error('Failed to create comment'),
  });
  const [updateTaskNameMutation] = useMutation(UPDATE_TASK_NAME, {
    onError: () => toast.error('Failed to update task name'),
  });
  const [updateTaskDescriptionMutation] = useMutation(UPDATE_TASK_DESCRIPTION, {
    onError: () => toast.error('Failed to update task description'),
  });
  const [updateTaskAssigneesMutation] = useMutation(UPDATE_TASK_ASSIGNEES, {
    onError: () => toast.error('Failed to update task assignees'),
  });
  const [updateTaskDueDateMutation] = useMutation(UPDATE_TASK_DUEDATE, {
    onError: () => toast.error('Failed to update task due date'),
  });
  const [updateTaskStatusMutation] = useMutation(UPDATE_TASK_STATUS, {
    onError: () => toast.error('Failed to update task status'),
  });
  const [updateTaskTagsMutation] = useMutation(UPDATE_TASK_TAGS, {
    onError: () => toast.error('Failed to update task tags'),
  });
  const [updateTaskPriorityMutation] = useMutation(UPDATE_TASK_PRIORITY, {
    onError: () => toast.error('Failed to update task priority'),
  });
  const [updateTaskChecklistStatusMutation] = useMutation(UPDATE_CHECKLIST_STATUS, {
    onError: () => toast.error('Failed to update checklist status'),
  });
  const [updateTaskCommentMutation] = useMutation(UPDATE_TASK_COMMENT, {
    onError: () => toast.error('Failed to update the task comment'),
  });
  const [deleteTaskCommentMutation] = useMutation(DELETE_TASK_COMMENT, {
    onError: () => toast.error('Failed to delete the task comment'),
  });

  // used inside EditTaskDialog -> moves task to last position in the new list
  const [changeTaskListMutation] = useMutation(CHANGE_TASK_LIST, {
    onError: () => toast.error('Failed to move task to different list'),
  });
  // used for drag and drop tasks to any list and position
  const [changeTaskListAndPositionMutation] = useMutation(CHANGE_TASK_LIST_WITH_POSITION, {
    onError: () => toast.error('Failed to move task to different list'),
  });
  // used for drag and drop and EditTaskDialog to change task position within list
  const [updateTaskPositionInListMutation] = useMutation(UPDATE_TASK_POSITION, {
    onError: () => toast.error('Failed to update task position'),
  });
  // used for drag and drop of lists
  const [updateListPositionMutation] = useMutation(UPDATE_LIST_POSITION, {
    onError: () => toast.error('Failed to update list position'),
  });

  const createTaskChecklistItem = useCallback(
    async (boardId: string, taskId: string, label: string) => {
      await createTaskChecklistItemMutation({
        variables: { boardId, taskId, label },
        refetchQueries: ['Task'],
      });
    },
    [createTaskChecklistItemMutation]
  );

  const createTaskComment = useCallback(
    async (boardId: string, taskId: string, authorId: string, text: string) => {
      await createTaskCommentMutation({
        variables: { boardId, taskId, authorId, text },
        refetchQueries: ['Task', 'Lists'],
      });
    },
    [createTaskCommentMutation]
  );

  const updateTaskName = useCallback(
    async (boardId: string, taskId: string, title: string) => {
      await updateTaskNameMutation({
        variables: { boardId, taskId, title },
        update: (cache, { data }) => {
          if (!data?.updateTaskName) return;

          // Read the current lists from cache
          const cacheData: any = cache.readQuery({
            query: GET_LIST_QUERY,
            variables: {
              boardId,
              filters: {
                text: undefined,
                dueDate: undefined,
                tags: undefined,
                priority: undefined,
                assigneeId: undefined,
              },
            },
          });

          if (!cacheData?.lists?.nodes) return;

          const updatedLists = cacheData.lists.nodes.map((list: any) => ({
            ...list,
            tasks: {
              ...list.tasks,
              nodes: list.tasks.nodes.map((task: any) =>
                task.id === data.updateTaskName?.id
                  ? { ...task, title: data.updateTaskName?.title }
                  : task
              ),
            },
          }));

          cache.writeQuery({
            query: GET_LIST_QUERY,
            variables: {
              boardId,
              filters: {
                text: undefined,
                dueDate: undefined,
                tags: undefined,
                priority: undefined,
                assigneeId: undefined,
              },
            },
            data: {
              ...cacheData,
              lists: {
                ...cacheData.lists,
                nodes: updatedLists,
              },
            },
          });
        },
      });
    },
    [updateTaskNameMutation]
  );

  const updateTaskDescription = useCallback(
    async (boardId: string, taskId: string, description: string) => {
      await updateTaskDescriptionMutation({
        variables: { boardId, taskId, description },
        update: (cache, { data }) => {
          if (!data?.updateTaskDescription) return;

          // Read the current lists from cache
          const cacheData: any = cache.readQuery({
            query: GET_LIST_QUERY,
            variables: {
              boardId,
              filters: {
                text: undefined,
                dueDate: undefined,
                tags: undefined,
                priority: undefined,
                assigneeId: undefined,
              },
            },
          });

          if (!cacheData?.lists?.nodes) return;

          const updatedLists = cacheData.lists.nodes.map((list: any) => ({
            ...list,
            tasks: {
              ...list.tasks,
              nodes: list.tasks.nodes.map((task: any) =>
                task.id === data.updateTaskDescription?.id
                  ? { ...task, description: data.updateTaskDescription?.description }
                  : task
              ),
            },
          }));

          cache.writeQuery({
            query: GET_LIST_QUERY,
            variables: {
              boardId,
              filters: {
                text: undefined,
                dueDate: undefined,
                tags: undefined,
                priority: undefined,
                assigneeId: undefined,
              },
            },
            data: {
              ...cacheData,
              lists: {
                ...cacheData.lists,
                nodes: updatedLists,
              },
            },
          });
        },
      });
    },
    [updateTaskDescriptionMutation]
  );

  const updateTaskAssignees = useCallback(
    async (boardId: string, taskId: string, assignees: string[]) => {
      await updateTaskAssigneesMutation({
        variables: { boardId, taskId, assignees },
        refetchQueries: ['Task', 'Lists'],
      });
    },
    [updateTaskAssigneesMutation]
  );

  const updateTaskDueDate = useCallback(
    async (boardId: string, taskId: string, dueDate: Date) => {
      await updateTaskDueDateMutation({
        variables: { boardId, taskId, dueDate: dueDate.toISOString() },
        refetchQueries: ['Task', 'Lists'],
      });
    },
    [updateTaskDueDateMutation]
  );

  const updateTaskStatus = useCallback(
    async (boardId: string, taskId: string, isCompleted: boolean) => {
      await updateTaskStatusMutation({
        variables: { boardId, taskId, isCompleted },
        refetchQueries: ['Task', 'Lists'],
      });
    },
    [updateTaskStatusMutation]
  );

  const updateTaskTags = useCallback(
    async (boardId: string, taskId: string, tags: string[]) => {
      await updateTaskTagsMutation({
        variables: { boardId, taskId, tags },
        refetchQueries: ['Task', 'Lists'],
      });
    },
    [updateTaskTagsMutation]
  );

  const updateTaskPriority = useCallback(
    async (boardId: string, taskId: string, priority: TaskPriorityEnumType) => {
      await updateTaskPriorityMutation({
        variables: { boardId, taskId, priority },
        refetchQueries: ['Task', 'Lists'],
      });
    },
    [updateTaskPriorityMutation]
  );

  const updateTaskPositionInList = useCallback(
    async (boardId: string, taskId: string, newPosition: number, filters?: any) => {
      await updateTaskPositionInListMutation({
        variables: { boardId, taskId, newPosition },
        update: (cache, { data }) => {
          try {
            if (!data?.updateTaskPositionInList?.list) return;

            const updatedList = data.updateTaskPositionInList.list;

            const cacheVariables = {
              boardId,
              filters: filters || {
                text: undefined,
                dueDate: undefined,
                tags: undefined,
                priority: undefined,
                assigneeId: undefined,
              },
            };

            const cacheData: any = cache.readQuery({
              query: GET_LIST_QUERY,
              variables: cacheVariables,
            });

            if (!cacheData?.lists?.nodes) return;

            const updatedLists = cacheData.lists.nodes.map((list: any) =>
              list.id === updatedList.id ? updatedList : list
            );

            cache.writeQuery({
              query: GET_LIST_QUERY,
              variables: cacheVariables,
              data: {
                ...cacheData,
                lists: {
                  ...cacheData.lists,
                  nodes: updatedLists,
                },
              },
            });
            setLists(updatedLists);
          } catch (error) {
            console.error('Error updating cache for task position:', error);
          }
        },
        onCompleted: () => {
          setIsDragging(false);
        },
        onError: () => {
          setIsDragging(false);
          toast.error('Failed to update task position');
        },
      });
    },
    [updateTaskPositionInListMutation]
  );

  const updateTaskChecklistStatus = useCallback(
    async (boardId: string, checklistItemId: string, isCompleted: boolean) => {
      await updateTaskChecklistStatusMutation({
        variables: { boardId, checklistItemId, isCompleted },
        refetchQueries: ['Task'],
      });
    },
    [updateTaskChecklistStatusMutation]
  );

  const updateTaskAttachments = useCallback(() => {}, []);

  const updateTaskComment = useCallback(
    async (boardId: string, commentId: string, text: string, taskId?: string) => {
      await updateTaskCommentMutation({
        variables: { boardId, commentId, text },
        update: (cache, { data }) => {
          if (!data || !data.updateTaskComment) return;
          const cacheData: any = cache.readQuery({
            query: GET_TASK_QUERY,
            variables: { boardId, taskId: taskId as string },
          });
          const task = cacheData?.task;
          if (!task || !task.comments) return;
          const updatedComments = task.comments.map((c: any) =>
            c.id === data.updateTaskComment!.id
              ? { ...c, text: data.updateTaskComment!.text }
              : c
          );
          cache.writeQuery({
            query: GET_TASK_QUERY,
            variables: { boardId, taskId: task.id },
            data: {
              ...cacheData,
              task: {
                ...task,
                comments: updatedComments,
              },
            },
          });
        },
      });
    },
    [updateTaskCommentMutation]
  );

  const deleteTaskComment = useCallback( 
    async(boardId: string, commentId: string) => {
      await deleteTaskCommentMutation({
        variables: { boardId, commentId },
        refetchQueries: ['Task', 'Lists'],
      });
  }, [deleteTaskCommentMutation]);

  const changeTaskList = useCallback(
    async (boardId: string, taskId: string, newListId: string) => {
      await changeTaskListMutation({
        variables: { boardId, taskId, newListId },
        refetchQueries: ['Lists', 'Task'],
      });
    },
    [changeTaskListMutation]
  );

  const changeListWithPosition = useCallback(
    async (
      boardId: string,
      taskId: string,
      newListId: string,
      newPosition: number,
      filters?: any
    ) => {
      await changeTaskListAndPositionMutation({
        variables: { boardId, taskId, newListId, newPosition },
        update: (cache, { data }) => {
          try {
            if (!data?.changeTaskListWithPosition) return;

            // Get the current lists data from cache
            const cacheVariables = {
              boardId,
              filters: filters || {
                text: undefined,
                dueDate: undefined,
                tags: undefined,
                priority: undefined,
                assigneeId: undefined,
              },
            };

            const cacheData = cache.readQuery({
              query: GET_LIST_QUERY,
              variables: cacheVariables,
            });

            if (!cacheData?.lists?.nodes) {
              return;
            }

            const updatedData = {
              lists: {
                ...cacheData.lists,
                nodes: cacheData.lists.nodes.map((list: any) => {
                  if (list.id === data?.changeTaskListWithPosition?.list?.id) {
                    return {
                      ...list,
                      tasks: {
                        ...list.tasks,
                        nodes: data?.changeTaskListWithPosition?.list?.tasks?.nodes || [],
                      },
                    };
                  } else {
                    const movedTaskId = data?.changeTaskListWithPosition?.id;
                    if (movedTaskId) {
                      const updatedTasks = list.tasks.nodes.filter(
                        (task: any) => task.id !== movedTaskId
                      );
                      return {
                        ...list,
                        tasks: {
                          ...list.tasks,
                          nodes: updatedTasks,
                        },
                      };
                    }
                  }
                  return list;
                }),
              },
            };

            cache.writeQuery({
              query: GET_LIST_QUERY,
              variables: {
                boardId,
                filters: filters || {
                  text: undefined,
                  dueDate: undefined,
                  tags: undefined,
                  priority: undefined,
                  assigneeId: undefined,
                },
              },
              data: updatedData,
            });
          } catch (error) {
            console.error('Error updating cache for change list with position:', error);
          }
        },
        onCompleted: () => setIsDragging(false),
      });
    },
    [changeTaskListAndPositionMutation]
  );

  const updateListPosition = useCallback(
    async (boardId: string, listId: string, newPosition: number) => {
      await updateListPositionMutation({
        variables: { boardId, listId, newPosition },
        update: (cache, { data }) => {
          try {
            if (!data?.updateListPosition) return;

            const cacheVariables = {
              boardId,
              filters: {
                text: undefined,
                dueDate: undefined,
                tags: undefined,
                priority: undefined,
                assigneeId: undefined,
              },
            };

            const cacheData: any = cache.readQuery({
              query: GET_LIST_QUERY,
              variables: cacheVariables,
            });

            if (!cacheData?.lists?.nodes) return;

            const currentLists = [...cacheData.lists.nodes];
            const updatedList = data.updateListPosition;

            // Find the list that was updated
            const listIndex = currentLists.findIndex(list => list.id === updatedList.id);

            if (listIndex !== -1) {
              // Remove the list from its current position
              currentLists.splice(listIndex, 1);

              const insertIndex = Math.max(0, Math.min(newPosition - 1, currentLists.length));
              currentLists.splice(insertIndex, 0, updatedList);

              const updatedLists = currentLists.map((list, index) => ({
                ...list,
                position: index + 1,
              }));

              cache.writeQuery({
                query: GET_LIST_QUERY,
                variables: cacheVariables,
                data: {
                  ...cacheData,
                  lists: {
                    ...cacheData.lists,
                    nodes: updatedLists,
                  },
                },
              });
            }
          } catch (error) {
            console.error('Error updating cache:', error);
          }
        },
        onCompleted: () => {
          setIsDragging(false);
        },
        onError: () => {
          setIsDragging(false);
          toast.error('Failed to update list position');
        },
      });
    },
    [updateListPositionMutation]
  );

  const setListsWithOptimisticTracking = useCallback((newLists: ListType[]) => {
    setIsDragging(true);
    setLists(newLists);
  }, []);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId, type } = result;

      if (!destination) {
        setIsDragging(false);
        return;
      }

      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        setIsDragging(false);
        return;
      }

      if (!board?.id) {
        setIsDragging(false);
        return;
      }

      if (type === 'LIST') {
        const updatedLists = JSON.parse(JSON.stringify(lists));
        const [movedList] = updatedLists.splice(source.index, 1);
        updatedLists.splice(destination.index, 0, movedList);

        updatedLists.forEach((list: any, index: number) => {
          list.position = index + 1;
        });

        setLists(updatedLists);
        updateListPosition(board.id, movedList.id, destination.index + 1);
        return;
      }

      if (source.droppableId !== destination.droppableId) {
        const updatedLists = JSON.parse(JSON.stringify(lists));

        let sourceList: any = null;
        let taskToMove: any = null;

        for (const list of updatedLists) {
          const task = list.tasks?.nodes?.find((t: any) => t.id === draggableId);
          if (task) {
            sourceList = list;
            taskToMove = task;
            break;
          }
        }

        if (sourceList && taskToMove) {
          // Remove task from source list
          sourceList.tasks.nodes = sourceList.tasks.nodes.filter((t: any) => t.id !== draggableId);

          // Add task to destination list at the correct position
          const destinationList = updatedLists.find((l: any) => l.id === destination.droppableId);
          if (destinationList) {
            taskToMove.list = { id: destination.droppableId, name: destinationList.name };
            taskToMove.position = destination.index + 1;

            // Insert task at the correct position
            destinationList.tasks.nodes.splice(destination.index, 0, taskToMove);
            destinationList.tasks.nodes.forEach((task: any, index: number) => {
              task.position = index + 1;
            });
          }
          setLists(updatedLists);
        }

        changeListWithPosition(
          board.id,
          draggableId,
          destination.droppableId,
          destination.index + 1,
          {
            onCompleted: () => setIsDragging(false),
            onError: () => setIsDragging(false),
          }
        );
      } else {
        const updatedLists = JSON.parse(JSON.stringify(lists));
        const list = updatedLists.find((l: any) => l.id === source.droppableId);

        if (list) {
          const tasks = list.tasks.nodes;
          const [movedTask] = tasks.splice(source.index, 1);
          tasks.splice(destination.index, 0, movedTask);

          // Update positions
          tasks.forEach((task: any, index: number) => {
            task.position = index + 1;
          });

          setLists(updatedLists);
        }

        updateTaskPositionInList(board.id, draggableId, destination.index + 1);
      }
    },
    [board, lists, updateListPosition, changeListWithPosition, updateTaskPositionInList]
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const setShowAddListCallback = useCallback((show: boolean) => setShowAddList(show), []);

  const contextValue = useMemo(
    () => ({
      board,
      lists,
      setLists: setListsWithOptimisticTracking,
      showAddList,
      currentUser,
      setShowAddList: setShowAddListCallback,
      handleDragEnd,
      handleDragStart,
      createTaskChecklistItem,
      createTaskComment,
      updateListPosition,
      updateTaskName,
      updateTaskDescription,
      updateTaskAssignees,
      updateTaskDueDate,
      updateTaskStatus,
      updateTaskTags,
      updateTaskPriority,
      updateTaskPositionInList,
      updateTaskChecklistStatus,
      updateTaskAttachments,
      changeTaskList,
      changeListWithPosition,
      updateTaskComment,
      deleteTaskComment,
    }),
    [
      board,
      lists,
      showAddList,
      currentUser,
      handleDragEnd,
      handleDragStart,
      createTaskChecklistItem,
      createTaskComment,
      updateListPosition,
      updateTaskName,
      updateTaskDescription,
      updateTaskAssignees,
      updateTaskDueDate,
      updateTaskStatus,
      updateTaskTags,
      updateTaskPriority,
      updateTaskPositionInList,
      updateTaskChecklistStatus,
      updateTaskAttachments,
      changeTaskList,
      changeListWithPosition,
      setListsWithOptimisticTracking,
      setShowAddListCallback,
      updateTaskComment,
      deleteTaskComment,
    ]
  );

  return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>;
}
