// const babelLoader = {
//   loader: 'babel-loader',
//   options: {
//     presets: [
//       [
//         '@babel/preset-env',
//       ],
//     ],
//     plugins: [
//       '@loadable/babel-plugin',
//     ],
//   },
// };
export default {
  client: {
    test: /.tsx?$/i,
    exclude: /node_modules/,
    use: [ 'ts-loader'],
  },
  server: {
    test: /.tsx?$/i,
    exclude: /node_modules/,
    use: [ 'ts-loader'],
  },
};
