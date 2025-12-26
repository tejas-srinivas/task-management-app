import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PaginationType from "schema/pagination/pagination";
import getIndianDateObject from "utils/indian-date-object";
import ClientStatusEnumType from "./enums/client-status";
import { UsersType } from "schema/user";
import { getClientMembers } from "schema/user/services";
import { BoardsType } from "schema/board";
import { getClientBoards } from "schema/board/services";

export const ClientType = new GraphQLObjectType({
  name: "ClientType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (client) => client.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (client) => client.name,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (client) => client.description,
    },
    status: {
      type: new GraphQLNonNull(ClientStatusEnumType),
      resolve: (client) => client.status,
    },
    members: {
      type: UsersType,
      resolve: (client) => getClientMembers(client.id),
    },
    boards: {
      type: BoardsType,
      resolve: (client) => getClientBoards(client.id),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (client) => getIndianDateObject(client.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (client) => getIndianDateObject(client.updatedAt),
    },
  }),
});

export const ClientsType = new GraphQLObjectType({
  name: "ClientsType",
  fields: () => ({
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ClientType))),
      resolve: (obj) => obj.clients,
    },
    pageInfo: {
      type: new GraphQLNonNull(PaginationType),
      resolve: (obj) => obj.pageInfo,
    },
  }),
});
