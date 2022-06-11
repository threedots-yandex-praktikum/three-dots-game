import { Response } from "express";

export const API_PREFIX = '/api';
export const FORUM_ROUTE = [API_PREFIX, 'forum'].join('/');
export const THEME_ROUTE = [API_PREFIX, 'theme'].join('/');

export const sendJSONResponse = (res: Response, data: Record<string, any>) => {
  return res
    .status(200)
    .setHeader('content-type', 'text/plain')
    .send(JSON.stringify(data));
};
