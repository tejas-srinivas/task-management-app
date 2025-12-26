import { GraphQLEnumType } from 'graphql';

const TaskPriorityEnumType = new GraphQLEnumType({
  name: 'TaskPriorityEnumType',
  values: {
    NOT_SET: { value: 0 },
    IMMEDIATE: { value: 1 },
    HIGH: { value: 2 },
    MEDIUM: { value: 3 },
    LOW: { value: 4 },
  },
});

export default TaskPriorityEnumType;
