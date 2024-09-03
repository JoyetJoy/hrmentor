import React from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const generatePageNumbers = () => {
    const visiblePageCount = 7;
    const halfVisiblePages = Math.floor(visiblePageCount / 2);
    const startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers();

  const goToEndPage = () => {
    setCurrentPage(totalPages);
    if (currentPage < totalPages) {
      // setCurrentPage(totalPages);
    }
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    // mt-10
    <div className="flex mt-4 pt-3 h-12 text-zinc-700  justify-end gap-10 items-center">
      <div className="flex gap-3 items-center px-5">
        <button
          style={{
            color: currentPage === 1 ? "#545454" : "#2E2E2E",
          }}
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
          className="left text-[#2E2E2E] text-[0.84rem] flex items-center justify-center font-medium"
        >
          Previous
        </button>
        {/* {currentPage > 4 && (
          <button
            style={{
              color: currentPage === 1 ? "#545454" : "#2E2E2E",
            }}
            disabled={currentPage === 1}
            onClick={goToFirstPage}
            className="left text-[#2E2E2E] text-[0.8rem] flex items-center justify-center font-medium"
          >
            Start ...
          </button>
        )} */}
        {pageNumbers.map((page) => (
          <button
            style={{
              backgroundColor: currentPage === page ? "#030E5C" : "",
              color: currentPage === page ? "#fff" : "",
            }}
            className="left text-[#2E2E2E] h-7 w-7 text-sm flex items-center justify-center rounded-full"
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        {console.log(totalPages - currentPage)}
        {/* {totalPages > 7 && totalPages - currentPage > 3 && (
          <button
            style={{
              color: currentPage === totalPages ? "#545454" : "#2E2E2E",
            }}
            onClick={goToEndPage}
            disabled={currentPage === totalPages}
            className="right text-[#2E2E2E] text-[0.8rem] font-medium flex items-center justify-center rounded-full"
          >
            ... End
          </button>
        )} */}
        <button
          style={{
            color: currentPage === totalPages ? "#545454" : "#2E2E2E",
          }}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="right text-[#2E2E2E] text-[0.84rem] font-medium flex items-center justify-center rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  );
}
