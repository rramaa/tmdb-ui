import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className={"header"}>
            <Link to={"/"}><h1>Welcome to TMDB</h1></Link>
            <Link className={"wishlist-link"} to={"/wishlist"}>View Wishlist</Link>
        </header>
    )
}
