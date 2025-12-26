import BoardMutationFields from './board/mutations';
import ClientMutationFields from './client/mutations';
import ListMutationFields from './list/mutations';
import TaskMutationFields from './task/mutations';
import UserMutationFields from './user/mutations';

const mutationFields = {
  ...UserMutationFields,
  ...ClientMutationFields,
  ...BoardMutationFields,
  ...ListMutationFields,
  ...TaskMutationFields,
};

export default mutationFields;
