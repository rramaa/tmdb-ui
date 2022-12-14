import React from "react";
import { addToWishlist, getWishlist, removeFromWishlist } from "./utils";

export default function WishlistButton({ className, id, type }) {
  let [wishlist, updateWishlist] = React.useState(null);
  React.useEffect(() => {
    updateWishlist(getWishlist(type));
  }, [type]);
  function _toggleWishlist() {
    if (isAlreadyPresent) {
      updateWishlist(removeFromWishlist(id, type));
    } else {
      updateWishlist(addToWishlist(id, type));
    }
  }
  if (!wishlist) {
    return null;
  }
  let isAlreadyPresent = wishlist.has(id);
  let bookmarkClassname = [className, "bookmark"];
  return (
    <BookMark
      filled={isAlreadyPresent}
      className={bookmarkClassname.join(" ")}
      onClick={_toggleWishlist}
    />
  );
}

function BookMark({ onClick, className, filled }) {
  let filledSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 16"
    >
      <path
        fill="#212121"
        d="M3.7794083,13.9186906 C3.44715459,14.1405346 3.00176238,13.9023716 3.00176238,13.5028628 L3.00176238,4.01167645 C3.00176238,2.90850596 3.89501061,2.01365601 4.99817934,2.01167966 L10.9981793,2.00092072 C12.1027471,1.99895166 12.9997803,2.89277655 13.0017624,3.99734427 L13.0017624,13.5028628 C13.0017624,13.9023716 12.5563702,14.1405346 12.2241165,13.9186906 L8.00176238,11.0994481 L3.7794083,13.9186906 Z"
      />
    </svg>
  );
  let emptySvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 16"
    >
      <path
        fill="#212121"
        d="M3.7794083,13.9186906 C3.44715459,14.1405346 3.00176238,13.9023716 3.00176238,13.5028628 L3.00176238,4.01167645 C3.00176238,2.90850596 3.89501061,2.01365601 4.99817934,2.01167966 L10.9981793,2.00092072 C12.1027471,1.99895166 12.9997803,2.89277655 13.0017624,3.99734427 L13.0017624,13.5028628 C13.0017624,13.9023716 12.5563702,14.1405346 12.2241165,13.9186906 L8.00176238,11.0994481 L3.7794083,13.9186906 Z M12.0017624,4.00092402 L11.9948241,3.88252691 C11.9361681,3.38529251 11.5128059,3.00001016 10.9999709,3.00092402 L4.99997086,3.01167806 C4.4483865,3.01266623 4.00176238,3.4600912 4.00176238,4.01167645 L4.00176238,12.5678051 L7.72411646,10.0824098 C7.89220175,9.97018022 8.111323,9.97018022 8.2794083,10.0824098 L12.0017624,12.5678051 L12.0017624,4.00092402 Z"
      />
    </svg>
  );
  return (
    <div className={className} onClick={onClick}>
      {filled ? filledSvg : emptySvg}
    </div>
  );
}
