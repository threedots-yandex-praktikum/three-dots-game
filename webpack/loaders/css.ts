import { IS_DEV } from '../env';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  client: {
    test: /\.scss$/i,
    use: [
      IS_DEV && 'css-hot-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ].filter(Boolean) as string[],
  },
  server: {
    test: /\.s?css$/i,
    loader: 'null-loader',
  },
};
