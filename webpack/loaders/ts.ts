export default {
  client: {
    test: /.tsx?$/i,
    exclude: /node_modules/,
    use: ['ts-loader'],
  },
  server: {
    test: /.tsx?$/i,
    exclude: /node_modules/,
    use: ['ts-loader'],
  },
};
