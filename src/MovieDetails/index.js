import {Link} from "react-router-dom";

export default function MovieDetails() {
    return (
        <>
            <Link to={"/tv-series/1234"} >TV</Link>
            <br />
            <Link to={"/person/1234"} >Person</Link>
            <br />
            <Link to={"/"} >Landing</Link>
            <br />
            Movie Details
        </>
    )
}
