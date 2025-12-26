import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { Button, Input, Loader } from '@/components';

import { useBoard } from '../BoardContext/useBoard';

const CREATE_LIST = gql(`
  mutation CreateList($boardId: ID!, $name: String!) {
    createList(boardId: $boardId, name: $name) {
      id
      name
    }
  }
`);

export default function AddListComponent() {
  const { showAddList, setShowAddList, board } = useBoard();
  const [newListName, setNewListName] = useState('');

  const [createList, { loading, error }] = useMutation(CREATE_LIST);

  const handleAdd = () => {
    if (newListName.trim()) {
      createList({
        variables: {
          boardId: board?.id as string,
          name: newListName.trim(),
        },
        onCompleted(data) {
          if (data.createList?.id) {
            setNewListName('');
            setShowAddList(false);
          }
        },
        refetchQueries: ['Lists'],
      });
    }
  };

  if (!showAddList) {
    return (
      <div className="bg-todo-list-card-background rounded-[0.565rem] w-72 py-2 mb-6 flex flex-col flex-shrink-0 h-fit">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-start ml-2"
          onClick={() => setShowAddList(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add another list
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-todo-list-card-background rounded-[0.565rem] w-72 px-2 py-3 mb-6 flex flex-col flex-shrink-0 h-fit">
      <Input
        placeholder="Enter list title..."
        className="mb-2 bg-todo-list-card-foreground"
        value={newListName}
        onChange={e => setNewListName(e.target.value)}
        autoFocus
      />
      <div className="flex items-center justify-between">
        <div>
          <Button size="sm" onClick={handleAdd}>
            <Plus className="w-5 h-5" /> Add List
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setShowAddList(false);
              setNewListName('');
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        {loading && <Loader />}
      </div>
      {error && <div className="text-xs">{error.message}</div>}
    </div>
  );
}
