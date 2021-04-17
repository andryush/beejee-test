import React from "react";
import { default as MaterialPagination } from "@material-ui/lab/Pagination";

export default function Pagination({
  currentPage,
  maxPageCount,
  updateCurrentPage,
}) {
  return (
    <MaterialPagination
      page={currentPage}
      count={maxPageCount}
      color="primary"
      onChange={updateCurrentPage}
    />
  );
}
