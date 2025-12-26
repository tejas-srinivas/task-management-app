import { TaskEntity } from './task';

interface ListEntity {
  id: string;
  name: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  tasks?: TaskEntity[];
}

export {
  ListEntity,
}; 