import { TableDataContext } from "@/context/TableContext";
import { useContext } from "react";

const Pagination = () => {
  const { page, setPage, rowsLength, maxRows } = useContext(TableDataContext);
  const totalPages = Math.ceil(rowsLength / maxRows);
  const maxVisiblePages = 4;

  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pagination = Array.from({ length: endPage - startPage + 1 }).map(
    (_, index) => {
      const pageNumber = startPage + index;

      return (
        <li
          className={`pagination-item ${page === pageNumber ? "active" : ""}`}
          onClick={() => setPage(pageNumber)}
          key={index}
        >
          {pageNumber}
        </li>
      );
    }
  );

  return (
    <>
      {startPage > 1 && (
        <li className="pagination-item" onClick={() => setPage(1)}>
          {1}
        </li>
      )}
      {pagination}
      {endPage < totalPages && (
        <li className="pagination-item" onClick={() => setPage(totalPages)}>
          {totalPages}
        </li>
      )}
    </>
  );
};

export default Pagination;
