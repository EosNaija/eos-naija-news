import {
  faArrowRight,
  faCalendar,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import React from "react";

const FeaturedBanner = ({
  title,
  slug,
  image,
  author,
  createdAt,
  excerpt,
  read_duration,
}) => {
  return (
    <Link href={`/post/${slug}`}>
      <div className="body-padding mt-8 bg-white md:px-24 transition-all duration-700 ease-in-out cursor-pointer mb-8 hover:shadow-xl hover:-translate-y-3 rounded-lg">
        <div className="container mx-auto flex flex-col md:flex-row items-center py-9">
          <div className="md:w-2/3 max-h-96 overflow-hidden md:pr-12">
            <img src={image} alt={title} className="w-full shadow-lg" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-3xl font-bold mb-4">{title}</h2>
            <div className="text-gray-600 flex justify-evenly mb-4 ">
              <div className="flex items-center  mr-auto ml-2">
                <FontAwesomeIcon className=" w-4 h-4 mr-2" icon={faUser} />
                <p className=" font-semibold">By {author}</p>
              </div>
              <div className="flex items-center mr-auto ml-2">
                <FontAwesomeIcon className=" w-4 h-4 mr-2" icon={faCalendar} />
                <p className="">{moment(createdAt).format("MMM DD, YYYY")}</p>
              </div>
            </div>

            <p className="text-sm md:text-md lg:text-lg mb-8">{excerpt}</p>
            <div className="text-gray-600 flex justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon className=" w-4 h-4 mr-1" icon={faClock} />

                <span>{read_duration} min read</span>
              </div>

              <span className="w-8 h-3 font-light mr-2 hover:text-blue-800">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default FeaturedBanner;
