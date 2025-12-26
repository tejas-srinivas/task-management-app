import { client } from "@prisma/client";
import { getPrismaInstance } from "datasources/prisma";
import { ClientEntity, ClientsEntity } from "interfaces/client";
import FailedOperationException from "utils/errors/failed-operation";
import { getEnumValue, getPageInfo } from "utils/misc";
import { v4 } from "uuid";
import ClientStatusEnumType from "../enums/client-status";
import InvalidOperationException from "utils/errors/invalid-operation";
import ResourceNotFoundException from "utils/errors/resource-not-found";

const prisma = getPrismaInstance();

const getClient = (id: string): Promise<ClientEntity | null> => {
  if(!id) throw new ResourceNotFoundException("Client not Found")
  return prisma.client.findUnique({
    where: {
      id,
    },
  });
};

const getClients = async (
  cursor?: string,
  limit?: number,
  filters?: { text?: string },
  sortBy: string = "createdAt",
  sortType: string = "DESC"
): Promise<ClientsEntity | []> => {
  const { text = "" } = filters || {};

  const where: any = {
    OR: [{ name: { contains: text, mode: 'insensitive' } }],
  };

  const result = await prisma.$transaction([
    prisma.client.count({
      where,
    }),
    prisma.client.findMany({
      skip: cursor ? 1 : 0,
      take: limit ? limit + 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: { [sortBy]: sortType.toLowerCase() },
    }),
  ]);

  const { resultSet, pageInfo } = getPageInfo(result, limit, cursor);

  return { clients: resultSet, pageInfo };
};

const createClientByAdmin = async (
  name: string,
  description: string
): Promise<client | null> => {
  if (!name || !description) {
    throw new InvalidOperationException(
      "Client name and project name fields are required"
    );
  }
  
  const existingClient = await prisma.client.findFirst({
    where: { name: { equals: name, mode: 'insensitive' } },
  });
  if (existingClient) {
    throw new InvalidOperationException("A client with this name already exists");
  }

  try {
    const client = await prisma.client.create({
      data: {
        id: v4(),
        name,
        description,
        status: getEnumValue(ClientStatusEnumType.getValue("ACTIVE")),
      },
    });
    return client;
  } catch (error) {
    console.error(error);
    throw new FailedOperationException("Failed to create client");
  }
};

const updateClientStatusByAdmin = async (clientId: string, status: string): Promise<client | null> => {
  if (!clientId) {
    throw new InvalidOperationException("Client ID is required");
  }
  try {
    const client = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        status: getEnumValue(ClientStatusEnumType.getValue(status)),
      },
    });
    return client;
  } catch (error) {
    console.error(error);
    throw new FailedOperationException("Failed to update client status");
  }
};

const updateClientInformation = async (clientId: string, name: string, description: string, status: string) => {
  if (!clientId) {
    throw new InvalidOperationException("Client ID is required");
  }
  try {
    const client = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        name,
        description,
        status,
      },
    });
    return client;
  } catch (error) {
    console.error(error);
    throw new FailedOperationException("Failed to update client information");
  }
};

export { getClient, getClients, createClientByAdmin, updateClientStatusByAdmin, updateClientInformation };
