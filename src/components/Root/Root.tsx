import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "../App/App";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";

export const Root = () => {
  return (
    <Router>
      <ChakraProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ChakraProvider>
    </Router>
  );
};
