import { GraphQLNonNull, GraphQLString } from "graphql";

import { ClientType } from "..";
import { createClientByAdmin } from "../services";

const CreateClientByAdmin = {
  type: ClientType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { name, description }) => {
    return createClientByAdmin(name, description);
  },
};

export default CreateClientByAdmin;
