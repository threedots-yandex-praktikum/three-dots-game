export default {
  client: {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
  server: {
    loader: 'null-loader',
    test: /\.(png|jpe?g|gif)$/i,
  },
};
