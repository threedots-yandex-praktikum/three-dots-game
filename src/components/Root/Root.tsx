import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {App} from "../App/App";


export const Root = () => {

  return (
    <Router>
      <App/>
    </Router>
  );
};
