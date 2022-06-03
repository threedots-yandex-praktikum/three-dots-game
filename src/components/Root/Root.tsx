import React from 'react';
import { push } from 'connected-react-router';
import { App } from '../App';
import { ChakraProvider } from '@chakra-ui/react';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { HOME_ROUTE } from 'constants/routes';
import { NotificationSystem } from 'components/NotificationSystem';

export const Root = () => {
  return (
    <ComponentTreeWithRouter />
  );
};

const ComponentTreeWithRouter = () => {
  return (
    <ChakraProvider>
      <ErrorBoundary onClick={() => push(HOME_ROUTE)}>
        <App />
        <NotificationSystem />
      </ErrorBoundary>
    </ChakraProvider>

  );
};
