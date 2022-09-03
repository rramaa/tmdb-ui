import {Link} from "react-router-dom";
export default function Landing() {
    return (
        <>
            <Link to={"/movie/1234"} >!234 movie</Link>
            <br />
            <Link to={"/tv-series/1234"} >TV</Link>
            <br />
            <Link to={"/person/1234"} >Person</Link>
            <br />
            Landing Page
        </>
    )
}
