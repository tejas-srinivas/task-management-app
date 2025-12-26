import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const ClientFilterInputType = new GraphQLInputObjectType({
  name: 'ClientFilterInputType',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
  }),
});

export { ClientFilterInputType };
