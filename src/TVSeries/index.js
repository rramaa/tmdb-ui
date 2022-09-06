import {useParams} from "react-router-dom";
import Image from "../Image";
import {useFetcher} from "../Fetcher";
import WishlistButton from "../Wishlist/button";
import Loader from "../Loader";

export default function TVSeriesDetails() {
    let {id} = useParams()
    let fetchApi = useFetcher()
    let {data, loading} = fetchApi(`https://api.themoviedb.org/3/tv/${id}`)
    if(loading) {
        return <Loader />
    }
    return <div className={"details-wrapper"}>
        <div className={"details-main-wrapper"}>
            <Image size={"original"} alt={data.name} imagePath={data.backdrop_path} className={"details-img"} />
            <div className={"details-overview"}>
                <div className={"details-title"}>
                    <h2>{data.name}</h2>
                    <WishlistButton className={"wishlist"} id={data.id} type={"/details/tv"} />
                </div>
                <h3>{data.overview}</h3>
            </div>
        </div>
    </div>
}

