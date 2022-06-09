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

const JS_FILES_HANDLING_DEFAULT_SETTINGS = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: babelLoader,
};

export default {
  client: JS_FILES_HANDLING_DEFAULT_SETTINGS,
  server: JS_FILES_HANDLING_DEFAULT_SETTINGS,
};
