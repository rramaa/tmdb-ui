import React from "react";
import { Link } from "react-router-dom";
import Image from "../Image";

const IMAGE_WIDTH = 504;

export default function Carousel({ items, title }) {
  items = items.filter((v) => v.image);
  let [translate, updateTranslate] = React.useState(0);
  React.useEffect(() => {
    if (items.length <= window.innerWidth / IMAGE_WIDTH) {
      return;
    }
    let intervalId = setInterval(() => {
      let maxWidth = window.innerWidth;
      let fullImagesAccommodated = parseInt(maxWidth / IMAGE_WIDTH);
      const finalTranslate = items.length * IMAGE_WIDTH - maxWidth;
      updateTranslate((prevState) => {
        if (prevState === finalTranslate) {
          return 0;
        } else if (
          items.length - prevState / IMAGE_WIDTH ===
          fullImagesAccommodated + 1
        ) {
          return items.length * IMAGE_WIDTH - maxWidth;
        } else {
          return prevState + IMAGE_WIDTH;
        }
      });
    }, 10000);
    return () => clearInterval(intervalId);
  }, [updateTranslate, items.length]);
  return (
    <div className={"carousel"}>
      <h3>{title}</h3>
      <div
        className={"carousel-inner"}
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {items.map((v) => (
          <CarouselItem key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
}

function CarouselItem({ title, image, id, baseRoute }) {
  return (
    <Link to={`${baseRoute}/${id}`}>
      <div className={"carousel-item"}>
        <Image
          className={"c-img"}
          imagePath={image}
          alt={title}
          size={"w500"}
        />
        <div className={"c-title"}>{title}</div>
      </div>
    </Link>
  );
}
