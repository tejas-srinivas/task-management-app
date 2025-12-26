import { GraphQLEnumType } from 'graphql';

const BoardStatusEnumType = new GraphQLEnumType({
  name: 'BoardStatusEnumType',
  values: {
    INACTIVE: { value: 0 },
    ACTIVE: { value: 1 },
  },
});

export default BoardStatusEnumType;
