import path from 'path';
import { Configuration as WebpackDevSeverConfig } from 'webpack-dev-server';
import { Configuration, WebpackPluginInstance as Plugin, DllReferencePlugin  } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import GenerateSW from 'workbox-webpack-plugin';
import cssLoader from '../loaders/css';
import tsLoader from '../loaders/ts';
import fileLoader from '../loaders/file';
import { IS_DEV, DIST_DIR, SRC_DIR, STATIC_DIR, ROOT_DIR } from '../assets/dir';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
type Config = Configuration & {
  devServer: WebpackDevSeverConfig;
};



const config: Config = {
  target: 'web',
  entry: {
    app: path.join(SRC_DIR, 'client/index.tsx'),
    serviceWorker: path.join(SRC_DIR, '/service-worker.js'),
  },
  mode: IS_DEV ? 'development': 'production',
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
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
    port: 5000,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      static: STATIC_DIR,
      components: path.join(SRC_DIR, '/client/components/'),
      constants: path.join(SRC_DIR, '/client/constants/'),
      controllers: path.join(SRC_DIR, '/client/controllers/'),
      modules: path.join(SRC_DIR, '/client/modules/'),
      pages: path.join(SRC_DIR, '/client/pages/'),
      styles: path.join(SRC_DIR, '/client/styles/'),
      store: path.join(SRC_DIR, '/client/store/'),
      hooks: path.join(SRC_DIR, '/client/hooks/'),
      utils: path.join(SRC_DIR, '/client/utils/'),
    },
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),

    !IS_DEV && new DllReferencePlugin({
      context: ROOT_DIR,
      manifest: path.resolve(path.join(DIST_DIR, 'vendors-manifest.json')),
    }),

    !IS_DEV && new GenerateSW.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      // maximumFileSizeToCacheInBytes: 10000000,
      runtimeCaching: [
        {
          // кэшируем любой урл приложения
          urlPattern: ({ sameOrigin }: any) => sameOrigin,
          handler: 'NetworkFirst',
        },
      ],
    }),
    new LoadablePlugin(),
    IS_DEV && new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 9000,
    }),
    !IS_DEV && new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new DotenvPlugin({ // makes vars available to the application js code
      path: './.env', // Path to .env file (this is the default)
      safe: true,
      //sample: './.env-example',
    }),
  ].filter(Boolean) as Plugin[],

  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};

export default config;

