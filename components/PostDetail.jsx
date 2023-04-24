import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, type, obj) => {
    let modifiedText = text;
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }
      if (obj.italics) {
        modifiedText = <p key={index}>{text}</p>;
      }
      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }
    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {obj.text}
          </h3>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {obj.text}
          </h4>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {obj.text}
          </p>
        );
      case "image":
        return (
          <img
            src={obj.src}
            alt={obj.title}
            key={index}
            width={obj.width}
            height={obj.height}
          />
        );

      default:
        return modifiedText;
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:p-0">
        <div className="flex text-center items-center justify-evenly mb-2 w-full">
          <div className="flex mr-auto ml-2 font-medium text-center text-xs text-gray-700">
            <span className="w-3 h-3 mr-2 text-blue-500 hover:text-blue-800">
              <FontAwesomeIcon className="w-4 h-4" icon={faUser} />
            </span>
            <span>By {post.author.name}</span>
          </div>
          <div className="font-medium mr-auto ml-2 text-xs text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline mr-2 text-blue-500 hover:text-blue-800"
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
        <h1 className=" mb-8 text-2xl md:text-3xl font-semibold">
          {post.title}
        </h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
