import { Plus } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';

import { FormPanel } from '@/components/FormPanel';
import FormInput from '@/components/FormPanel/FormInput';
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

import { getUser } from '@/utils/auth';

const CREATE_CLIENT_ADMIN_MUTATION = gql(`
  mutation CreateClientAdminUser($email: String!, $fullName: String!, $clientId: String!) {
    createClientAdminUser(email: $email, fullName: $fullName, clientId: $clientId) {
      id
    }
  }
`);

const CreateClientAdminDialogButton: FC = () => {
  const [open, setOpen] = useState(false);
  const user = getUser();
  const buttonRef = useRef<{
    submit: () => void;
    cancel: () => void;
  }>({
    submit: () => {},
    cancel: () => {},
  });

  const [createClientAdmin, { loading, error }] = useMutation(CREATE_CLIENT_ADMIN_MUTATION, {
    onCompleted(data) {
      if (data.createClientAdminUser?.id) {
        toast.success('Admin added created successfully');
        setOpen(false);
      }
    },
    refetchQueries: ['Members'],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Admin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new admin. Only an admin can create an admin.
          </DialogDescription>
        </DialogHeader>
        <FormPanel
          loading={loading}
          error={error}
          onCancel={() => setOpen(false)}
          onSubmit={data => {
            createClientAdmin({
              variables: {
                email: data.email,
                fullName: data.fullName,
                clientId: user?.clientId ? user.clientId : data.clientId,
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
            type="email"
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
          <Button loading={loading} onClick={() => buttonRef.current?.submit()}>
            Create Admin
          </Button>
          <Button variant="ghost" onClick={() => buttonRef.current?.cancel()}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientAdminDialogButton;
