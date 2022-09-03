import App from "../src"
import {renderToString} from "react-dom/server"
import {StaticRouter} from "react-router-dom/server";
import IndexView from "./views"

export function renderMarkup(path) {
    const routerContext = {}
    const renderTree = (
        <StaticRouter location={path} context={routerContext}>
            <App/>
        </StaticRouter>
    )
    console.log(routerContext)
    return renderToString(
        renderTree
    )
}

export function renderApp(res, {markup, manifest, entryPoints}) {
    const jsFiles = entryPoints.map(v => {
        return manifest[`${v}.js`]
    })
    const finalMarkup = renderToString(<IndexView markup={markup} jsFiles={jsFiles} />)
    res.header("Content-Type", "text/html; charset=utf-8")
    return res.send(finalMarkup)
}


