import "@babel/register"
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import {create, start} from "./"
import "dotenv"
import path from "path"
import fs from "fs"

const serverOptions = {
    publicPath: webpackConfig.output.publicPath,
};

const manifestFilePath = path.join(webpackConfig.output.path, "manifest.json")
const manifest = JSON.parse(fs.readFileSync(manifestFilePath, "utf-8"))

const compiler = webpack(webpackConfig);
const app = create({manifest, entry: webpackConfig.entry})
app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));
start()
