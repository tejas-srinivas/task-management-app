import { ListEntity } from "./list";
import { UserEntity } from "./user";

export interface BoardEntity {
  id: string;
  name: string;
  projectName: string;
  createdAt: string; 
  updatedAt: string;
  clientId: string;
  lists?: ListEntity[];
  members?: UserEntity[];
}

export interface BoardsEntity {
  boards: BoardEntity[];
  pageInfo: {
    cursor?: string;
    hasNextPage?: boolean;
    totalCount?: number;
  };
}