import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

import SortTypeEnumType from 'schema/misc/enums/sort-type';

import { getClient, getClients } from '../services';
import { ClientType, ClientsType } from '..';
import { ClientFilterInputType } from '../filters';

const ClientQueryFields = {
  client: {
    type: new GraphQLNonNull(ClientType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_root, { id }) => getClient(id),
  },
  clients: {
    type: new GraphQLNonNull(ClientsType),
    args: {
      cursor: { type: GraphQLID },
      limit: { type: GraphQLInt },
      filters: { type: ClientFilterInputType },
      sortBy: { type: GraphQLString },
      sortType: { type: SortTypeEnumType },
    },
    resolve: async (_root, { cursor, limit, filters, sortBy, sortType }) => {
      return getClients(cursor, limit, filters, sortBy, sortType);
    },
  },
};

export default ClientQueryFields;
