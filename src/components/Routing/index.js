import { Route, Routes } from "react-router-dom";
import Landing from "../Landing";
import MovieDetails from "../MovieDetails";
import TVSeries from "../TVSeries";
import Person from "../Person";
import Wishlist from "../Wishlist";

export default function Routing() {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/details/movie/:id"} element={<MovieDetails />} />
      <Route path={"/details/tv/:id"} element={<TVSeries />} />
      <Route path={"/details/person/:id"} element={<Person />} />
      <Route path={"/wishlist"} element={<Wishlist />} />
    </Routes>
  );
}
