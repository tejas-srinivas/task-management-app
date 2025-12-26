import { GraphQLInputObjectType, GraphQLString } from 'graphql';

import UserStatusEnumType from '../enums/user-status';

const UserFilterInputType = new GraphQLInputObjectType({
  name: 'UserFilterInputType',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    status: {
      type: UserStatusEnumType,
    },
    clientId: {
      type: GraphQLString,
    },
  }),
});

export { UserFilterInputType };
