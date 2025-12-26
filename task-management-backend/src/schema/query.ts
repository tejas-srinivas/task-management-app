import UserQueryFields from './user/query';
import ClientQueryFields from './client/queries';
import BoardQueryFields from './board/queries';
import ListQueryFields from './list/queries';
import TaskQueryFields from './task/queries';

const queryFields = {
  ...UserQueryFields,
  ...ClientQueryFields,
  ...BoardQueryFields,
  ...ListQueryFields,
  ...TaskQueryFields,
};

export default queryFields;
