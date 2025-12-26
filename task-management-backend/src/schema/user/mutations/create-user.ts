import { GraphQLNonNull, GraphQLString } from "graphql";

import { UserType } from "..";
import { createUser } from "../services";

const CreateUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { email, password, fullName }) => {
    return createUser(email, password, fullName);
  },
};

export default CreateUser;
