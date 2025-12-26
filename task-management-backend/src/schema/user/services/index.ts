import { user } from "@prisma/client";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { v4 } from "uuid";
import { getPrismaInstance } from "datasources/prisma";
import UserAuthException from "utils/errors/userAuthException";
import {
  generateAccessToken,
  generateUserInviteToken,
  verifyToken,
} from "utils/jwt";
import hashPassword, { getEnumValue, getPageInfo } from "utils/misc";
import { sendEmail, templates } from "utils/sendgrid";
import UserStatusEnumType from "../enums/user-status";
import AuthenticationError from "utils/errors/authentication-error";
import bcrypt from "bcrypt";
import UserRoleEnumType from "../enums/user-role";
import { UserEntity, UsersEntity } from "interfaces/user";
import FailedOperationException from "utils/errors/failed-operation";
import UserException from "utils/errors/userException";

const prisma = getPrismaInstance();

const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new UserAuthException("User not found");
  }

  if (user.status !== getEnumValue(UserStatusEnumType.getValue("ACTIVE"))) {
    throw new UserException("This user is not an active user");
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = generateAccessToken(user);
    return {
      token,
      user,
    };
  } else {
    throw new UserAuthException("Invalid password");
  }
};

const signup = async (email: string, password: string, fullName: string) => {
  // Create a new user with a linked person record
  const user = await prisma.user.create({
    data: {
      id: v4(),
      email,
      fullName,
      password: await bcrypt.hash(password, 10),
      role: getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN")),
      status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
    },
  });

  const token = generateAccessToken(user);
  return {
    token,
    user,
  };
};

const createClientAdminUser = async (
  clientId: string,
  email: string,
  fullName: string
) => {
  if (!email || !fullName)
    throw new FailedOperationException("Email and FullName are required");

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new FailedOperationException("A user with this email already exists");
  }

  const user = await prisma.user.create({
    data: {
      id: v4(),
      email,
      fullName,
      clientId,
      password: await bcrypt.hash("password", 10),
      role: getEnumValue(UserRoleEnumType.getValue("CLIENT_ADMIN")),
      status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
    },
  });
  return user;
};

const createMemberUser = async (
  clientId: string,
  email: string,
  fullName: string
) => {
  if (!email || !fullName)
    throw new FailedOperationException("Email and FullName are required");

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new FailedOperationException("A user with this email already exists");
  }

  const user = await prisma.user.create({
    data: {
      id: v4(),
      email,
      fullName,
      clientId,
      password: await bcrypt.hash("password", 10),
      role: getEnumValue(UserRoleEnumType.getValue("MEMBER")),
      status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
    },
  });
  return user;
};

const acceptUserInviteAndSetPassword = async (inviteToken, password) => {
  // validate invite token
  const inviteDetails = verifyToken(inviteToken);
  if (!inviteDetails) {
    throw new UserAuthException("Invalid invite token");
  }

  const updatedUserDetails = await prisma.user.update({
    where: {
      id: inviteDetails.id,
    },
    data: {
      status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
      password: hashPassword(password),
    },
  });
  return {
    token: generateAccessToken(updatedUserDetails),
    user: updatedUserDetails,
  };
};

const forgotPassword = async (emailId: string, callBackUrl: string) => {
  const userDetails = await getUserByEmail(emailId);
  if (!userDetails) {
    throw new UserAuthException("Invalid Email address");
  }

  await sendForgotPasswordToken(userDetails, callBackUrl);
  return {
    status: true,
    message: "Password reset email sent successfully.",
  };
};

const sendForgotPasswordToken = async (user: user, callBackUrl: string) => {
  const passwordResetToken = generateUserInviteToken(user);

  // Get the person's name if available
  let userName = user.email;

  await sendEmail({
    receiver: user.email,
    format: templates.FORGOT_PASSWORD,
    templateData: {
      user: userName,
      value: `${callBackUrl}/${user.id}?token=${passwordResetToken}`,
    },
  });
};

const resetPassword = async (email: string, oldPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { client: true },
  });

  if (!user) {
    throw new UserAuthException("User not found");
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    throw new UserAuthException("Invalid old password");
  }

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: await bcrypt.hash(newPassword, 10),
    },
  });

  return {
    status: true,
    message: "Password changed successfully.",
  };
};

const getUserByEmail = (email: string): Promise<user | null> => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const getUser = (id: string): Promise<user | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const getUsers = async (
  currentUser: user,
  cursor?: string,
  limit?: number,
  filters?: { text?: string; status?: number; clientId?: string },
  sortBy: string = "createdAt",
  sortType: string = "DESC"
): Promise<UsersEntity | null> => {
  const { text = "", status, clientId } = filters || {};
  const userRole = await getUserRole(currentUser.id);
  const where: any = {
    OR: [{ fullName: { contains: text, mode: "insensitive" } }],
    status,
  };

  if (userRole !== getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN"))) {
    where.clientId = currentUser.clientId;
  } else if (
    userRole === getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN"))
  ) {
    where.clientId = clientId;
  }

  const result = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({
      skip: cursor ? 1 : 0,
      take: limit ? limit + 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: { [sortBy]: sortType.toLowerCase() },
    }),
  ]);

  const { resultSet, pageInfo } = getPageInfo(result, limit, cursor);

  return { users: resultSet, pageInfo };
};

const getSuperAdmins = async () : Promise<UsersEntity | null> => {
  return await prisma.user.findMany({
    where: {
    role: getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN")),
    status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
  },
    orderBy: { createdAt: "desc" },
  });
};

const getClientAdmins = async (clientId: string): Promise<UserEntity[] | null> => {
  return await prisma.user.findMany({
    where: {
      clientId,
      role: getEnumValue(UserRoleEnumType.getValue("CLIENT_ADMIN")),
      status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
    },
    orderBy: { createdAt: "desc" },
  });
};

const getClientMembers = async (
  clientId: string,
  cursor?: string,
  limit?: number,
  filters?: { text?: string; },
  sortBy: string = "createdAt",
  sortType: string = "DESC"
): Promise<UsersEntity | null> => {
  const { text = "" } = filters || {};
  //clientId for Admin
  const isSpecialClient = clientId === "80ca8506-4e52-49a9-90e8-c826ec55dd92";
  
  const whereClause = {
    ...(isSpecialClient ? {} : { clientId }),
    OR: [{ fullName: { contains: text } }],
    status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
    role: isSpecialClient ? getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN")) : undefined
  };
  
  const result = await prisma.$transaction([
    prisma.user.count({
      where: whereClause,
    }),
    prisma.user.findMany({
      skip: cursor ? 1 : 0,
      take: limit ? limit + 1 : undefined,
      cursor: cursor ? { id: cursor } : undefined,
      where: whereClause,
      orderBy: { [sortBy]: sortType.toLowerCase() },
    }),
  ]);

  const { resultSet, pageInfo } = getPageInfo(result, limit, cursor);

  return { users: resultSet, pageInfo };
};

const authenticateUser = async (request): Promise<user | null> => {
  if (request?.headers?.authorization) {
    const [type, token] = request.headers.authorization.split(" ");
    if (type === "Bearer") {
      try {
        const tokenPayload = verifyToken(token) as JwtPayload;
        const userId = tokenPayload.userId;
        return await prisma.user.findUnique({ where: { id: userId } });
      } catch (error) {
        if (
          error instanceof JsonWebTokenError ||
          error instanceof TokenExpiredError
        ) {
          throw new AuthenticationError(
            "User is not authenticated. Session token is Invalid"
          );
        } else {
          throw new AuthenticationError(
            "User is not authenticated. Session token verification failed"
          );
        }
      }
    }
  }

  return null;
};

const getUserRole = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user?.role;
};

const updateUserStatus = async (userId: string, status: number) => {
  if(status === getEnumValue(UserStatusEnumType.getValue("INACTIVE"))) {
    await prisma.board_member.deleteMany({
      where: { userId },
    });
  }
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
  });
};

const updateUserRole = async (userId: string, role: number) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role,
    },
  });
};

const removeUser = async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

const createUser = async (
  email: string,
  password: string,
  fullName: string
) => {
  if (!email || !fullName)
    throw new FailedOperationException("Email and FullName are required");

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new FailedOperationException("A user with this email already exists");
  }

  return prisma.user.create({
    data: {
      id: v4(),
      email,
      password: await bcrypt.hash(password, 10),
      fullName,
      status: getEnumValue(UserStatusEnumType.getValue("ACTIVE")),
      role: getEnumValue(UserRoleEnumType.getValue("MEMBER")),
    },
  });
};

const isUserBoardMember = async (userId: string, boardId: string): Promise<boolean> => {
  const isMember = await prisma.board_member.findFirst({
    where: {
      boardId,
      userId,
    },
  });
  return !!isMember;
};

const getMemberBoards = async (userId: string) => {
  return await prisma.board_member.findMany({
    where: {
      userId,
      user: {
        status: getEnumValue(UserStatusEnumType.getValue("ACTIVE"))
      }
    },
  });
}

export {
  login,
  signup,
  createUser,
  createClientAdminUser,
  createMemberUser,
  acceptUserInviteAndSetPassword,
  forgotPassword,
  resetPassword,
  getUserByEmail,
  getUser,
  getUsers,
  getClientMembers,
  authenticateUser,
  getUserRole,
  updateUserStatus,
  updateUserRole,
  removeUser,
  isUserBoardMember,
  getMemberBoards,
  getSuperAdmins,
  getClientAdmins,
};
