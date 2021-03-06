const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  target: "web",
  mode: "development",
  devtool: "source-map",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(["index.html"])
  ]
};
