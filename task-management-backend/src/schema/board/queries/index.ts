import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

import SortTypeEnumType from 'schema/misc/enums/sort-type';

import { getBoard, getBoards } from '../services';
import { BoardType, BoardsType } from '..';
import { BoardFilterInputType } from '../filters';

const BoardQueryFields = {
  board: {
    type: new GraphQLNonNull(BoardType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_root, { id }) => getBoard(id),
  },
  boards: {
    type: new GraphQLNonNull(BoardsType),
    args: {
      cursor: { type: GraphQLID },
      limit: { type: GraphQLInt },
      filters: { type: BoardFilterInputType },
      sortBy: { type: GraphQLString },
      sortType: { type: SortTypeEnumType },
    },
    resolve: async (_root, { cursor, limit, filters, sortBy, sortType }, { currentUser: user }) => {
      return getBoards(user, cursor, limit, filters, sortBy, sortType);
    },
  },
};

export default BoardQueryFields;
