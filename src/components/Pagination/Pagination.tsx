import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPages } from "src/helpers";
import { IPagination } from "src/interfaces/interfaces";

const Pagination: FC<IPagination> = ({ pageType, currentPage }) => {
  const pagesCount = useSelector(({ pages }) => pages.pagesCount);
  const dispatch = useDispatch();
  const onPageClick = (page: number) => {
    if (pageType === "main") {
      dispatch({ type: "SET_CURRENT_PAGE_MAIN", payload: page });
    } else if (pageType === "latest") {
      dispatch({ type: "SET_CURRENT_PAGE_LATEST", payload: page });
    } else if (pageType === "search") {
      dispatch({ type: "SET_CURRENT_PAGE_SEARCH", payload: page });
    } else if (pageType === "filter") {
      dispatch({ type: "SET_CURRENT_PAGE_FILTER", payload: page });
    }
  };
  let pages: [] = [];
  createPages(pages, pagesCount, currentPage);
  return (
    <div className="pages">
      {currentPage > 5 ? (
        <span
          className={currentPage == 1 ? "current-page" : "page"}
          onClick={() => onPageClick(1)}
        >
          ↶1
        </span>
      ) : null}
      {pages.map((page, index) => (
        <span
          key={index}
          className={currentPage === page ? "current-page" : "page"}
          onClick={() => onPageClick(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
