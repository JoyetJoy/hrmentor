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
    <div className="mt-4 flex h-12 items-center justify-end gap-10 pt-3 text-zinc-700">
      <div className="flex items-center gap-3 px-5">
        <button
          style={{
            color: currentPage === 1 ? "#545454" : "#2E2E2E",
          }}
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
          className="left flex items-center justify-center text-[0.84rem] font-medium text-[#2E2E2E]"
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            style={{
              backgroundColor: currentPage === page ? "#E95D39" : "",
              color: currentPage === page ? "#fff" : "",
            }}
            className="left flex h-7 w-7 items-center justify-center rounded-full text-sm text-[#2E2E2E]"
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button
          style={{
            color: currentPage === totalPages ? "#545454" : "#2E2E2E",
          }}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="right flex items-center justify-center rounded-full text-[0.84rem] font-medium text-[#2E2E2E]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
