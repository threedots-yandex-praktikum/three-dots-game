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
export default {
  client: {
    test: /\.js$/i,
    exclude: /node_modules/,
    use: babelLoader,
  },
  server: {
    test: /\.js$/i,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' },
  },
};
