import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import Routes from '@/routes';
import { ViteThemeProvider as ThemeProvider } from '@/theme/vite';

import './index.css';
import { getAuthorizationHeader } from './utils/auth';
import paginationHelper from './utils/pagination-helper';

const httpLink = createUploadLink({
  uri: import.meta.env.VITE_GRAPHQL_BACKEND_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions }) => {
      if (
        extensions &&
        (extensions.code === 'AUTHENTICATION_ERROR' || extensions.code === 'UNAUTHENTICATED')
      ) {
        // logout();
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getAuthorizationHeader(),
      'Apollo-Require-Preflight': 'true',
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  connectToDevTools: process.env.NODE_ENV !== 'production',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: paginationHelper(),
          clients: paginationHelper(),
          boards: paginationHelper(),
          members: paginationHelper(),
        },
      },
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
