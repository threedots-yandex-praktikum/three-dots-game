const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
    publicPath: '/',
  },
  // mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    open: true,
    port: 4000,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      static: path.resolve(__dirname, 'static/'),
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      constants: path.resolve(__dirname, 'src/constants/'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};
