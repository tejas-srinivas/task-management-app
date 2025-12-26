import dotenv from 'dotenv';
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';

import mutationFields from './mutations';
import queryFields from './query';
import { UserType } from './user';
import UserAuthException from 'utils/errors/userAuthException';
import { DashboardStatsType } from './dashboard';
import { getDashboardStats } from './dashboard/services';

dotenv.config();

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...queryFields,
    me: {
      type: new GraphQLNonNull(UserType),
      args: {},
      resolve: async (_root, { }, { currentUser: user }) => {
        if (user === null) {
          throw new UserAuthException('Unauthenticated!');
        }
        return user;
      },
    },
    dashboard: {
      type: DashboardStatsType,
      resolve: async (_root, {}, { currentUser: user }) => getDashboardStats(user),
    },
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => mutationFields,
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

export default schema;
