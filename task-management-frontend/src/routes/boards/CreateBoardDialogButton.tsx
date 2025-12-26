import { BookPlus } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormInput,
  FormPanel,
} from '@/components';

const CREATE_BOARD_MUTATION = gql(`
  mutation CreateBoard($clientId: ID!, $name: String!) {
    createBoard(clientId: $clientId, name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`);

const CreateBoardDialogButton: FC<{ clientId: string }> = ({ clientId }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<{
    submit: () => void;
    cancel: () => void;
  }>({
    submit: () => {},
    cancel: () => {},
  });

  const [createBoard, { loading: createBoardLoading, error: createBoardError }] = useMutation(
    CREATE_BOARD_MUTATION,
    {
      onCompleted(data) {
        if (data.createBoard?.id) {
          toast.success('Board created successfully');
          setOpen(false);
        }
      },
      refetchQueries: ['Boards', 'Client'],
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <BookPlus />
          Create Board
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>Enter board title to create a new board.</DialogDescription>
        </DialogHeader>
        <FormPanel
          loading={createBoardLoading}
          error={createBoardError}
          onCancel={() => setOpen(false)}
          onSubmit={data => {
            createBoard({
              variables: {
                clientId,
                name: data.name,
              },
            });
          }}
          buttonRef={buttonRef}
        >
          <FormInput
            type="text"
            fieldName="name"
            label="Board Title"
            defaultValue=""
            validators={{ required: true }}
          />
        </FormPanel>
        <DialogFooter>
          <Button loading={false} onClick={() => buttonRef.current?.submit()}>
            Create Board
          </Button>
          <Button variant="ghost" onClick={() => buttonRef.current?.cancel()}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardDialogButton;
