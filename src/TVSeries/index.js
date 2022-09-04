import {useParams} from "react-router-dom";
import Image from "../Image";
import {useFetcher} from "../Fetcher";

export default function MovieDetails() {
    let {id} = useParams()
    let fetchApi = useFetcher()
    let {data, loading} = fetchApi(`https://api.themoviedb.org/3/tv/${id}`)
    if(loading) {
        return "Loading"
    }
    return <div className={"details-wrapper"}>
        <div className={"details-main-wrapper"}>
            <Image size={"original"} alt={data.name} imagePath={data.backdrop_path} className={"details-img"} />
            <div className={"details-overview"}>
                <h2>{data.name}</h2>
                <button>Add to wishlist</button>
                <h3>{data.overview}</h3>
            </div>
        </div>
    </div>
}

