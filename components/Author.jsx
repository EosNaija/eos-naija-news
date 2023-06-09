import React from "react";
import Image from "next/image";
const Author = ({ author }) => {
  return (
    <div className="text-center relative mt-20 mb-8 p-12  bg-green-600  hover:bg-green-700">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized
          className="align-middle rounded-full"
          src={author.photo.url}
          alt={author.name}
          height="100px"
          width="100px"
        />
      </div>
      <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
