import Routing from "./Routing";
import Header from "./Header"
import {Provider as HeaderProvider} from "./Header/provider"

export default function App() {
    return <HeaderProvider><Header /><Routing /></HeaderProvider>
}
