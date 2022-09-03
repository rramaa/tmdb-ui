import {Route, Routes} from "react-router-dom";
import Landing from "../Landing";
import MovieDetails from "../MovieDetails";
import TVSeries from "../TVSeries";
import Person from "../Person";

export default function Routing() {
    return (
        <Routes>
            <Route path={"/"} element={<Landing />} />
            <Route path={"/movie/:id"} element={<MovieDetails />}/>
            <Route path={"/tv-series/:id"} element={<TVSeries />}/>
            <Route path={"/person/:id"} element={<Person />}/>
        </Routes>
    )
}
