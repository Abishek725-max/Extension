// next.config.js
const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    // Add custom webpack configuration for the extension
    config.module.rules.push(
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src/extension"),
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/extension"),
        use: "html-loader",
      }
    );

    // If we're building the extension, add extra config

    return config;
  },
};
