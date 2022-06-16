import {
  HTTP_METHOD,
  HTTP_REQUEST_STATUS,
} from 'client/modules/api/httpTransport/constants';


export type THttpRequestOptions = {
  method?: HTTP_METHOD,
  data?: Record<string, unknown> | FormData,
  headers?: Record<string, string>,
  isFile?: boolean,
};

export type THandleCommonCodesParams = { status: HTTP_REQUEST_STATUS, response?: any };
export type makeHTTPRequestResponse = Promise<THandleCommonCodesParams>;

export type THttpRequestOptionsWithoutMethod = Omit<THttpRequestOptions, 'method'>;
