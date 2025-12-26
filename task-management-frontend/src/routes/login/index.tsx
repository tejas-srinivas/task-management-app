import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { gql, useMutation } from '@apollo/client';

import logo from '@/assests/icon.png';

import { FormPanel } from '@/components/FormPanel';
import FormInput from '@/components/FormPanel/FormInput';
import { Button } from '@/components/ui/button';

import { storeLoginCredentials } from '@/utils/auth';

const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        fullName
        role
        email
        clientId
        status
      }
    }
  }
`);

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const buttonRef = useRef<{
    submit: () => void;
    cancel: () => void;
  }>({
    submit: () => {},
    cancel: () => {},
  });

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirectTo') || '/';

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: data => {
      if (data && data.login?.token) {
        storeLoginCredentials(data.login.user, `Bearer ${data.login.token}`);
        navigate(decodeURIComponent(redirectTo), { replace: true });
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md rounded-lg shadow-md p-8 bg-card text-card-foreground border border-border">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Task Management Logo" className="w-16 h-16 mb-3" />
          <h1 className="text-2xl font-bold text-center tracking-tight">
            Task Management System
          </h1>
        </div>
        <FormPanel
          onSubmit={data =>
            login({
              variables: {
                email: data.email,
                password: data.password,
              },
            })
          }
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
            placeholder="Email"
            validators={{ required: true, isEmail: true }}
          />
          <FormInput
            fieldName="password"
            label="Password"
            type="password"
            defaultValue=""
            placeholder="Password"
            validators={{ required: true }}
          />
        </FormPanel>
        <Button
          loading={loading}
          onClick={() => buttonRef.current?.submit()}
          className="flex w-full mb-2"
        >
          Login
        </Button>
        <div className="text-center">
          <button
            onClick={() => navigate('/reset-password')}
            className="text-sm text-primary hover:underline transition-colors"
          >
            Reset your password
          </button>
        </div>
      </div>
    </div>
  );
}
