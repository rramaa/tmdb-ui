import {Link} from "react-router-dom";
import {useHeaderContext} from "./provider";

export default function Header() {
    const {headerTitle} = useHeaderContext()
    return (
        <header className={"header"}>
            <Link to={"/"}><h1>{headerTitle}</h1></Link>
            <Link className={"wishlist-link"} to={"/wishlist"}>View Wishlist</Link>
        </header>
    )
}
