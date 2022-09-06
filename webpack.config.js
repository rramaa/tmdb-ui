const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevEnv = process.env.NODE_ENV === "development";
const distPath = path.resolve(__dirname, "./dist");
const clientPath = path.resolve(__dirname, "./client");
const srcPath = path.resolve(__dirname, "./src");
require("dotenv").config();

const stylePath = path.join(srcPath, "./styles");

module.exports = {
  mode: isDevEnv ? "development" : "production",
  context: clientPath,
  devtool: "source-map",
  entry: {
    app: isDevEnv
      ? ["webpack-hot-middleware/client", "./index.js"]
      : ["./index.js"],
    "styles/index": path.join(stylePath, "index.scss"),
    "styles/details": path.join(stylePath, "details.scss"),
    "styles/wishlist": path.join(stylePath, "wishlist.scss"),
    "styles/landing": path.join(stylePath, "landing.scss"),
  },
  devServer: {
    port: process.env.CLIENT_PORT,
  },
  output: {
    path: distPath,
    publicPath: `http://localhost:${process.env.CLIENT_PORT}/`,
  },
  plugins: [
    new WebpackManifestPlugin({ writeToFileEmit: true }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.?scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
