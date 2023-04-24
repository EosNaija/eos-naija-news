import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FeaturedPostCard } from "../components";
import { getFeaturedPosts } from "../services";

const responsive = {
  superLargeDesktop: {
    breakpoint: {
      max: 4000,
      min: 1024,
    },
    item: 5,
  },
  desktop: {
    breakpoint: {
      max: 1024,
      min: 768,
    },
    item: 3,
  },
  tablets: {
    breakpoint: {
      max: 968,
      min: 640,
    },
    item: 2,
  },
  mobile: {
    breakpoint: {
      max: 640,
      min: 0,
    },
    item: 1,
  },
};
const FeaturedPost = () => {
  const [featuredPost, setFeaturedPost] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setDataLoaded(true);
      setFeaturedPost(result);
    });
  }, []);

  const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 "></div>
  );
};
