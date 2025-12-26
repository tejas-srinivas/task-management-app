import { and, deny, or, rule } from "graphql-shield";
import { shield } from "graphql-shield";
import { GraphQLError } from "graphql";

import UserRoleEnumType from "schema/user/enums/user-role";
import { getUserRole, isUserBoardMember } from "schema/user/services";
import { getEnumValue } from "utils/misc";
import { createRateLimitRule } from "graphql-rate-limit";
import UserStatusEnumType from "schema/user/enums/user-status";

const rateLimitRule = createRateLimitRule({ identifyContext: (ctx) => ctx.id });
const rateLimitRule2s = rateLimitRule({
  window: "1s",
  max: 20,
});

const applyRateLimit = (permissions) => {
  const modifiedPermissions = {};
  for (const field in permissions) {
    modifiedPermissions[field] = and(permissions[field], rateLimitRule2s);
  }
  return modifiedPermissions;
};

const isAuthenticated = rule({ cache: "contextual" })(async (
  _root,
  _args,
  context,
  _info
) => {
  const { currentUser } = context;
  if (currentUser && currentUser.email) return true;

  return new GraphQLError("Unauthenticated", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  });
});

const isSuperAdmin = rule({ cache: "contextual" })(async (
  _root,
  _args,
  context,
  _info
) => {
  try {
    const { currentUser } = context;
    const userRole = await getUserRole(currentUser.id);

    if (userRole === getEnumValue(UserRoleEnumType.getValue("SUPER_ADMIN")))
      return true;
  } catch (error) {
    // If the above is false or if currentUser is null we can proceed to raise an error
  }

  return new GraphQLError(
    "You do not have the necessary permissions to view or perform this action",
    {
      extensions: {
        code: "FORBIDDEN",
      },
    }
  );
});

const isClientAdmin = rule({ cache: "contextual" })(async (
  _root,
  _args,
  context,
  _info
) => {
  try {
    const { currentUser } = context;
    const userRole = await getUserRole(currentUser.id);

    if (
      userRole === getEnumValue(UserRoleEnumType.getValue("CLIENT_ADMIN")) &&
      currentUser.status === getEnumValue(UserStatusEnumType.getValue("ACTIVE"))
    )
      return true;
  } catch (error) {
    // If the above is false or if currentUser is null we can proceed to raise an error
  }

  return new GraphQLError(
    "You do not have the necessary permissions to view or perform this action",
    {
      extensions: {
        code: "FORBIDDEN",
      },
    }
  );
});

const isBoardMember = rule({ cache: "contextual" })(async (
  _root,
  args,
  context,
  _info
) => {
  try {
    const { currentUser } = context;
    const userRole = await getUserRole(currentUser.id);
    if (
      userRole !== getEnumValue(UserRoleEnumType.getValue("MEMBER")) &&
      currentUser.status === getEnumValue(UserStatusEnumType.getValue("ACTIVE"))
    ) {
      return new GraphQLError(
        "You do not have the necessary permissions to view or perform this action",
        {
          extensions: {
            code: "FORBIDDEN",
          },
        }
      );
    }

    const boardId = args.id || args.boardId;
    if (!boardId) {
      return new GraphQLError("Board ID is required to check membership", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }
    const isMember = await isUserBoardMember(currentUser.id, boardId);
    if (isMember) return true;
    return new GraphQLError(
      "You do not have permission to view this board, contact your admin for access.",
      {
        extensions: {
          code: "FORBIDDEN",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new GraphQLError(
      "You do not have the necessary permissions to view or perform this action",
      {
        extensions: {
          code: "FORBIDDEN",
        },
      }
    );
  }
});

const isMember = rule({ cache: "contextual" })(async (
  _root,
  _args,
  context,
  _info
) => {
  try {
    const { currentUser } = context;
    const userRole = await getUserRole(currentUser.id);

    if (
      userRole === getEnumValue(UserRoleEnumType.getValue("MEMBER")) &&
      currentUser.status === getEnumValue(UserStatusEnumType.getValue("ACTIVE"))
    )
      return true;
  } catch (error) {
    // If the above is false or if currentUser is null we can proceed to raise an error
  }

  return new GraphQLError(
    "You do not have the necessary permissions to view or perform this action",
    {
      extensions: {
        code: "FORBIDDEN",
      },
    }
  );
});

const allowByDefault = rule({ cache: "contextual" })(async (
  _root,
  _args,
  _context,
  _info
) => {
  return true;
});

const isSelf = rule({ cache: "contextual" })(async (
  _root,
  args,
  context,
  _info
) => {
  const { user } = context;
  if (args && (args.id || args.userId) == user.id) return true;
  return false;
});

const queryFields = {
  me: or(isAuthenticated),
  user: or(isSelf, isClientAdmin, isSuperAdmin),
  users: or(isClientAdmin, isSuperAdmin),
  superAdmins: or(isBoardMember, isClientAdmin, isSuperAdmin),

  dashboard: or(isMember, isBoardMember, isClientAdmin, isSuperAdmin),

  client: or(isClientAdmin, isSuperAdmin),
  clients: or(isSuperAdmin),

  board: or(isBoardMember, isClientAdmin, isSuperAdmin),
  boards: or(isMember, isBoardMember, isClientAdmin, isSuperAdmin),

  list: or(isBoardMember, isClientAdmin, isSuperAdmin),
  lists: or(isBoardMember, isClientAdmin, isSuperAdmin),

  task: or(isBoardMember, isClientAdmin, isSuperAdmin),
  tasks: or(isBoardMember, isClientAdmin, isSuperAdmin),
};

const mutationFields = {
  updateUserRole: or(isClientAdmin, isSuperAdmin),
  updateUserStatus: or(isClientAdmin, isSuperAdmin),
  removeUser: or(isSuperAdmin),
  createClientAdminUser: or(isClientAdmin, isSuperAdmin),
  createMemberUser: or(isClientAdmin, isSuperAdmin),

  createClientByAdmin: or(isSuperAdmin),
  updateClientInformation: or(isSuperAdmin),

  createBoard: or(isClientAdmin, isSuperAdmin),
  updateBoardName: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateBoardMembers: or(isClientAdmin, isSuperAdmin),

  createList: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateListName: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateListPosition: or(isBoardMember, isClientAdmin, isSuperAdmin),
  deleteList: or(isBoardMember, isClientAdmin, isSuperAdmin),

  createTask: or(isBoardMember, isClientAdmin, isSuperAdmin),
  createTaskChecklistItem: or(isBoardMember, isClientAdmin, isSuperAdmin),
  createTaskComment: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskName: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskDescription: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskAssignees: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskDueDate: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskStatus: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskTags: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskPriority: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskPositionInList: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskChecklistStatus: or(isBoardMember, isClientAdmin, isSuperAdmin),
  changeTaskList: or(isBoardMember, isClientAdmin, isSuperAdmin),
  changeTaskListWithPosition: or(isBoardMember, isClientAdmin, isSuperAdmin),
  updateTaskComment: or(isBoardMember, isClientAdmin, isSuperAdmin),
  deleteTaskComment: or(isBoardMember, isClientAdmin, isSuperAdmin),
};

const servicePermissions = shield(
  {
    Query: applyRateLimit(queryFields),
    Mutation: applyRateLimit(mutationFields),
  },
  { allowExternalErrors: true }
);

const servicePermissionsWithAllEnabled = shield(
  {
    Query: {
      "*": allowByDefault,
    },
    Mutation: {
      "*": allowByDefault,
    },
  },
  { allowExternalErrors: true }
);

const servicePermissionsWithAllDisabled = shield(
  {
    Query: {
      "*": deny,
    },
    Mutation: {
      "*": deny,
    },
  },
  { allowExternalErrors: false }
);

export {
  servicePermissions,
  servicePermissionsWithAllEnabled,
  servicePermissionsWithAllDisabled,
};
