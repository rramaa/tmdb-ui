import "@babel/register"
import webpackConfig from '../webpack.config';
import {create, start} from "./"
import "dotenv"
import path from "path"

const manifest = require(path.join(webpackConfig.output.path, "manifest.json"))

create({manifest, entry: webpackConfig.entry})
start()
