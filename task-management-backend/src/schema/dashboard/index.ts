import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from "graphql";

export const DashboardStatsType = new GraphQLObjectType({
  name: "DashboardStatsType",
  fields: () => ({
    boardCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.boardCount,
    },
    memberCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.memberCount,
    },
    clientCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.clientCount,
    },
    taskCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.taskCount,
    },
    completedTaskCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.completedTaskCount,
    },
    pendingTaskCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.pendingTaskCount,
    },
    immediatePriorityTaskCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.immediatePriorityTaskCount,
    },
    highPriorityTaskCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (stats) => stats.highPriorityTaskCount,
    },
  }),
});
