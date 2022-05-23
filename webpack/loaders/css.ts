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
            'src/styles/variables.scss',
            'src/styles/main.scss',
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
