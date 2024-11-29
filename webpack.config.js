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
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: "babel-loader",
  //     },
  //   ],
  // },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json", to: "manifest.json" },
        { from: "./src/popup.html", to: "popup.html" }, // Adjust paths if needed
      ],
    }),
  ],
  // node: {
  //   __dirname: true, // Optionally polyfill __dirname
  //   __filename: true, // Optionally polyfill __filename
  //   global: true, // Optionally polyfill global object
  // },
  // experiments: {
  //   outputModule: true, // Enable ES modules for Service Worker
  // },
  // externals: {
  //   chrome: "chrome", // Mark 'chrome' as an external dependency
  // },

  target: "web", // Ensures compatibility with Chrome extensions
  devtool: "source-map",
};
