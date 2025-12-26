import {
  CreateTask,
  CreateTaskComment,
  CreateTaskChecklistItem,
  UpdateTaskName,
  UpdateTaskDueDate,
  UpdateTaskTags,
  UpdateTaskPriority,
  UpdateTaskPositionInList,
  ChangeTaskList,
  UpdateTaskDescription,
  UpdateTaskChecklistStatus,
  UpdateTaskAssignees,
  UpdateTaskStatus,
  ChangeTaskListWithPosition,
  UpdateTaskComment,
  DeleteTaskComment,
} from "./task-mutations";

const TaskMutationFields = {
  createTask: CreateTask,
  createTaskComment: CreateTaskComment,
  createTaskChecklistItem: CreateTaskChecklistItem,
  updateTaskName: UpdateTaskName,
  updateTaskDueDate: UpdateTaskDueDate,
  updateTaskTags: UpdateTaskTags,
  updateTaskPriority: UpdateTaskPriority,
  updateTaskPositionInList: UpdateTaskPositionInList,
  changeTaskList: ChangeTaskList,
  updateTaskDescription: UpdateTaskDescription,
  updateTaskStatus: UpdateTaskStatus,
  updateTaskChecklistStatus: UpdateTaskChecklistStatus,
  updateTaskAssignees: UpdateTaskAssignees,
  changeTaskListWithPosition: ChangeTaskListWithPosition,
  updateTaskComment: UpdateTaskComment,
  deleteTaskComment: DeleteTaskComment,
};

export default TaskMutationFields;
