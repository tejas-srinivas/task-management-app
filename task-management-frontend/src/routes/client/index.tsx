import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { ClientType } from '@/__generated__/graphql';
import {
  DataTable,
  ErrorAlert,
  Loader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components';
import Layout from '@/layouts/SidebarLayout';

import { formatRole, formatStatus } from '@/utils/format-helpers';

import CreateBoardDialogButton from '../boards/CreateBoardDialogButton';
import CreateClientAdminDialogButton from './CreateClientAdminDialogButton';
import CreateMemberDialogButton from './CreateMemberDialogButton';
import UpdateClientInformation from './UpdateClientInformation';

const CLIENT_QUERY = gql(`
  query Client($clientId: ID!) {
    client(id: $clientId) {
      id
      name
      description
      status
      members {
        nodes {
          id
          fullName
          email
          role
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
      boards {
        nodes {
          id
          name
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
      createdAt
      updatedAt
    }
  }
`);

export default function Client() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('boards');

  const { id } = useParams<{ id: string }>();

  const { data, loading, error, fetchMore } = useQuery(CLIENT_QUERY, {
    variables: { clientId: id as string },
    fetchPolicy: 'cache-and-network',
  });

  const client = data?.client;
  const boards = client?.boards?.nodes ?? [];
  const members = client?.members?.nodes ?? [];

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (error || !client) {
    return (
      <Layout title="Client Not Found" subtitle="No client with this ID.">
        <div className="flex justify-center items-center">
          <ErrorAlert error={error} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={client.name} subtitle="Manage client">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="boards">Boards</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <div className="mt-8">
            <div className="flex items-baseline justify-between pb-0">
              <p className="mb-4 text-base font-semibold">Members</p>
              <div className="flex items-center gap-2">
                <CreateClientAdminDialogButton clientId={id as string} />
                <CreateMemberDialogButton clientId={id as string} />
              </div>
            </div>
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
                {
                  label: 'Status',
                  fieldName: 'status',
                  type: 'STRING',
                  formatter: (status: string) => formatStatus(status?.toUpperCase?.() || ''),
                },
                { label: 'Created At', fieldName: 'createdAt', type: 'DATE' },
                { label: 'Updated At', fieldName: 'updatedAt', type: 'DATE' },
              ]}
              onClick={member => navigate(`/members/${member.id}`)}
              pagination={{
                ...client?.members?.pageInfo,
                loading: loading,
                onLoadMore: () => {
                  fetchMore({
                    variables: {
                      cursor: client?.members?.pageInfo?.cursor,
                    },
                  });
                },
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="boards">
          <div className="mt-8">
            <div className="flex items-baseline justify-between pb-0">
              <p className="mb-4 text-base font-semibold">Boards</p>
              <CreateBoardDialogButton clientId={id as string} />
            </div>{' '}
            <DataTable
              data={boards}
              columns={[
                { label: 'Board Name', fieldName: 'name', type: 'STRING' },
                {
                  label: 'Status',
                  fieldName: 'status',
                  type: 'STRING',
                  formatter: (status: string) => formatStatus(status?.toUpperCase?.() || ''),
                },
                { label: 'Created At', fieldName: 'createdAt', type: 'DATE' },
                { label: 'Updated At', fieldName: 'updatedAt', type: 'DATE' },
              ]}
              onClick={board => navigate(`/boards/${board.id}`)}
              pagination={{
                ...client?.boards?.pageInfo,
                loading: loading,
                onLoadMore: () => {
                  fetchMore({
                    variables: {
                      cursor: client?.boards?.pageInfo?.cursor,
                    },
                  });
                },
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-8">
          <UpdateClientInformation client={client as ClientType} />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
