import {
  makeHTTPRequestResponse,
  THandleCommonCodesParams,
  THttpRequestOptions,
  THttpRequestOptionsWithoutMethod,
} from 'client/modules/api/httpTransport/types';
import { HTTP_METHOD, HTTP_REQUEST_STATUS } from './constants';


/* eslint-disable no-console */
export class HTTPTransport {
  host: string;
  defaultOptions: THttpRequestOptions;

  constructor(host: string, defaultOptions?: THttpRequestOptions) {
    this.host = host;
    this.defaultOptions = defaultOptions || {} as THttpRequestOptions;
  }

  public get(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<unknown> {
    return this.makeHTTPRequest(url, { ...options, ...this.defaultOptions, method: HTTP_METHOD.GET })
      .then(response => HTTPTransport.handleCommonCodes(response as THandleCommonCodesParams));
  }

  public post(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<unknown> {
    return this.makeHTTPRequest(url, { ...options, ...this.defaultOptions, method: HTTP_METHOD.POST })
      .then(response => HTTPTransport.handleCommonCodes(response as THandleCommonCodesParams));
  }

  public put(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<unknown> {
    return this.makeHTTPRequest(url, { ...options, ...this.defaultOptions, method: HTTP_METHOD.PUT })
      .then(response => HTTPTransport.handleCommonCodes(response as THandleCommonCodesParams));
  }

  public delete(url: string, options: THttpRequestOptionsWithoutMethod = {}): Promise<unknown> {
    return this.makeHTTPRequest(url, { ...options, ...this.defaultOptions, method: HTTP_METHOD.DELETE })
      .then(response => HTTPTransport.handleCommonCodes(response as THandleCommonCodesParams));
  }

  public queryStringify(data?: Record<string, unknown>): string {
    if(!data || Object.keys(data).length === 0) {
      return '';
    }

    return Object
      .keys(data)
      .reduce(
        (acc, param, index) => {
          const value = data[param];
          const paramBlock = [param, value].join('=');

          acc = index === Object.keys(data).length -1 ?
            acc + paramBlock :
            acc + paramBlock + '&';
          return acc;
        },
        '?',
      );
  }

  private static handleCommonCodes({ status, response }: THandleCommonCodesParams) {
    switch(status) {
    case HTTP_REQUEST_STATUS.SUCCESS: {
      return Promise.resolve(response);
    }
    case HTTP_REQUEST_STATUS.UNAUTHORIZED: {
      return Promise.reject({ errorText: 'Неизвестный пользователь', response, status });
    }
    case HTTP_REQUEST_STATUS.FORBIDDEN: {
      return Promise.reject({ errorText: 'Недостаточно прав для выполнения действия', response, status });
    }
    case HTTP_REQUEST_STATUS.CONFLICT: {
      return Promise.reject({ errorText: `Пользователь с такими данными уже существует: ${response.reason.split(' ')[0]}`, response, status });
    }
    case HTTP_REQUEST_STATUS.FAILED: {
      return Promise.reject({ errorText: 'Ошибка запроса', response, status });
    }
    default: {
      return Promise.reject({ errorText: 'При выполнении запроса возникла неизвестная ошибка', response, status });
    }
    }
  }

  private static getRequestStatus(statusCode: number) {
    if(statusCode >= 200 && statusCode < 300) return HTTP_REQUEST_STATUS.SUCCESS;
    if(statusCode === 401) return HTTP_REQUEST_STATUS.UNAUTHORIZED;
    if(statusCode === 403) return HTTP_REQUEST_STATUS.FORBIDDEN;
    if(statusCode === 409) return HTTP_REQUEST_STATUS.CONFLICT;
    return HTTP_REQUEST_STATUS.FAILED;
  }

  public makeHTTPRequest(
    url: string,
    options: THttpRequestOptions,
  ): makeHTTPRequestResponse {
    const {
      method = HTTP_METHOD.GET,
      data,
      headers,
      isFile = false,
    } = options;

    const urlWithHost = [this.host, url].join('/');

    const urlToRequest = method === HTTP_METHOD.GET ?
      [urlWithHost, this.queryStringify(data as Record<string, unknown>)].join('') :
      urlWithHost;

    const fetchParams: RequestInit = method === HTTP_METHOD.GET || !data ?
      ({
        method,
        headers,
        credentials: 'include',
      }) :
      ({
        method,
        headers,
        credentials: 'include',
        body: isFile ? data as XMLHttpRequestBodyInit : JSON.stringify(data as Record<string, unknown>),
      });
      
    return fetch(urlToRequest, fetchParams)
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/plain') && response.status === 200) {
          return ({
            status: HTTP_REQUEST_STATUS.SUCCESS,
            response: null,
          });
        }

        return Promise.all([response.json(), response.status])
          .then(([jsonResponse, status]) => ({
            status: HTTPTransport.getRequestStatus(status),
            response: jsonResponse,
          }));
      })
      .catch(() => ({ status: HTTP_REQUEST_STATUS.CONNECTION_ERROR }));
  }
}
