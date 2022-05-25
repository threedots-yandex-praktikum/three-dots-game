import CompressionWebpackPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join } from 'path';
import webpack from 'webpack';

import { STATS_OPTIONS, VENDORS } from '../assets/config';
import { DIST_DIR } from '../assets/dir';
import { ENVS } from '../assets/env';

const config: webpack.Configuration = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    vendors: VENDORS,
  },
  output: {
    library: '[name]',
    filename: '[name].js',
    path: join(DIST_DIR),
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(DIST_DIR, 'vendors-manifest.json'),
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    !ENVS.__DEV__ && new CompressionWebpackPlugin({ minRatio: 1 }),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
  stats: STATS_OPTIONS,
};

export default config;
