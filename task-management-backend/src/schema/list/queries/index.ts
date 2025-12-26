import { GraphQLID, GraphQLNonNull } from 'graphql';

import { getList, getListsByBoardId } from '../services';
import { ListType, ListsType } from '..';

const ListQueryFields = {
  list: {
    type: new GraphQLNonNull(ListType),
    args: {
      listId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_root, { listId }) => getList(listId),
  },
  lists: {
    type: ListsType,
    args: {
      boardId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_root, { boardId }) => getListsByBoardId(boardId),
  },
};

export default ListQueryFields;
