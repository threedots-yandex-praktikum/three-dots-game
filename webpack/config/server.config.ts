import path from 'path';
import webpack, { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { IS_DEV, DIST_DIR, SRC_DIR } from '../assets/dir';
import fileLoader from '../loaders/file';
import cssLoader from '../loaders/css';
import jsLoader from '../loaders/js';
import tsLoader from '../loaders/ts';

const config: Configuration = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(SRC_DIR, 'server'),
  module: {
    rules: [
      jsLoader.server,
      tsLoader.server,
      cssLoader.server,
      fileLoader.server,
    ],
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/static/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  optimization: { nodeEnv: false },

  plugins: [
    new webpack.ProvidePlugin({
      window: [path.resolve(path.join(__dirname, '..', '/mock/window.mock')), 'default'],
      localStorage: [path.resolve(path.join(__dirname, '..', '/mock/localStorage.mock')), 'default'],
      sessionStorage: [path.resolve(path.join(__dirname, '..', '/mock/sessionStorage.mock')), 'default'],
    }),
  ],
};

export default config;
