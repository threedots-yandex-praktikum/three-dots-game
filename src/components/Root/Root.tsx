import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "../App/App";
import { ChakraProvider } from "@chakra-ui/react";
import {NotificationSystem} from "components/NotificationSystem/NotificationSystem";

export const Root = () => {
  return (
    <Router>
      <ChakraProvider>
        <App />
        <NotificationSystem/>
      </ChakraProvider>
    </Router>
  );
};
