import { BoardEntity } from "./board";
import { UsersEntity } from "./user";

interface ClientEntity {
  id: string;
  name: string;
  projectName: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  users?: UsersEntity[];
  boards?: BoardEntity[];
}

interface ClientsEntity {
  clients: ClientEntity[];
  pageInfo: {
    cursor?: string;
    hasNextPage?: boolean;
    totalCount?: number;
  };
}

export { ClientEntity, ClientsEntity }; 