import AcceptUserInvite from './accept-user-invite';
import ForgotPassword from './forgot-password';
import Login from './login';
import Signup from './signup';
import UpdateUserRole from './update-user-role';
import UpdateUserStatus from './update-user-status';
import RemoveUser from './remove-user';
import ResetPassword from './reset-password';
import CreateUser from './create-user';
import createClientAdminUser from './create-client-admin';
import CreateMemberUser from './create-member';

const UserMutationFields = {
  login: Login,
  signup: Signup,
  createUser: CreateUser,
  createClientAdminUser: createClientAdminUser,
  createMemberUser: CreateMemberUser,
  acceptUserInvite: AcceptUserInvite,
  forgotPassword: ForgotPassword,
  resetPassword: ResetPassword,
  updateUserStatus: UpdateUserStatus,
  updateUserRole: UpdateUserRole,
  removeUser: RemoveUser,
};

export default UserMutationFields;
