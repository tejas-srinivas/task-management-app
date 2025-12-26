import { Handshake, Home, Settings, SquareKanban, Users } from 'lucide-react';

import { UserRoleEnumType } from '@/__generated__/graphql';

import { getUserRole } from '@/utils/auth';

export const sideBarTitle = 'Task Tracker';
export const sidebarSubtitle = 'Task Management System';

export function getSidebarItems() {
  const userRole = getUserRole();

  return [
    {
      title: 'Dashboard',
      url: '/',
      icon: <Home />,
    },
    ...(userRole === UserRoleEnumType.SuperAdmin
      ? [
          {
            title: 'Clients',
            url: '/clients',
            icon: <Handshake />,
          },
        ]
      : []),
    {
      title: 'Boards',
      url: '/boards',
      icon: <SquareKanban />,
    },
    ...([UserRoleEnumType.ClientAdmin].includes(userRole)
      ? [
          {
            title: 'Members',
            url: '/members',
            icon: <Users />,
          },
        ]
      : []),
    {
      title: 'Settings',
      url: '/settings',
      icon: <Settings />,
    },
  ];
}

export default getSidebarItems;
