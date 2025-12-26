import { useParams } from 'react-router';
import { toast } from 'sonner';

import { useMutation, useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { BoardStatusEnumType, UserRoleEnumType } from '@/__generated__/graphql';
import { ErrorAlert, FormInput, FormPanelWithReadMode, Loader } from '@/components';
import Layout from '@/layouts/SidebarLayout';

import { getUserRole } from '@/utils/auth';

import CloseBoardDialogButton from './CloseBoardDialogButton';

const GET_BOARD_INFORMATION = gql(`
    query BoardInformation($boardId: ID!) {
        board(id: $boardId) {
            id
            name
            description
            status
        }
    }
`);

const UPDATE_BOARD_INFORMATION = gql(`
    mutation UpdateBoardInformation($boardId: ID!, $name: String!, $description: String!) {
        updateBoardInformation(boardId: $boardId, name: $name, description: $description) {
            id
            name
            description
        }
    }
`);

export default function BoardSettings() {
  const role = getUserRole();
  const { id: boardId } = useParams<{ id: string }>();
  const {
    data,
    loading: boardInfoLoading,
    error: boardInfoError,
  } = useQuery(GET_BOARD_INFORMATION, {
    variables: {
      boardId: boardId as string,
    },
  });
  const [updateBoardInformation, { loading, error }] = useMutation(UPDATE_BOARD_INFORMATION, {
    onCompleted(data) {
      if (data.updateBoardInformation?.id) {
        return toast.success('Board Information updated successfully');
      }
    },
  });

  const board = data?.board;

  if (boardInfoLoading) return <Loader />;

  if (boardInfoError) return <ErrorAlert error={error} />;

  return (
    <Layout title="Board Settings" subtitle="Edit board details or close the board">
      <FormPanelWithReadMode
        title="Board"
        subTitle="Edit board information"
        loading={loading}
        error={error}
        onSubmit={data => {
          updateBoardInformation({
            variables: {
              boardId: boardId as string,
              name: data.name,
              description: data.description,
            },
          });
        }}
      >
        <FormInput
          type="text"
          fieldName="name"
          label="Board Name"
          defaultValue={board?.name || ''}
          validators={{ required: true }}
        />
        <FormInput
          type="textarea"
          fieldName="description"
          label="Board Description"
          defaultValue={board?.description || ''}
        />
      </FormPanelWithReadMode>
      {role !== UserRoleEnumType.Member && board?.status === BoardStatusEnumType.Active && (
        <div className="mt-8">
          <div className="mb-3 text-sm text-muted-foreground">
            <span className="font-semibold text-destructive">Warning:</span> Closing this board will
            remove access for all members and archive all its data. This action cannot be undone.
          </div>
          <CloseBoardDialogButton boardId={boardId as string} />
        </div>
      )}
    </Layout>
  );
}
