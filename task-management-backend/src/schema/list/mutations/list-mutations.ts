import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { ListType } from "..";
import { createList, updateListName, reorderLists, deleteList } from "../services";

const CreateList = {
  type: ListType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { boardId, name }) => {
    return createList(boardId, name);
  }
}

const UpdateListName = {
  type: ListType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    listId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { listId, name }) => {
    return updateListName(listId, name);
  },
};

const UpdateListPosition = {
  type: ListType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    listId: { type: new GraphQLNonNull(GraphQLID) },
    newPosition: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_root, { boardId, listId, newPosition }) => {
    return reorderLists(boardId, listId, newPosition);
  },
};

const DeleteList = {
  type: ListType,
  args: {
    boardId: { type: new GraphQLNonNull(GraphQLID) },
    listId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_root, { listId }) => {
    return deleteList(listId);
  },
};

export { CreateList, UpdateListName, UpdateListPosition, DeleteList }
