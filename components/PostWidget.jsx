import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import Image from "next/image";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-md mb-2 font-semibold border-b pb-2">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div className="flex items-center w-full mb-2" key={post.title}>
          <div className="w-14 flex-none">
            <Image
              unoptimized
              src={post.featuredImage.url}
              alt={post.title}
              className="align-middle rounded-full"
              height="45px"
              width="45px"
            />
          </div>
          <div className="flex-grow ml-1 text-sm">
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-xs link"
            >
              {post.title}
            </Link>
            <p className="text-gray-500 text-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
