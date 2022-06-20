import { Response } from 'express';


export const API_PREFIX = '/api';

export const FORUM_ROUTE = [API_PREFIX, 'forum'].join('/');
export const USER_ROUTE = [API_PREFIX, 'user'].join('/');

const ID_PARAM_SUB_ROUTE = ':id';

export const COMMENT_SUB_ROUTE = '/comment';
export const COMMENT_WITH_ID_SUB_ROUTE = [COMMENT_SUB_ROUTE, ID_PARAM_SUB_ROUTE].join('/');

export const TOPIC_SUB_ROUTE = '/topic';
export const TOPIC_WITH_ID_SUB_ROUTE = [TOPIC_SUB_ROUTE, ID_PARAM_SUB_ROUTE].join('/');

export const REACTION_SUB_ROUTE = '/reaction';
export const REACTION_WITH_ID_SUB_ROUTE = [REACTION_SUB_ROUTE, ID_PARAM_SUB_ROUTE].join('/');

export const sendJSONResponse = (res: Response, data: Record<string, unknown>) => {
  return res
    .status(200)
    .setHeader('content-type', 'text/plain')
    .json(data);
};
