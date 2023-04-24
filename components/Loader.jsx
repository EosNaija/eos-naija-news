import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-4xl text-gray-500">
        <FontAwesomeIcon icon={faSpinner} spin />
        <h2 className="text-4xl text-gray-500">Loading Posts...</h2>
      </div>
    </div>
  );
};
export default Loader;
