import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { SortTypeEnumType } from '@/__generated__/graphql';
import Layout from '@/layouts/SidebarLayout';
import FilterBar from '@/primitives/FilterBar';

import { DataTable } from '@/components/DataTable';
import { ErrorAlert } from '@/components/ErrorAlert';

import { formatStatus } from '@/utils/format-helpers';

import CreateClientDialogButton from './CreateClientDialogButton';

const CLIENTS_QUERY = gql(`
  query Clients($cursor: ID, $limit: Int, $filters: ClientFilterInputType, $sortBy: String, $sortType: SortTypeEnumType) {
    clients(cursor: $cursor, limit: $limit, filters: $filters, sortBy: $sortBy, sortType: $sortType) {
      nodes {
        id
        name
        description
        status
        createdAt
        updatedAt
      }
      pageInfo {
        cursor
        hasNextPage
        totalCount
      }
    }
  }
`);

export default function Clients() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error, refetch, fetchMore } = useQuery(CLIENTS_QUERY, {
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

    const clients = data?.clients.nodes ?? [];
    const pageInfo = data?.clients.pageInfo;

    return (
      <DataTable
        data={clients}
        columns={[
          { label: 'Client Name', fieldName: 'name', type: 'STRING' },
          { label: 'Client Description', fieldName: 'description', type: 'STRING' },
          {
            label: 'Status',
            fieldName: 'status',
            type: 'STRING',
            formatter: (status: string) => formatStatus(status.toUpperCase()),
          },
          { label: 'Created At', fieldName: 'createdAt', type: 'DATE' },
          { label: 'Updated At', fieldName: 'updatedAt', type: 'DATE' },
        ]}
        onClick={client => navigate(`/clients/${client.id}`)}
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
          loading: loading,
        }}
      />
    );
  }

  return (
    <Layout title="Clients" subtitle="List of Admin's Clients">
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search member"
          />
          <div className="flex items-center gap-4">
            <CreateClientDialogButton />
          </div>
        </div>
        {renderContent()}
      </div>
    </Layout>
  );
}
