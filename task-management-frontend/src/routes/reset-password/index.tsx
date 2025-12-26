import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { useMutation } from '@apollo/client';

import { gql } from '@/__generated__/gql';
import logo from '@/assests/icon.png';

import { FormPanel } from '@/components/FormPanel';
import FormInput from '@/components/FormPanel/FormInput';
import { Button } from '@/components/ui/button';

const RESET_PASSWORD_MUTATION = gql(`
  mutation ResetPassword($email: String!, $oldPassword: String!, $newPassword: String!) {
    resetPassword(email: $email, oldPassword: $oldPassword, newPassword: $newPassword) {
      status
      message
    }
  }
`);

export default function ResetPassword() {
  const navigate = useNavigate();
  const buttonRef = useRef<{
    submit: () => void;
    cancel: () => void;
  }>({
    submit: () => {},
    cancel: () => {},
  });

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: data => {
      if (data && data.resetPassword?.status) {
        if (toast.success('Password reset sucessfully')) {
          navigate('/login');
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md rounded-lg shadow-md p-8 bg-card text-card-foreground border border-border">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Task Management Logo" className="w-16 h-16 mb-3" />
          <h1 className="text-2xl font-bold text-center tracking-tight">Reset Your Password</h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Fill the details below to reset passowrd
          </p>
        </div>
        <FormPanel
          onSubmit={data => {
            resetPassword({
              variables: {
                email: data.email,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
              },
            });
          }}
          loading={loading}
          error={error?.message}
          className="mb-4"
          buttonRef={buttonRef}
        >
          <FormInput
            fieldName="email"
            label="Email"
            type="email"
            defaultValue=""
            placeholder="Enter email"
            validators={{ required: true, minLength: 8 }}
          />
          <FormInput
            fieldName="oldPassword"
            label="Old Password"
            type="password"
            defaultValue=""
            placeholder="Enter old password"
            validators={{ required: true, minLength: 8 }}
          />
          <FormInput
            fieldName="newPassword"
            label="New Password"
            type="password"
            defaultValue=""
            placeholder="Enter new password"
            validators={{ required: true, minLength: 8 }}
          />
        </FormPanel>
        <Button
          loading={loading}
          onClick={() => buttonRef.current?.submit()}
          className="flex w-full mb-2"
        >
          Reset Password
        </Button>
        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-primary hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
