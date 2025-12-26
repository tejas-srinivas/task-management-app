import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';

import { ErrorAlert } from '@/components/ErrorAlert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CLOSE_BOARD = gql(`
    mutation CloseBoard($boardId: ID!) {
        closeBoard(boardId: $boardId) {
            id
            name
        }
    }
`);

export default function CloseBoardDialogButton({ boardId }: { boardId: string }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [closeBoard, { loading, error }] = useMutation(CLOSE_BOARD);

  const handleClose = () => {
    closeBoard({
      variables: { boardId },
      onCompleted: data => {
        if (data.closeBoard?.id) {
          toast.success('Board closed successfully');
          setOpen(false);
          navigate('/boards');
        }
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-fit border-destructive text-destructive hover:bg-destructive/10 hover:border-destructive"
        >
          Close Board
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Close Board</DialogTitle>
          <DialogDescription>Are you sure that the board must be closed?</DialogDescription>
        </DialogHeader>
        {error && <ErrorAlert error={error} />}
        <DialogFooter>
          <Button variant="destructive" loading={loading} onClick={handleClose}>
            Close Board
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
