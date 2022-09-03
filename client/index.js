import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";

import App from "../src"

function Application() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}

ReactDOM.hydrateRoot(document.getElementById("root"), <Application />)
