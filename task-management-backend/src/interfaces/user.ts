import { ClientEntity } from "./client";
import { CommentEntity, TaskEntity } from "./task";

interface UserEntity {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: number;
  status: number;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  client?: ClientEntity;
  assignedTasks?: TaskEntity[];
  boardMembers?: UserEntity[];
  comments?: CommentEntity[];
  // boardInvitesSent?: any[];
}

interface UserSessionEntity {
  id: string;
  token: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UsersEntity {
  users;
  pageInfo;
}

export { UserEntity, UsersEntity, UserSessionEntity };
