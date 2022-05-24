import React from 'react';
import {  useHistory } from 'react-router-dom';
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
  const history = useHistory();
  return (
    <ChakraProvider>
      <ErrorBoundary onClick={() => history.push(HOME_ROUTE)}>
        <App />
        <NotificationSystem />
      </ErrorBoundary>
    </ChakraProvider>

  );
};
