import { Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { UserRoleEnumType } from '@/__generated__/graphql';
import CheckboxGroup from '@/primitives/CheckboxGroup';
import TextField from '@/primitives/TextField';

import { ErrorAlert } from '@/components/ErrorAlert';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useBoard } from '../BoardContext/useBoard';

const GET_CLIENT_MEMBERS = gql(`
  query ClientMembers($clientId: ID!) {
    client(id: $clientId) {
      members {
        nodes {
          id
          fullName
          role
        }
      }
    }
  }
`);

const UPDATE_BOARD_MEMBERS = gql(`
  mutation UpdateBoardMembers($boardId: ID!, $userIds: [ID!]!) {
    updateBoardMembers(boardId: $boardId, userIds: $userIds) {
      id
      invitedByUser {
        id
        fullName
      }
      user {
        id
        fullName
      }
      createdAt
      updatedAt
    }
  }
`);

export default function GiveAccessDropdown() {
  const { board } = useBoard();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const { data, loading, error } = useQuery(GET_CLIENT_MEMBERS, {
    variables: {
      clientId: board?.client?.id as string,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (board?.boardMembers && board.boardMembers.length > 0) {
      setSelected(board.boardMembers.map(m => m.user.id));
    } else {
      setSelected([]);
    }
  }, [board?.boardMembers]);

  const [
    updateBoardMembers,
    { loading: updateBoardMembersLoading, error: updateBoardMembersError },
  ] = useMutation(UPDATE_BOARD_MEMBERS);

  const members = data?.client.members?.nodes;

  // filtering with super_admin only for ToyStack Board
  const filteredMembers = members?.filter(
    m =>
      ((m.fullName as string).toLowerCase().includes(search.toLowerCase()) &&
        m.role === UserRoleEnumType.Member) ||
      m.role === UserRoleEnumType.SuperAdmin
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" /> Give Access To
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader />
          </div>
        ) : error ? (
          <ErrorAlert error={error} />
        ) : (
          <>
            <span className="text-xs text-muted-foreground mb-2 flex justify-center">
              Members who has access to the board
            </span>
            <TextField
              value={search}
              onChange={val => setSearch(String(val))}
              placeholder="Search members"
              className="mb-2"
            />
            <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
              {filteredMembers?.length === 0 ? (
                <div className="text-muted-foreground text-center py-4">No members found</div>
              ) : (
                <div className="ml-2">
                  <CheckboxGroup
                    value={selected}
                    onChange={setSelected}
                    options={
                      filteredMembers?.map(member => ({
                        label: member.fullName as string,
                        value: member.id as string,
                      })) as { label: string; value: string }[]
                    }
                    className="flex flex-col gap-2"
                  />
                </div>
              )}
            </div>
            <Button
              className="mt-3 w-full"
              loading={updateBoardMembersLoading}
              onClick={() => {
                updateBoardMembers({
                  variables: {
                    boardId: board?.id as string,
                    userIds: selected,
                  },
                  onCompleted(data) {
                    if (data.updateBoardMembers) {
                      setOpen(false);
                      setSelected([]);
                      setSearch('');
                    }
                  },
                  refetchQueries: ['BoardDetails'],
                });
              }}
              disabled={selected.length === 0}
            >
              Give Access
            </Button>
            {updateBoardMembersError && <ErrorAlert error={updateBoardMembersError} />}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
