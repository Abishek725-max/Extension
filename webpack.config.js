const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background.js", // Entry point for background script
    popup: "./src/popup.js", // Entry point for popup script
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output folder
    filename: "[name].bundle.js", // Output filename (e.g., background.bundle.js)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpile JS using Babel
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/, // Load CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Load image files (e.g., icons)
        type: "asset/resource",
        generator: {
          filename: "icons/[name][ext][query]", // Save images in 'icons' folder in dist/
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean dist/ folder before build
    new HtmlWebpackPlugin({
      template: "./src/popup.html", // Use source popup.html template
      filename: "popup.html", // Output as popup.html in dist/
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json", to: "manifest.json" }, // Copy manifest
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".json"], // Resolve JavaScript and JSON files
  },
  devtool: "source-map", // Optional: Enable source maps for easier debugging
  mode: "production", // Change to 'development' for dev builds
};
