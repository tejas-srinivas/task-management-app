import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { SortTypeEnumType, UserRoleEnumType } from '@/__generated__/graphql';
import { DataTable, ErrorAlert } from '@/components';
import Layout from '@/layouts/SidebarLayout';
import FilterBar from '@/primitives/FilterBar';

import { getUser } from '@/utils/auth';
import { formatStatus } from '@/utils/format-helpers';

import CreateBoardDialogButton from './CreateBoardDialogButton';

const GET_BOARDS_QUERY = gql(`
  query Boards($cursor: ID, $limit: Int, $filters: BoardFilterInputType, $sortBy: String, $sortType: SortTypeEnumType) {
    boards(cursor: $cursor, limit: $limit, filters: $filters, sortBy: $sortBy, sortType: $sortType) {
      nodes {
        id
        name
        client {
          name
        }
        status
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

export default function Boards() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const user = getUser();

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_BOARDS_QUERY, {
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
    if (error) return <ErrorAlert error={error} />;

    const boards = data?.boards.nodes ?? [];
    const pageInfo = data?.boards.pageInfo;

    return (
      <DataTable
        data={boards}
        columns={[
          { label: 'Board Name', fieldName: 'name', type: 'STRING' },
          { label: 'Client Name', fieldName: 'client.name', type: 'STRING' },
          {
            label: 'Status',
            fieldName: 'status',
            type: 'STRING',
            formatter: (status: string) => formatStatus(status.toUpperCase()),
          },
          { label: 'Created At', fieldName: 'createdAt', type: 'DATE' },
        ]}
        onClick={board => navigate(`/boards/${board.id}`)}
        filterLoading={loading}
        pagination={{
          ...pageInfo,
          onLoadMore: () =>
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
            }),
          totalCount: pageInfo?.totalCount,
          hasNextPage: pageInfo?.hasNextPage,
          loading: loading,
        }}
      />
    );
  }

  return (
    <Layout title="Task Boards" subtitle="Create and manage your project boards">
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search board"
          />
          {user.role === UserRoleEnumType.ClientAdmin && (
            <div className="flex items-center gap-4">
              <CreateBoardDialogButton clientId={user.clientId} />
            </div>
          )}
        </div>
        {renderContent()}
      </div>
    </Layout>
  );
}
