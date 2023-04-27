import React from "react";
import moment from "moment/moment";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="bg-white shadow-lg cursor-pointer rounded-lg p-0 lg:p-1 md:mr-4 pb-12 mb-8 ">
        <div className="relative overflow-hidden shadow-md pb-64 mb-2">
          <img
            className="object-top absolute h-64 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
            src={post.featuredImage.url}
            alt={post.title}
          />
        </div>
        <h2 className="transition ml-2 duration-700 text-center md:text-left mb-2 cursor-pointer hover:text-green-600 text-md md:text-lg font-semibold">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="flex text-center items-center justify-evenly mb-2 w-full">
          <div className="flex ml-auto mr-auto md:ml-2 font-medium text-center text-xs text-gray-700">
            <span className="w-3 h-3 mr-2 text-green-500 hover:text-green-600">
              <FontAwesomeIcon className="w-4 h-4" icon={faUser} />
            </span>
            <span>By {post.author.name}</span>
          </div>
          <div className="font-medium mr-auto ml-2 text-xs text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline mr-2 text-green-500 hover:text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <p className="text-center md:text-left text-xs text-gray-900 font-normal px-2 lg:px-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex w-fit ml-auto md:ml-2 mr-auto transition duration-500 text-white p-1 bg-green-500 hover:bg-green-600 rounded-full font-medium text-xs px-2 py-2 cursor-pointer text-center mb-2">
          <FontAwesomeIcon className=" w-3 h-3 mr-1" icon={faClock} />
          <Link href={`/post/${post.slug}`}>
            <span>{post.read_duration} min read</span>
          </Link>
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
