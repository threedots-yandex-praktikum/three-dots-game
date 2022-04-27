import React from 'react';


export type TErrorBoundaryState = {
  hasError: boolean;
  error: null | Error;
};
export type TErrorBoundaryProps = {
  onClick: () => void;
  children: React.ReactNode,
};
