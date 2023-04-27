import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const PostDetail = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:p-0 ">
        <div className="flex text-center items-center justify-evenly mb-2 w-full">
          <div className="flex mr-auto ml-2 font-medium text-center text-sm text-gray-700">
            <span className="w-3 h-3 mr-2  text-green-600 hover:text-green-700">
              <FontAwesomeIcon className="w-4 h-4" icon={faUser} />
            </span>
            <span>By {post.author.name}</span>
          </div>
          <div className="font-medium mr-auto ml-2 text-sm text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline text-green-600 mr-2 hover:text-green-700"
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
        <h1 className=" mb-6 text-2xl mt-1 md:text-3xl font-semibold">
          {post.title}
        </h1>
        <div className="markdown max-w-screen-md mx-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, { singleTilde: false }]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
