import { useParams } from "react-router-dom";
import Image from "../Image";
import { useFetcher } from "../Fetcher";
import Carousel from "../Carousel";
import WishlistButton from "../Wishlist/button";
import Loader from "../Loader";

export default function MovieDetails() {
  let { id } = useParams();
  let fetchApi = useFetcher();
  let { data, loading } = fetchApi(`https://api.themoviedb.org/3/movie/${id}`);
  let { data: similarMovies, loading: similarLoading } = fetchApi(
    `https://api.themoviedb.org/3/movie/${id}/similar`,
    { clientOnly: true }
  );
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={"details-wrapper"}>
      <div className={"details-main-wrapper"}>
        <Image
          size={"original"}
          alt={data.title}
          imagePath={data.backdrop_path}
          className={"details-img"}
        />
        <div className={"details-overview"}>
          <div className={"details-title"}>
            <h2>{data.title}</h2>
            <WishlistButton
              className={"wishlist"}
              id={data.id}
              type={"movie"}
            />
          </div>
          <h3>{data.overview}</h3>
        </div>
      </div>
      {!similarLoading && similarMovies?.results?.length > 0 && (
        <Carousel
          items={similarMovies.results.map((v) => ({
            id: v.id,
            image: v.backdrop_path,
            title: v.title,
            baseRoute: "/details/movie",
          }))}
          title={`Similar Movies to ${data.title}`}
        />
      )}
    </div>
  );
}
