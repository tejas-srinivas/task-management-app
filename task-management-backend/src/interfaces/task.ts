interface AttachmentEntity {
  id: string;
  url: string;
  name: string;
  type: string;
  taskId: string;
  createdAt: string;
  updatedAt: string;
}

interface ChecklistItemEntity {
  id: string;
  label: string;
  value: string;
  taskId: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskAssigneeEntity {
  id: string;
  taskId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentEntity {
  id: string;
  authorId: string;
  text: string;
  taskId: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskEntity {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  position: number;
  listId: string;
  tags: string[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  attachments?: AttachmentEntity[];
  checklist?: ChecklistItemEntity[];
  assignees?: TaskAssigneeEntity[];
  comments?: CommentEntity[];
}

export {
  AttachmentEntity,
  ChecklistItemEntity,
  TaskAssigneeEntity,
  CommentEntity,
  TaskEntity,
}; 