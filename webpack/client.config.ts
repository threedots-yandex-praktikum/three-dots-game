import path from 'path';
import { Configuration as WebpackDevSeverConfig } from 'webpack-dev-server';
import { Configuration, WebpackPluginInstance as Plugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import GenerateSW from 'workbox-webpack-plugin';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import tsLoader from './loaders/ts';
import fileLoader from './loaders/file';
import { IS_DEV, DIST_DIR, SRC_DIR, STATIC_DIR } from './env';

type Config = Configuration & {
  devServer: WebpackDevSeverConfig;
};

const config: Config = {
  entry: {
    app: path.join(SRC_DIR, 'client.tsx'),
  },
  mode: IS_DEV ? 'development': 'production',
  output: {
    path: DIST_DIR,
    filename: '[name].[contenthash].bundle.js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      jsLoader.client,
      tsLoader.client,
      cssLoader.client,
      fileLoader.client,
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: DIST_DIR,
    compress: false,
    hot: true,
    open: true,
    port: 4000,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      static: STATIC_DIR,
      components: path.join(SRC_DIR, '/components/'),
      constants: path.join(SRC_DIR, '/constants/'),
      controllers: path.join(SRC_DIR, '/controllers/'),
      modules: path.join(SRC_DIR, '/modules/'),
      pages: path.join(SRC_DIR, '/pages/'),
      styles: path.join(SRC_DIR, '/styles/'),
    },
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),

    !IS_DEV && new GenerateSW.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ].filter(Boolean) as Plugin[],

  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};

export default config;
