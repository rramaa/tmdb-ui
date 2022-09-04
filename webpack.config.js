const path = require('path');
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");
const isDevEnv = process.env.NODE_ENV === "development";
const distPath = path.resolve(__dirname, './dist');
const clientPath = path.resolve(__dirname, './client');
const srcPath = path.resolve(__dirname, './src');
require("dotenv").config()

const stylePath = path.join(srcPath, "./styles/index.scss")

module.exports = {
    mode: isDevEnv ? "development" : "production",
    context: clientPath,
    devtool: "source-map",
    entry: {
        app: isDevEnv ? ["webpack-hot-middleware/client", "./index.js"]: ["./index.js"],
        styles: stylePath
    },
    devServer: {
        port: process.env.DEV_SERVER_PORT
    },
    output: {
        path: distPath,
        publicPath: `http://localhost:${process.env.DEV_SERVER_PORT}/`
    },
    plugins: [new WebpackManifestPlugin({writeToFileEmit: true})],
    module: {
        rules: [{
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            }
        }, {
            test: /\.?scss$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    }
}
