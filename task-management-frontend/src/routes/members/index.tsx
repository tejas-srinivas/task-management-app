import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { SortTypeEnumType, UserRoleEnumType } from '@/__generated__/graphql';
import Layout from '@/layouts/SidebarLayout';
import FilterBar from '@/primitives/FilterBar';

import { DataTable } from '@/components/DataTable';
import { ErrorAlert } from '@/components/ErrorAlert';

import { getUserRole } from '@/utils/auth';
import { formatRole, formatStatus } from '@/utils/format-helpers';

import CreateClientAdminDialogButton from './CreateClientAdminDialogButton';
import CreateMemberDialogButton from './CreateMemberDialogButton';

const GET_MEMBERS_QUERY = gql(`
  query Members($cursor: ID, $limit: Int, $filters: UserFilterInputType, $sortBy: String, $sortType: SortTypeEnumType) {
    users(cursor: $cursor, limit: $limit, filters: $filters, sortBy: $sortBy, sortType: $sortType) {
      nodes {
        id
        fullName
        email
        role
        status
        client {
          name
        }
        createdAt
        updatedAt
      }
      pageInfo {
        cursor
        totalCount
        hasNextPage
      }
    }
  } 
`);

export default function Members() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const userRole = getUserRole();

  const {
    data: membersData,
    loading: membersLoading,
    error: membersError,
    refetch,
    fetchMore,
  } = useQuery(GET_MEMBERS_QUERY, {
    variables: {
      limit: 10,
      sortBy: 'createdAt',
      sortType: SortTypeEnumType.Descending,
      filters: {
        text: searchQuery || undefined,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  function renderContent() {
    if (membersError) return <ErrorAlert error={membersError} />;

    const members = membersData?.users.nodes || [];
    const pageInfo = membersData?.users.pageInfo;

    return (
      <DataTable
        data={members}
        columns={[
          { label: 'Name', fieldName: 'fullName', type: 'STRING' },
          { label: 'Email', fieldName: 'email', type: 'STRING' },
          {
            label: 'Role',
            fieldName: 'role',
            type: 'STRING',
            formatter: (role: string) => formatRole(role),
          },
          ...(userRole !== UserRoleEnumType.ClientAdmin
            ? [{ label: 'Client', fieldName: 'client.name', type: 'STRING' as const }]
            : []),
          {
            label: 'Status',
            fieldName: 'status',
            type: 'STRING' as const,
            formatter: (status: string) => formatStatus(status.toUpperCase()),
          },
          { label: 'Created At', fieldName: 'createdAt', type: 'DATE' },
          { label: 'Updated At', fieldName: 'updatedAt', type: 'DATE' },
        ]}
        onClick={member => navigate(`/members/${member.id}`)}
        pagination={{
          onLoadMore: () => {
            fetchMore({
              variables: {
                cursor: pageInfo?.cursor,
                limit: 10,
                sortBy: 'createdAt',
                sortType: SortTypeEnumType.Descending,
                filters: {
                  text: searchQuery || undefined,
                },
              },
            });
          },
          totalCount: pageInfo?.totalCount,
          hasNextPage: pageInfo?.hasNextPage,
          loading: membersLoading,
        }}
      />
    );
  }

  return (
    <Layout title="Workspace Members" subtitle="Manage your team members">
      <div className="mt-6">
        <div className="flex flex-row gap-2 justify-between sm:gap-4 mb-4 items-center">
          <div className="flex items-center gap-4">
            <FilterBar
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search member"
            />
          </div>
          {[UserRoleEnumType.ClientAdmin].includes(userRole) && (
            <div className="flex items-center justify-end gap-2">
              <CreateClientAdminDialogButton />
              <CreateMemberDialogButton />
            </div>
          )}
        </div>
        {renderContent()}
      </div>
    </Layout>
  );
}
