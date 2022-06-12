import { Response } from 'express';


export const API_PREFIX = '/api';

export const FORUM_ROUTE = [API_PREFIX, 'forum'].join('/');
export const THEME_ROUTE = [API_PREFIX, 'theme'].join('/');

export const COMMENT_SUB_ROUTE = '/comment';
export const COMMENT_WITH_ID_SUB_ROUTE = [COMMENT_SUB_ROUTE, ':id'].join('/');

export const TOPIC_SUB_ROUTE = '/topic';

export const sendJSONResponse = (res: Response, data: Record<string, any>) => {
  return res
    .status(200)
    .setHeader('content-type', 'text/plain')
    .json(data);
};
