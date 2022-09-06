import App from "../src"
import {renderToString} from "react-dom/server"
import {StaticRouter} from "react-router-dom/server";
import {FetcherServerProvider} from "../src/components/Fetcher";
import IndexView from "./views"
import nodeFetch from "node-fetch-commonjs"

export async function renderMarkup(path) {
    const routerContext = {}
    const apiCache = {}
    const renderTree = (
        <FetcherServerProvider fetcher={nodeFetch} cache={apiCache}>
            <StaticRouter location={path} context={routerContext}>
                <App/>
            </StaticRouter>
        </FetcherServerProvider>
    )
    renderToString(renderTree)
    await Promise.all(Object.values(apiCache))
    return {
        markup: renderToString(
            <FetcherServerProvider fetcher={nodeFetch} cache={apiCache}>
                <StaticRouter location={path} context={routerContext}>
                    <App/>
                </StaticRouter>
            </FetcherServerProvider>
        ),
        cache: apiCache
    }
}

export function renderApp(res, {markup, manifest, cache, cssFiles, jsFiles}) {
    const finalMarkup = renderToString(<IndexView markup={markup} manifest={manifest} jsFiles={jsFiles} cache={JSON.stringify(cache)} cssFiles={cssFiles} />)
    res.header("Content-Type", "text/html; charset=utf-8")
    return res.send(finalMarkup)
}


