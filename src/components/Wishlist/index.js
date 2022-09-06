import React from "react";
import { getWishlist } from "./utils";
import { useFetcher } from "../Fetcher";
import Image from "../Image";
import { Link } from "react-router-dom";
import Loader from "../Loader";

export default function Wishlist() {
  let [wishlist, updateWishlist] = React.useState(null);
  React.useEffect(() => {
    updateWishlist(() => {
      return {
        movie: Array.from(getWishlist("movie")),
        tv: Array.from(getWishlist("tv")),
        person: Array.from(getWishlist("person")),
      };
    });
  }, []);
  if (!wishlist) {
    return <Loader />;
  }
  return (
    <>
      {wishlist.movie.length > 0 ? (
        <WishlistGroup items={wishlist.movie} type={"movie"} title={"Movies"} />
      ) : (
        "No movies add to wishlist yet"
      )}
      <hr />
      {wishlist.tv.length > 0 ? (
        <WishlistGroup items={wishlist.tv} type={"tv"} title={"TV Series"} />
      ) : (
        "No tv series add to wishlist yet"
      )}
      <hr />
      {wishlist.person.length > 0 ? (
        <WishlistGroup
          items={wishlist.person}
          type={"person"}
          title={"Persons"}
        />
      ) : (
        "No persons add to wishlist yet"
      )}
    </>
  );
}

function WishlistGroup({ items, title, type }) {
  return (
    <>
      <h2>{title}</h2>
      <div className={"wl-group"}>
        {items.map((id) => (
          <WishlistItem id={id} type={type} key={id} />
        ))}
      </div>
    </>
  );
}

function WishlistItem({ id, type }) {
  let fetchApi = useFetcher();
  let { data } = fetchApi(`https://api.themoviedb.org/3/${type}/${id}`);
  if (data) {
    return (
      <div className={"wl-item"}>
        <Link to={`/details/${type}/${id}`}>
          <h3>{data.title || data.name}</h3>
          <Image
            size={"w500"}
            imagePath={data.backdrop_path || data.profile_path}
            alt={data.title || data.name}
          />
        </Link>
      </div>
    );
  }
}
