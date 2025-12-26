import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";

import { ClientType } from "..";
import { updateClientInformation } from "../services";
import ClientStatusEnumType from "../enums/client-status";
// import ClientStatusEnumType from "../enums/client-status";

const UpdateClientInformation = {
  type: ClientType,
  args: {
    clientId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(ClientStatusEnumType) },
  },
  resolve: async (_root, { clientId, name, description, status }) => {
    return updateClientInformation(clientId, name, description, status);
  },
};

export default UpdateClientInformation;
