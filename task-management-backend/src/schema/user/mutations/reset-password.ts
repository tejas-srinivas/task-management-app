import { GraphQLNonNull, GraphQLString } from 'graphql';

import { ForgotPasswordType } from '..';
import { resetPassword } from '../services';

const ResetPassword = {
  type: ForgotPasswordType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    oldPassword: { type: new GraphQLNonNull(GraphQLString) },
    newPassword: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_root, { email, oldPassword, newPassword }) => resetPassword(email, oldPassword, newPassword),
};

export default ResetPassword;
