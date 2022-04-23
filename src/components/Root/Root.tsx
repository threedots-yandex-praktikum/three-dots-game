import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "../App/App";
import { ChakraProvider } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  );
};
