import { GraphQLNonNull, GraphQLString } from "graphql";

import { UserType } from "..";
import { createClientAdminUser } from "../services";

const CreateClientAdminUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    clientId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { clientId, email, fullName }) => {
    return createClientAdminUser(clientId, email, fullName);
  },
};

export default CreateClientAdminUser;
