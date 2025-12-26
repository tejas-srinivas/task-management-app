import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const BoardFilterInputType = new GraphQLInputObjectType({
  name: 'BoardFilterInputType',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
  }),
});

export { BoardFilterInputType };
