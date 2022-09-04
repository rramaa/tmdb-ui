import express from "express"
import {renderMarkup, renderApp} from "./pageRenderer"

let app = express()

export function create({manifest, entry}) {
    const entryPoints = Object.keys(entry)
    app.get("*", async (req, res) => {
        const {markup, cache} = await renderMarkup(req.path)
        return renderApp(res, {markup, manifest, entryPoints, cache})
    })
    return app
}

export function start() {
    app.listen(process.env.PORT, () => {
        console.log(`Started server on port ${process.env.PORT}`)
    })
}

