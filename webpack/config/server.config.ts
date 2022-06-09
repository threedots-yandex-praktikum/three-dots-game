import path from 'path';
import {ProvidePlugin, Configuration, WebpackPluginInstance as Plugin} from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { IS_DEV, DIST_DIR, SRC_DIR } from '../assets/dir';
import fileLoader from '../loaders/file';
import cssLoader from '../loaders/css';
import tsLoader from '../loaders/ts';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';


const config: Configuration = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(SRC_DIR, 'server'),
  module: {
    rules: [
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
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  optimization: { nodeEnv: false },
  plugins: [
    new ProvidePlugin({
      window: [path.resolve(path.join(__dirname, '..', '/mock/window.mock')), 'window'],
      localStorage: [path.resolve(path.join(__dirname, '..', '/mock/localStorage.mock')), 'localStorage'],
      sessionStorage: [path.resolve(path.join(__dirname, '..', '/mock/sessionStorage.mock')), 'sessionStorage'],
    }),
  ].filter(Boolean) as Plugin[],
};

export default config;
