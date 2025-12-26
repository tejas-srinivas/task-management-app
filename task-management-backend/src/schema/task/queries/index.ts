import { GraphQLID, GraphQLNonNull } from 'graphql';
import { getTask, getTasksByListId } from '../services';
import { TaskType, TasksType } from '..';

const TaskQueryFields = {
  task: {
    type: new GraphQLNonNull(TaskType),
    args: {
      boardId: { type: new GraphQLNonNull(GraphQLID) },
      taskId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_root, { taskId }) => getTask(taskId),
  },
  tasks: {
    type: new GraphQLNonNull(TasksType),
    args: {
      listId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_root, { listId }) => getTasksByListId(listId),
  },
};

export default TaskQueryFields;
