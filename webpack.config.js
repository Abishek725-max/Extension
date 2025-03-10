const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// webpack.config.js
module.exports = {
  mode: "development",
  entry: {
    background: "./src/background.js",
    content: "./src/content.js",
    // popup: "./src/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  // output: {
  //   filename: "[name].js",
  //   path: path.resolve(__dirname, "dist"),
  // },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json", to: "manifest.json" },
        { from: "./src/popup.html", to: "popup.html" }, // Adjust paths if needed
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve .js and .jsx extensions
  },

  target: "web", // Ensures compatibility with Chrome extensions
  devtool: "source-map",
};
