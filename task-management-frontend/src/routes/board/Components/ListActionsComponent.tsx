import { MoreHorizontal, Trash2 } from 'lucide-react';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Loader,
} from '@/components';

import { GET_LIST_QUERY } from '../BoardContext/mutations';
import { useBoard } from '../BoardContext/useBoard';

interface ListActionsComponentProps {
  listId: string;
}

const DELETE_LIST = gql(`
  mutation DeleteList($boardId: ID!, $listId: ID!) {
    deleteList(boardId: $boardId, listId: $listId) {
      id
      name 
      position
    }
  }
`);

export default function ListActionsComponent({ listId }: ListActionsComponentProps) {
  const { board } = useBoard();
  const [deleteList, { loading }] = useMutation(DELETE_LIST, {
    update: (cache, { data }) => {
      if (!data || !data.deleteList || !board?.id) return;
      const deletedListId = data.deleteList.id;
      if (!deletedListId) return;
      const cacheData: any = cache.readQuery({
        query: GET_LIST_QUERY,
        variables: {
          boardId: board.id,
          filters: {
            text: undefined,
            dueDate: undefined,
            tags: undefined,
            priority: undefined,
            assigneeId: undefined,
          },
        },
      });
      if (!cacheData?.lists?.nodes) return;
      const filteredLists = cacheData.lists.nodes.filter((list: any) => list.id !== deletedListId);
      const updatedLists = filteredLists.map((list: any, idx: number) => ({
        ...list,
        position: idx + 1,
      }));
      cache.writeQuery({
        query: GET_LIST_QUERY,
        variables: {
          boardId: board.id,
          filters: {
            text: undefined,
            dueDate: undefined,
            tags: undefined,
            priority: undefined,
            assigneeId: undefined,
          },
        },
        data: {
          ...cacheData,
          lists: {
            ...cacheData.lists,
            nodes: updatedLists,
          },
        },
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            deleteList({ variables: { boardId: board?.id as string, listId } });
          }}
          disabled={loading}
        >
          <Trash2 />
          Delete List
          {loading && <Loader />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
