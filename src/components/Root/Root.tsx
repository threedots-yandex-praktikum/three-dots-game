import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { App } from '../App';
import { ChakraProvider } from '@chakra-ui/react';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { HOME_ROUTE } from 'constants/routes';
import { NotificationSystem } from 'components/NotificationSystem';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <ComponentTreeWithRouter />
      </Router>
    </Provider>
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
