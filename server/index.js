import express from "express";
import { renderMarkup, renderApp } from "./pageRenderer";
import { commonCssFiles, commonJsFiles } from "./constants";

let app = express();

export function create({ manifest, entry }) {
  const entryPoints = Object.keys(entry);
  app.get("/details/*", async (req, res) => {
    const { markup, cache } = await renderMarkup(req.path);
    const cssFiles = [...commonCssFiles, "details"];
    return renderApp(res, {
      markup,
      manifest,
      entryPoints,
      cache,
      cssFiles,
      jsFiles: commonJsFiles,
    });
  });
  app.get("/wishlist", async (req, res) => {
    const { markup, cache } = await renderMarkup(req.path);
    const cssFiles = [...commonCssFiles, "wishlist"];
    return renderApp(res, {
      markup,
      manifest,
      entryPoints,
      cache,
      cssFiles,
      jsFiles: commonJsFiles,
    });
  });
  app.get("/", async (req, res) => {
    const { markup, cache } = await renderMarkup(req.path);
    const cssFiles = [...commonCssFiles, "landing"];
    return renderApp(res, {
      markup,
      manifest,
      entryPoints,
      cache,
      cssFiles,
      jsFiles: commonJsFiles,
    });
  });
  return app;
}

export function start() {
  app.listen(process.env.PORT, () => {
    console.log(`Started server on port ${process.env.PORT}`);
  });
}
