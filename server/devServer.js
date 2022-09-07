import "@babel/register";
import webpackConfig from "../webpack.config";
import { create, start } from "./";
import "dotenv";
import URL from "url";
import fetch from "node-fetch-commonjs"

const manifestFileUrl = URL.resolve(webpackConfig.output.publicPath, "manifest.json")

fetch(manifestFileUrl)
    .then(res => res.json())
    .then(manifest => {
        create({ manifest, entry: webpackConfig.entry });
        start();
    })
    .catch(e => {
        console.log(`Could not read the manifest file which was expected to be found at ${manifestFileUrl}`)
        console.log("make sure your webpack build is running for client application and the public path is reachable")
        throw e
    });
