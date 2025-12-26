import { PrismaClient } from '@prisma/client';

let client;
export const getPrismaInstance = () => {
  if (!client) {
    client = new PrismaClient({
      log: ['info'],
    });
  }
  return client;
};
