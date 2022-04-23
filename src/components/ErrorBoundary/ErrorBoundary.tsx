import ErrorPage from "pages/ErrorPage/ErrorPage";
import React from "react";

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          error={this.state.error}
          callback={() => {
            this.setState({ hasError: false, error: null })
          }}
        />
      );
    }
    return this.props.children;
  }
};
