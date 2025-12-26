import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { BoardType } from "schema/board";
import { getBoard } from "schema/board/services";
import { TasksType } from "schema/task";
import { TaskFilterInputType } from "schema/task/filters";
import { getTasksByListId } from "schema/task/services";
import getIndianDateObject from "utils/indian-date-object";

export const ListType = new GraphQLObjectType({
  name: "ListType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (list) => list.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (list) => list.name,
    },
    position: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (list) => list.position,
    },
    board: {
      type: new GraphQLNonNull(BoardType),
      resolve: (list) => getBoard(list.boardId),
    },
    tasks: {
      type: new GraphQLNonNull(TasksType),
      args: {
        filters: { type: TaskFilterInputType },
      },
      resolve: (list, { filters }) => getTasksByListId(list.id, filters),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (list) => getIndianDateObject(list.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (list) => getIndianDateObject(list.updatedAt),
    },
  }),
});

export const ListsType = new GraphQLObjectType({
  name: "ListsType",
  fields: () => ({
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ListType))),
      resolve: (obj) => obj,
    },
  }),
});
