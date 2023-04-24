import Link from "next/link";

function Pagination({ currentPage, numPages }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  return (
    <div className="flex justify-between mt-6">
      {!isFirstPage && (
        <Link href={prevPage}>
          <a className="text-blue-500 hover:text-blue-700 font-bold">
            ← Previous
          </a>
        </Link>
      )}
      <div className="text-gray-700">
        Page {currentPage} of {numPages}
      </div>
      {!isLastPage && (
        <Link href={nextPage}>
          <a className="text-blue-500 hover:text-blue-700 font-bold">Next →</a>
        </Link>
      )}
    </div>
  );
}

export default Pagination;
