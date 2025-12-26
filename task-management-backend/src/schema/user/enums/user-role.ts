import { GraphQLEnumType } from 'graphql';

const UserRoleEnumType = new GraphQLEnumType({
  name: 'UserRoleEnumType',
  values: {
    MEMBER: { value: 0 },
    CLIENT_ADMIN: { value: 1 },
    SUPER_ADMIN: { value: 2 },
  },
});

export default UserRoleEnumType;
