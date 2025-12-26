import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import { BoardMemberType, BoardType } from "..";
import { closeBoard, createBoard, updateBoardInformation, updateBoardMembers, updateBoardName } from "../services";

const CreateBoard = {
  type: BoardType,
  args: {
    clientId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { clientId, name }) => {
    return createBoard(clientId, name);
  },
};

const UpdateBoardName = {
  type: BoardType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { boardId, name }) => {
    return updateBoardName(boardId, name);
  },
};

const UpdateBoardMembers = {
  type: new GraphQLList(BoardMemberType),
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    userIds: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
    },
  },
  resolve: async (_root, { boardId, userIds }, { currentUser: user }) =>
    updateBoardMembers(boardId, user.id, userIds),
};

const UpdateBoardInformation = {
  type: BoardType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { boardId, name, description }) => updateBoardInformation(boardId, name, description)
};

const CloseBoard = {
  type: BoardType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_root, { boardId }) => {
    return closeBoard(boardId);
  },
};

export { CreateBoard, UpdateBoardName, UpdateBoardMembers, UpdateBoardInformation, CloseBoard };
