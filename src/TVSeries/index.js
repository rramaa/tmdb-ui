import {Link} from "react-router-dom";

export default function TVSeries() {
    return (
        <>
            <Link to={"/movie/1234"} >TV</Link>
            <br />
            <Link to={"/person/1234"} >Person</Link>
            <br />
            <Link to={"/"} >Landing</Link>
            <br />
            TVSeries
        </>
    )
}
