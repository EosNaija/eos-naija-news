import { useState } from "react";
import { request, gql } from "graphql-request";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const query = gql`
      query SearchPosts($searchTerm: String!) {
        posts(
          where: {
            OR: [
              { title_contains: $searchTerm }
              { slug_contains: $searchTerm }
              { excerpt_contains: $searchTerm }
            ]
          }
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
    const data = await request(graphqlAPI, query, {
      searchTerm,
    });
    setSearchResults(data?.posts);
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(); // Call handleSearch function here
  };
  const showResult = searchTerm !== "" && searchResults.length > 1;
  return (
    <div className="p-3 w-1/3 hidden lg:flex rounded-3xl bg-gray-50 text-sm">
      <span className="small-icon">
        <FontAwesomeIcon className="w-5 h-5" icon={faSearch} />
      </span>
      <input
        className="outline-none w-full bg-gray-50 placeholder:text-xs placeholder:text-gray-700 placeholder:font-semibold"
        type="text"
        placeholder="Search...."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {/* <button onClick={handleSearch}>Search</button> */}
      {showResult && (
        <div className="lg:absolute relative top-24">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-md mb-2 font-semibold border-b pb-2">
              Results
            </h3>
            {searchResults.map((post) => (
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
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
