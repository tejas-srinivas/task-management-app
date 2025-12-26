import { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { UserStatusEnumType } from '@/__generated__/graphql';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorAlert,
} from '@/components';

const UPDATE_USER_STATUS = gql(`
  mutation UpdateUserStatus($updateUserStatusId: ID!, $status: UserStatusEnumType!) {
    updateUserStatus(id: $updateUserStatusId, status: $status) {
      id
      fullName
      status
    }
  }
`);

const DisableMemberDialogButton: FC<{ userId: string; status: UserStatusEnumType }> = ({
  userId,
  status,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [updateUserStatus, { loading, error }] = useMutation(UPDATE_USER_STATUS, {
    onCompleted(data) {
      if (data.updateUserStatus?.status === UserStatusEnumType.Inactive) {
        toast.success(`Disabled member: ${data.updateUserStatus.fullName}`);
        navigate('/members');
        setOpen(false);
      }
    },
    onError() {
      toast.error('Failed to diable member');
    },
    refetchQueries: ['Members'],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-fit border-destructive text-destructive hover:bg-destructive/10 hover:border-destructive"
          disabled={status === UserStatusEnumType.Inactive}
        >
          Disable Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disable Member</DialogTitle>
          <DialogDescription>Are you sure you want to disable the member?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            loading={loading}
            onClick={() =>
              updateUserStatus({
                variables: {
                  updateUserStatusId: userId,
                  status: UserStatusEnumType.Inactive,
                },
              })
            }
          >
            Disable
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
        {error && <ErrorAlert error={error} />}
      </DialogContent>
    </Dialog>
  );
};

export default DisableMemberDialogButton;
