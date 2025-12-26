import { GraphQLInputObjectType, GraphQLList, GraphQLString } from "graphql";
import TaskPriorityEnumType from "../enums/task-priority";

const TaskFilterInputType = new GraphQLInputObjectType({
  name: "TaskFilterInputType",
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    dueDate: {
      type: GraphQLString,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    priority: {
      type: TaskPriorityEnumType,
    },
    assigneeId: {
      type: GraphQLString,
    },
  }),
});

export { TaskFilterInputType };
