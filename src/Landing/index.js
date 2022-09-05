import Carousel from "../Carousel";
import {useFetcher} from "../Fetcher";

export default function Landing() {
    let fetchApi = useFetcher();
    let {data: moviesList} = fetchApi("https://api.themoviedb.org/3/movie/popular")
    let {data: tvList} = fetchApi("https://api.themoviedb.org/3/tv/popular")
    let {data: personList} = fetchApi("https://api.themoviedb.org/3/person/popular")
    return (
        <>
            <Carousel items={moviesList?.results?.map(v => ({id: v.id, image: v.backdrop_path, title: v.title, baseRoute: "movie"})) ?? []}  title="Popular Movies" />
            <Carousel items={tvList?.results?.map(v => ({id: v.id, image: v.backdrop_path, title: v.name, baseRoute: "tv"})) ?? []} title="Popular TV Shows" />
            <Carousel items={personList?.results?.map(v => ({id: v.id, image: v.profile_path, title: v.name, baseRoute: "person"})) ?? []} title="Popular People" />
        </>
    )
}
