import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import SortTypeEnumType from "schema/misc/enums/sort-type";

import { UserFilterInputType } from "../filters";

import { getSuperAdmins, getUser, getUsers } from "../services";
import { UsersType, UserType } from "..";

const UserQueryFields = {
  user: {
    type: new GraphQLNonNull(UserType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_root, { id }) => getUser(id),
  },
  users: {
    type: new GraphQLNonNull(UsersType),
    args: {
      cursor: { type: GraphQLID },
      limit: { type: GraphQLInt },
      filters: { type: UserFilterInputType },
      sortBy: { type: GraphQLString },
      sortType: { type: SortTypeEnumType },
    },
    resolve: async (
      _root,
      { cursor, limit, filters, sortBy, sortType },
      { currentUser: user }
    ) => getUsers(user, cursor, limit, filters, sortBy, sortType),
  },
  superAdmins: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
    resolve: async () => await getSuperAdmins(),
  },
};

export default UserQueryFields;
