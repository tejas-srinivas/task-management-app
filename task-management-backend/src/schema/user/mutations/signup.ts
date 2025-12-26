import { GraphQLNonNull, GraphQLString } from 'graphql';

import { AuthPayloadType } from '..';
import { signup } from '../services';

const Signup = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _root,
    { email, password, fullName }
  ) => {
    return signup(
      email,
      password,
      fullName,
    );
  },
};

export default Signup;
