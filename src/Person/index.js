import {useParams} from "react-router-dom";
import Image from "../Image";
import {useFetcher} from "../Fetcher";
import Carousel from "../Carousel";

export default function MovieDetails() {
    let {id} = useParams()
    let fetchApi = useFetcher()
    let {data, loading} = fetchApi(`https://api.themoviedb.org/3/person/${id}`)
    let {data: credits, loading: creditsLoading} = fetchApi(`https://api.themoviedb.org/3/person/${id}/combined_credits`, {clientOnly: true})
    if(loading) {
        return "Loading"
    }
    return <div className={"details-wrapper"}>
        <div className={"details-main-wrapper"}>
            <Image size={"original"} alt={data.name} imagePath={data.profile_path} className={"details-img"} />
            <div className={"details-overview"}>
                <h2>{data.name}</h2>
                <button>Add to wishlist</button>
                <h3>Known for {data.known_for_department}</h3>
            </div>
        </div>
        {!creditsLoading && credits?.cast.length > 0 && <Carousel
            baseRoute={"/movie"}
            title={"Credits"}
            items={credits?.cast.map((v) => {
                return {
                    image: v.backdrop_path,
                    id: v.id,
                    title: v.original_title,
                    type: v.media_type
                }
            })}
        />}
    </div>
}

