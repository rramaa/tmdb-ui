import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";

import App from "../src"
import {FetcherClientProvider} from "../src/Fetcher";

function Application() {
    return (
        <FetcherClientProvider cache={window.__INTERNAL_DATA_CACHE__} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FetcherClientProvider>
    )
}

ReactDOM.hydrateRoot(document.getElementById("root"), <Application />)
