const path = require('path');
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");
const isDevEnv = process.env.NODE_ENV === "development";
const distPath = path.resolve(__dirname, './dist');
const srcPath = path.resolve(__dirname, './client');
require("dotenv").config()

module.exports = {
    mode: isDevEnv ? "development" : "production",
    context: srcPath,
    entry: {
        app: isDevEnv ? ["webpack-hot-middleware/client", "./index.js"]: "./index.js"
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
        }]
    }
}
