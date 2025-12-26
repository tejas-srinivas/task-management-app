import { toast } from 'sonner';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import { ClientType } from '@/__generated__/graphql';
import { FormInput, FormPanelWithReadMode } from '@/components';

const UPDATE_CLIENT_INFORMATION = gql(`
  mutation UpdateClientInformation($clientId: ID!, $name: String!, $description: String!, $status: ClientStatusEnumType!) {
    updateClientInformation(clientId: $clientId, name: $name, description: $description, status: $status) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`);

export default function UpdateClientInformation({ client }: { client: ClientType }) {
  const [updateClientInformation, { loading, error }] = useMutation(UPDATE_CLIENT_INFORMATION);

  return (
    <FormPanelWithReadMode
      title="Client"
      subTitle="Edit client information"
      loading={loading}
      error={error}
      onSubmit={data =>
        updateClientInformation({
          variables: {
            clientId: client.id,
            name: data.name,
            description: data.description,
            status: data.status,
          },
          onCompleted(data) {
            if (data.updateClientInformation?.id)
              toast.success('Updated client infomation successfully');
          },
          onError(error) {
            toast.error(error.message);
          },
        })
      }
    >
      <FormInput
        type="text"
        fieldName="name"
        label="Client Name"
        defaultValue={client.name}
        validators={{ required: true }}
      />
      <FormInput
        type="textarea"
        fieldName="description"
        label="Client Description"
        defaultValue={client.description || ''}
      />
      <FormInput type="switch" fieldName="status" label="Status" defaultValue={client.status} />
    </FormPanelWithReadMode>
  );
}
