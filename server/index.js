import express from "express"
import {renderMarkup, renderApp} from "./pageRenderer"

let app = express()

export function create({manifest, entry}) {
    const entryPoints = Object.keys(entry)
    app.get("*", (req, res) => {
        const markup = renderMarkup(req.path)
        return renderApp(res, {markup, manifest, entryPoints})
    })
    return app
}

export function start() {
    app.listen(process.env.PORT, () => {
        console.log(`Started server on port ${process.env.PORT}`)
    })
}

