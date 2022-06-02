export default {
  client: {
    test: /.tsx?$/i,
    exclude: /node_modules/,
    use: [ 'babel-loader'],
  },
  server: {
    test: /.tsx?$/i,
    exclude: /node_modules/,
    use: [ 'babel-loader'],
  },
};
