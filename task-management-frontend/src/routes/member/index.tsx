import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { UserRoleEnumType } from '@/__generated__/graphql';
import Layout from '@/layouts/SidebarLayout';

import { DetailsPanel } from '@/components/DetailsPanel';
import { ErrorAlert } from '@/components/ErrorAlert';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { formatRole, formatStatus } from '@/utils/format-helpers';

import DisableMemberDialogButton from './DisableMemberDialogButton';

const GET_USER_INFO = gql(`
  query UserInformation($userId: ID!) {
    user(id: $userId) {
      id
      fullName
      email
      role
      status
      client {
        id
        name
        boards {
          nodes {
            id
            name
            status
            createdAt
            updatedAt
          }
        }
      }
      hasAccessTo {
        nodes {
          board {
            id
            name
            status
            createdAt
            updatedAt
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`);

export default function Member() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('info');

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_USER_INFO, {
    variables: {
      userId: id as string,
    },
  });

  const member = data?.user;
  const client = member?.client;

  let boards;
  if (member?.role === UserRoleEnumType.ClientAdmin) {
    boards = member?.client?.boards?.nodes ?? [];
  } else {
    boards = member?.hasAccessTo?.nodes?.map(node => node?.board).filter(Boolean) ?? [];
  }

  if (loading) {
    return (
      <Layout title="Member" subtitle="">
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (error || !member || !boards) {
    return (
      <Layout title="Member" subtitle="Not found">
        <div className="flex justify-center items-center">
          <ErrorAlert error={error} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={member.fullName ?? 'Member'} subtitle={`${client?.name ?? 'Admin'}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="info">Infomation</TabsTrigger>
          <TabsTrigger value="boards">Boards</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <div className="mt-6">
            <DetailsPanel
              data={member}
              title="Member Information"
              subTitle={client?.name ?? 'Admin'}
              layout="grid"
              fields={[
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
                  formatter: (status: string) => formatStatus(status),
                },
                {
                  label: 'Client',
                  fieldName: 'client.name',
                  type: 'STRING',
                },
              ]}
            />
            <div className="mt-6">
              <div className="text-destructive mb-2">Member Visibility</div>
              <DisableMemberDialogButton userId={member.id} status={member.status} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="boards">
          <div className="max-w-2xl flex-1 space-y-4 mt-6">
            <h2 className="text-md font-medium mb-2">Boards Access</h2>
            {boards?.length === 0 && <div className="text-muted-foreground">No boards found.</div>}
            {boards?.map(board => (
              <Card
                key={board?.id}
                className="flex flex-row items-center justify-between p-4 bg-background shadow-none"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-base">{board?.name}</span>
                  <div className="flex items-center gap-2">
                    {formatStatus(board?.status as string)}
                  </div>
                </div>
                <Button size="sm" onClick={() => navigate(`/boards/${board?.id}`)}>
                  View Board
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
