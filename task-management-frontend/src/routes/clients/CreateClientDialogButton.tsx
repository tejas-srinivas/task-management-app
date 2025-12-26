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

const CREATE_CLIENT_MUTATION = gql(`
  mutation CreateClientByAdmin($name: String!, $description: String!) {
    createClientByAdmin(name: $name, description: $description) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`);

const CreateClientDialogButton: FC = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<{
    submit: () => void;
    cancel: () => void;
  }>({
    submit: () => {},
    cancel: () => {},
  });

  const [createClientByAdmin, { loading, error }] = useMutation(CREATE_CLIENT_MUTATION, {
    onCompleted(data) {
      if (data.createClientByAdmin?.id) {
        toast.success('Client created successfully');
        setOpen(false);
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    refetchQueries: ['Clients'],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Client</DialogTitle>
          <DialogDescription>Fill in the details below to create a new client.</DialogDescription>
        </DialogHeader>
        <FormPanel
          loading={loading}
          error={error}
          onCancel={() => setOpen(false)}
          onSubmit={data => {
            createClientByAdmin({
              variables: {
                name: data.name,
                description: data.description,
              },
            });
          }}
          buttonRef={buttonRef}
        >
          <FormInput
            type="text"
            fieldName="name"
            label="Client Name"
            defaultValue=""
            validators={{
              required: true,
            }}
          />
          <FormInput
            type="textarea"
            fieldName="description"
            label="Client Description"
            defaultValue=""
            validators={{
              required: true,
            }}
          />
        </FormPanel>
        <DialogFooter>
          <Button loading={loading} onClick={() => buttonRef.current?.submit()}>
            Create Client
          </Button>
          <Button variant="ghost" onClick={() => buttonRef.current?.cancel()}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientDialogButton;
