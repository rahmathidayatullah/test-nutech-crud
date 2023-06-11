import React from "react";
import ReactPaginate from "react-paginate";
import { number, func } from "prop-types";

export default function Pagination({ pageCount, changePage }) {
  return (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName="paginationBttns"
      previousLinkClassName="previousBttn"
      nextLinkClassName="nextBttn"
      className="wrapper-paginate"
      disabledClassName="paginationDisabled"
      activeClassName="paginationActive"
    />
  );
}

Pagination.propTypes = {
  pageCount: number.isRequired,
  changePage: func,
};

Pagination.defaultProps = {
  changePage: () => null,
};
