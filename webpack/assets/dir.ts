import path from 'path';
import { ENVS } from './env';

const ROOT_DIR_FROM_WEBPACK = path.join(__dirname, '../../');
const ROOT_DIR_FROM_DIST_SERVER = path.join(__dirname, '..', '..');

export const ROOT_DIR = ENVS.__DEV__
    ? ROOT_DIR_FROM_DIST_SERVER
    : ROOT_DIR_FROM_WEBPACK; 
export const IS_DEV = process.env.NODE_ENV !== 'production';
export const SRC_DIR = path.join(ROOT_DIR_FROM_WEBPACK, 'src/');
export const DIST_DIR = path.join(ROOT_DIR_FROM_WEBPACK, 'dist/');
export const STATIC_DIR = path.join(ROOT_DIR_FROM_WEBPACK, 'static/');

