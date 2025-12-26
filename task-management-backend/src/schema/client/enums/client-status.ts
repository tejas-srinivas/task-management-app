import { GraphQLEnumType } from 'graphql';

const ClientStatusEnumType = new GraphQLEnumType({
  name: 'ClientStatusEnumType',
  values: {
    INACTIVE: { value: 0 },
    ACTIVE: { value: 1 },
  },
});

export default ClientStatusEnumType;
