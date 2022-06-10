import { IS_DEV } from '../assets/dir';
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
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            'src/client/styles/variables.scss',
            'src/client/styles/main.scss',
          ],
        },
      },
    ].filter(Boolean) as string[],
  },
  server: {
    test: /\.s?css$/i,
    loader: 'null-loader',
  },
};
