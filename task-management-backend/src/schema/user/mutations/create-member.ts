import { GraphQLNonNull, GraphQLString } from "graphql";

import { UserType } from "..";
import { createMemberUser } from "../services";

const CreateMemberUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    clientId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { clientId, email, fullName }) => {
    return createMemberUser(clientId, email, fullName);
  },
};

export default CreateMemberUser;
