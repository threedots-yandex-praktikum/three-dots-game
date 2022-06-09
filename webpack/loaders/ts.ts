const TS_FILES_HANDLING_DEFAULT_SETTINGS = {
  test: /.tsx?$/i,
  exclude: /node_modules/,
  use: [ 'babel-loader'],
};

export default {
  client: TS_FILES_HANDLING_DEFAULT_SETTINGS,
  server: TS_FILES_HANDLING_DEFAULT_SETTINGS,
};
