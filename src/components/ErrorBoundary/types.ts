export type TErrorBoundaryState = {
  hasError: boolean;
  error: null | Error;
};
export type TErrorBoundaryProps = {
  onClick: () => void;
};
