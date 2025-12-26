import { gql } from '@/__generated__/gql';

const GET_LIST_QUERY = gql(`
    query Lists($boardId: ID!, $filters: TaskFilterInputType) {
      lists(boardId: $boardId) {
        nodes {
          id
          name
          position
          tasks(filters: $filters) {
            nodes {
              id
              title
              description
              dueDate
              tags
              priority
              position
              isCompleted
              list {
                id
                name
              }
              assignees {
                assignedTo {
                  fullName
                }
              }
              checklists {
                id
              }
              comments {
                id
              }
              createdAt
              updatedAt
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  `);

export const GET_TASK_QUERY = gql(`
    query Task($boardId: ID!, $taskId: ID!) {
      task(boardId: $boardId, taskId: $taskId) {
        id
        title
        description
        dueDate
        priority
        position
        isCompleted
        tags
        list {
          id
          name
        }
        checklists {
          id
          label
          isCompleted
        }
        assignees {
          id
          assignedTo {
            id
            fullName
          }
        }
        comments {
          id
          text
          author {
            id
            fullName
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  `);

const CREATE_TASK_CHECKLIST_ITEM = gql(`
    mutation CreateTaskChecklistItem($boardId: ID!, $taskId: ID!, $label: String!) {
        createTaskChecklistItem(boardId: $boardId, taskId: $taskId, label: $label) {
            id
            label
            isCompleted
        }
    }
`);

const CREATE_TASK_COMMENT = gql(`
    mutation CreateTaskComment($boardId: ID!, $taskId: ID!, $authorId: ID!, $text: String!) {
        createTaskComment(boardId: $boardId, taskId: $taskId, authorId: $authorId, text: $text) {
            id
            text
            author {
                fullName
            }
        }
    }
`);

const UPDATE_LIST_POSITION = gql(`
    mutation UpdateListPosition($boardId: ID!, $listId: ID!, $newPosition: Int!) {
        updateListPosition(boardId: $boardId, listId: $listId, newPosition: $newPosition) {
            id
            name
            position
            createdAt
            updatedAt
        }
    }    
`);

const UPDATE_TASK_NAME = gql(`
    mutation UpdateTaskName($boardId: ID!, $taskId: ID!, $title: String!) {
        updateTaskName(boardId: $boardId, taskId: $taskId, title: $title) {
            id
            title
        }
    }
`);

const UPDATE_TASK_DESCRIPTION = gql(`
    mutation UpdateTaskDescription($boardId: ID!, $taskId: ID!, $description: String!) {
        updateTaskDescription(boardId: $boardId, taskId: $taskId, description: $description) {
            id
            description
        }
    }
`);

const UPDATE_TASK_ASSIGNEES = gql(`
    mutation UpdateTaskAssignees($boardId: ID!, $taskId: ID!, $assignees: [ID]!) {
        updateTaskAssignees(boardId: $boardId, taskId: $taskId, assignees: $assignees) {
            id
            assignedTo {
                fullName
            }
        }
    }
`);

const UPDATE_TASK_DUEDATE = gql(`
    mutation UpdateTaskDueDate($boardId: ID!, $taskId: ID!, $dueDate: String!) {
        updateTaskDueDate(boardId: $boardId, taskId: $taskId, dueDate: $dueDate) {
            id
            dueDate
        }
    }
`);

const UPDATE_TASK_STATUS = gql(`
    mutation UpdateTaskStatus($boardId: ID!, $taskId: ID!, $isCompleted: Boolean!) {
        updateTaskStatus(boardId: $boardId, taskId: $taskId, isCompleted: $isCompleted) {
            id
            isCompleted
        }
    }
`);

const UPDATE_TASK_TAGS = gql(`
    mutation UpdateTaskTags($boardId: ID!, $taskId: ID!, $tags: [String]!) {
        updateTaskTags(boardId: $boardId, taskId: $taskId, tags: $tags) {
            id
            tags
        }
    }
`);

const UPDATE_TASK_PRIORITY = gql(`
    mutation UpdateTaskPriority($boardId: ID!, $taskId: ID!, $priority: TaskPriorityEnumType!) {
        updateTaskPriority(boardId: $boardId, taskId: $taskId, priority: $priority) {
            id
            priority
        }
    }
`);

const UPDATE_TASK_COMMENT = gql(`
    mutation UpdateTaskComment($boardId: ID!, $commentId: ID!, $text: String!) {
        updateTaskComment(boardId: $boardId, commentId: $commentId, text: $text) {
            id
            text
        }
    }
`);

const DELETE_TASK_COMMENT = gql(`
    mutation DeleteTaskComment($boardId: ID!, $commentId: ID!) {
        deleteTaskComment(boardId: $boardId, commentId: $commentId) {
            id
        }
    }
`);

const UPDATE_TASK_POSITION = gql(`
    mutation UpdateTaskPositionInList($boardId: ID!, $taskId: ID!, $newPosition: Int!) {
        updateTaskPositionInList(boardId: $boardId, taskId: $taskId, newPosition: $newPosition) {
            id
            title
            dueDate
            tags
            priority
            position
            isCompleted
            list {
                id
                name
                position
                tasks {
                    nodes {
                        id
                        title
                        dueDate
                        tags
                        priority
                        position
                        isCompleted
                        list {
                            id
                            name
                        }
                        assignees {
                            assignedTo {
                                fullName
                            }
                        }
                        checklists {
                            id
                        }
                        comments {
                            id
                        }
                        createdAt
                        updatedAt
                    }
                }
                createdAt
                updatedAt
            }
        }
    }
`);

const UPDATE_CHECKLIST_STATUS = gql(`
    mutation UpdateTaskChecklistStatus($boardId: ID!, $checklistItemId: ID!, $isCompleted: Boolean!) {
        updateTaskChecklistStatus(boardId: $boardId, checklistItemId: $checklistItemId, isCompleted: $isCompleted) {
            id
            isCompleted
        }
    }
`);

const CHANGE_TASK_LIST = gql(`
    mutation ChangeTaskList($boardId: ID!, $taskId: ID!, $newListId: ID!) {
        changeTaskList(boardId: $boardId, taskId: $taskId, newListId: $newListId) {
            id
            list {
                id
            }
        }
    }
`);

const CHANGE_TASK_LIST_WITH_POSITION = gql(`
    mutation ChangeTaskListWithPosition($boardId: ID!, $taskId: ID!, $newListId: ID!, $newPosition: Int!) {
        changeTaskListWithPosition(boardId: $boardId, taskId: $taskId, newListId: $newListId, newPosition: $newPosition) {
            id
            title
            dueDate
            tags
            priority
            position
            isCompleted
            list {
                id
                name
                tasks {
                    nodes {
                        id
                        title
                        dueDate
                        tags
                        priority
                        position
                        isCompleted
                        list {
                            id
                            name
                        }
                        assignees {
                            assignedTo {
                                fullName
                            }
                        }
                        checklists {
                            id
                        }
                        comments {
                            id
                        }
                        createdAt
                        updatedAt
                    }
                }
                createdAt
                updatedAt
            }
        }
    }    
`);

export {
  GET_LIST_QUERY,
  CREATE_TASK_CHECKLIST_ITEM,
  CREATE_TASK_COMMENT,
  UPDATE_LIST_POSITION,
  UPDATE_TASK_NAME,
  UPDATE_TASK_DESCRIPTION,
  UPDATE_TASK_ASSIGNEES,
  UPDATE_TASK_DUEDATE,
  UPDATE_TASK_STATUS,
  UPDATE_TASK_TAGS,
  UPDATE_TASK_PRIORITY,
  UPDATE_TASK_POSITION,
  UPDATE_CHECKLIST_STATUS,
  CHANGE_TASK_LIST,
  CHANGE_TASK_LIST_WITH_POSITION,
  UPDATE_TASK_COMMENT,
  DELETE_TASK_COMMENT,
};
