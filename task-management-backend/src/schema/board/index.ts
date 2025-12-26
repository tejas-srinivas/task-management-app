import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import getIndianDateObject from "utils/indian-date-object";
import PaginationType from "schema/pagination/pagination";
import { ListsType } from "schema/list";
import { getClientAdmins, getUser } from "schema/user/services";
import { UserType } from "schema/user";
import { getBoard, getBoardMembers } from "./services";
import { getClient } from "schema/client/services";
import { getListsByBoardId } from "schema/list/services";
import { ClientType } from "schema/client";
import BoardStatusEnumType from "./enums/board-status";

export const BoardType = new GraphQLObjectType({
  name: "BoardType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (board) => board.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (board) => board.name,
    },
    description: {
      type: GraphQLString,
      resolve: (board) => board.description,
    },
    status: {
      type: new GraphQLNonNull(BoardStatusEnumType),
      resolve: (board) => board.status,
    },
    client: {
      type: new GraphQLNonNull(ClientType),
      resolve: (board) => getClient(board.clientId),
    },
    lists: {
      type: ListsType,
      resolve: (board) => getListsByBoardId(board.id),
    },
    clientAdmins: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (board) => getClientAdmins(board.clientId),
    },
    boardMembers: {
      type: new GraphQLList(BoardMemberType),
      resolve: (board) => getBoardMembers(board.id),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (board) => getIndianDateObject(board.createdAt),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (board) => getIndianDateObject(board.updatedAt),
    },
  }),
});

export const BoardsType = new GraphQLObjectType({
  name: "BoardsType",
  fields: () => ({
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BoardType))),
      resolve: (obj) => obj.boards,
    },
    pageInfo: {
      type: new GraphQLNonNull(PaginationType),
      resolve: (obj) => obj.pageInfo,
    },
  }),
});

export const BoardMembersType = new GraphQLObjectType({
  name: "BoardMembersType",
  fields: () => ({
    nodes: {
      type: new GraphQLList(BoardMemberType),
      resolve: (obj) => obj,
    },
  }),
});

export const BoardMemberType = new GraphQLObjectType({
  name: "BoardMemberType",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (member) => member.id,
    },
    board: {
      type: new GraphQLNonNull(BoardType),
      resolve: (member) => getBoard(member.boardId),
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: (member) => getUser(member.userId),
    },
    invitedByUser: {
      type: UserType,
      resolve: (member) =>
        member.invitedBy ? getUser(member.invitedBy) : null,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (member) => getIndianDateObject(member.createdAt),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (member) => getIndianDateObject(member.updatedAt),
    },
  }),
});
