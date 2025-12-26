import { useNavigate } from 'react-router';

import { useQuery } from '@apollo/client';

import { Avatar, Card, CardTitle, ErrorAlert, Loader, Tooltip } from '@/components';
import Layout from '@/layouts/SidebarLayout';

import { getUserRole } from '@/utils/auth';

import { gql } from '../../__generated__/gql';
import { labelToLink, statConfig } from './StatsConfig';

const DASHBOARD_STATS_QUERY = gql(`
  query DashboardQuery {
    dashboard {
      boardCount
      memberCount
      clientCount
      taskCount
      completedTaskCount
      pendingTaskCount
      immediatePriorityTaskCount
      highPriorityTaskCount
    }
  }
`);

export default function Dashboard() {
  const userRole = getUserRole();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(DASHBOARD_STATS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  function renderContent() {
    if (loading)
      return (
        <div className="flex items-center justify-center m-auto h-full">
          <Loader />
        </div>
      );
    if (error || !data) return <ErrorAlert error={error} />;

    const filteredStatConfig = statConfig.filter(stat => {
      if (stat.label === 'Clients') {
        return userRole === 'SUPER_ADMIN';
      }
      if (stat.label === 'Members') {
        return userRole !== 'MEMBER';
      }
      return true;
    });

    const stats = filteredStatConfig.map(stat => ({
      ...stat,
      value: data?.dashboard?.[stat.key as keyof typeof data.dashboard] ?? 0,
    }));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {stats.map(stat => (
          <Card
            key={stat.label}
            className="p-4 flex flex-col justify-between bg-background shadow-none cursor-pointer"
            onClick={() => navigate(labelToLink[stat.label])}
          >
            <div className="flex items-center gap-4">
              <Avatar
                className={`${stat.color} p-2 rounded-lg w-12 h-12 flex items-center justify-center`}
              >
                <stat.icon className="w-7 h-7" />
              </Avatar>
              <Tooltip>
                <span>{stat.label}</span>
              </Tooltip>
            </div>
            <div className="flex items-center justify-between px-4">
              <CardTitle className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                {stat.value}
              </CardTitle>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Layout title="Dashboard" subtitle="Welcome to the dashboard">
      {renderContent()}
    </Layout>
  );
}
