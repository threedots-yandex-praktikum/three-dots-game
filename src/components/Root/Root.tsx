import React from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { App } from "../App/App";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { HOME_ROUTE } from "constants/routes";

export const Root = () => {
  return (
    <Router>
      <ComponentTreeWithRouter />
    </Router>
  );
};

const ComponentTreeWithRouter = () => {
  const history = useHistory()
  return (
    <ChakraProvider>
      <ErrorBoundary onClick={() => history.push(HOME_ROUTE)}>
        <App />
      </ErrorBoundary>
    </ChakraProvider>

  )
}
