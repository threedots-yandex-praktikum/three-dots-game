const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
    ],
  },
};
const isProduction = process.env.NODE_ENV == 'production';
const config = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: babelLoader,
      },
      {
        test: /.tsx?$/i,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: true,
    port: 4000,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      static: path.resolve(__dirname, "static/"),
      components: path.resolve(__dirname, "src/components/"),
      constants: path.resolve(__dirname, "src/constants/"),
      controllers: path.resolve(__dirname, "src/controllers/"),
      modules: path.resolve(__dirname, "src/modules/"),
      pages: path.resolve(__dirname, "src/pages/"),
      styles: path.resolve(__dirname, "src/styles/"),
      store: path.resolve(__dirname, "src/store/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    const plugins = [
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
      new AddAssetHtmlPlugin({ filepath: `./sw/sw-reg.js` }),
    ];
    config.plugins.push(...plugins);
  } else {
    config.mode = 'development';
  }
  return config;
};
