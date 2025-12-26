import { Plus } from 'lucide-react';
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

import { getUser } from '@/utils/auth';

const CREATE_MEMBER_MUTATION = gql(`
  mutation CreateMemberUser($email: String!, $fullName: String!, $clientId: String!) {
    createMemberUser(email: $email, fullName: $fullName, clientId: $clientId) {
      id
    }
  }
`);

const CreateMemberDialogButton: FC = () => {
  const [open, setOpen] = useState(false);
  const user = getUser();
  const buttonRef = useRef<{
    submit: () => void;
    cancel: () => void;
  }>({
    submit: () => {},
    cancel: () => {},
  });

  const [createMemberUser, { loading, error }] = useMutation(CREATE_MEMBER_MUTATION, {
    onCompleted(data) {
      if (data.createMemberUser?.id) {
        toast.success('Member added created successfully');
        setOpen(false);
      }
    },
    refetchQueries: ['Members'],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>Fill in the details below to create a new member.</DialogDescription>
        </DialogHeader>
        <FormPanel
          loading={loading}
          error={error}
          onCancel={() => setOpen(false)}
          onSubmit={data => {
            createMemberUser({
              variables: {
                email: data.email,
                fullName: data.fullName,
                clientId: user?.clientId,
              },
            });
          }}
          buttonRef={buttonRef}
        >
          <FormInput
            type="text"
            fieldName="fullName"
            label="Full Name"
            defaultValue=""
            validators={{ required: true }}
          />
          <FormInput
            type="text"
            fieldName="email"
            label="Email"
            defaultValue=""
            validators={{ required: true }}
          />
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-medium">Note:</span> The initial password for this user is set to{' '}
            <span className="font-semibold">password</span>. Please advise the user to reset it
            before first login.
          </p>
        </FormPanel>
        <DialogFooter>
          <Button loading={false} onClick={() => buttonRef.current?.submit()}>
            Create Member
          </Button>
          <Button variant="ghost" onClick={() => buttonRef.current?.cancel()}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemberDialogButton;
