import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";

import App from "../src"
import {FetcherClientProvider} from "../src/components/Fetcher";
const cssFiles = {
    landing: () => import("../src/styles/landing.scss"),
    details: () => import("../src/styles/details.scss"),
    wishlist: () => import("../src/styles/wishlist.scss"),
}

function Application() {
    React.useEffect(() => {
        Object.entries(cssFiles).filter(([name]) => {
            return window.__LOADED_CSS__.indexOf(name) === -1
        }).map(([_, getter]) => getter())
    }, [])
    return (
        <FetcherClientProvider cache={window.__INTERNAL_DATA_CACHE__} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FetcherClientProvider>
    )
}

ReactDOM.hydrateRoot(document.getElementById("root"), <Application />)
