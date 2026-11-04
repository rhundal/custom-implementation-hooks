/*
usePagination Hook
Objective: Create a hook to manage pagination logic for a list of items.

Functionality:


Return Values (Object):
currentPage: The current active page number.
totalPages: The total number of pages calculated based on totalItems and itemsPerPage.
startIndex: The starting index of items for the current page (0-based).
endIndex: The ending index of items for the current page (0-based).
itemsOnCurrentPage: The actual number of items on the current page (useful for the last page).
setPage(pageNumber): A function to jump to a specific page number.
nextPage(): A function to go to the next page.
prevPage(): A function to go to the previous page.
canNextPage: Boolean indicating if there is a next page.
canPrevPage: Boolean indicating if there is a previous page.

Implementation Details:

Calculate totalPages correctly (e.g., using Math.ceil).
Ensure currentPage does not go below 1 or above totalPages.
startIndex and endIndex should be calculated based on the currentPage and itemsPerPage.
itemsOnCurrentPage should correctly reflect the count for the last page if it’s not full.

*/

import { useEffect, useState } from "react";
interface PaginationObject {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  itemsOnCurrentPage: number;
  setPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

function usePagination(
  totalItems: number,
  itemsPerPage: number = 10,
  initialPage: number = 1,
): PaginationObject {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [itemsOnCurrentPage, setItemsOnCurrentPage] = useState(0);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPrevPage, setCanPrevPage] = useState(false);

  // I decided to have a useEffect for each calculation

  useEffect(() => {
    // 1. Calculate totalPages correctly (e.g., using Math.ceil)

    const totalPagesCalculated = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPagesCalculated);
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    // 2. Ensure currentPage does not go below 1 or above totalPages.

    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > 2 && currentPage < totalPages) {
      let prevPageNumber = currentPage;
      setCurrentPage(prevPageNumber + 1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages - 1);
    }

    const hasNext = currentPage < totalPages;
    const hasPrev = currentPage > 1;

    setCanNextPage(hasNext);
    setCanPrevPage(hasPrev);
  }, [totalPages]);

  useEffect(() => {
    // 3. startIndex and endIndex should be calculated based on the currentPage and itemsPerPage.

    setStartIndex(startIndex + itemsPerPage);
    setEndIndex(endIndex + startIndex); // because its 0 based
  }, [currentPage]);

  useEffect(() => {
    // 4. itemsOnCurrentPage should correctly reflect the count for the last page if it’s not full.

    let totalItemsDisplayed = currentPage * itemsPerPage;
    let numOfItemsOnLastPage = totalItems - totalItemsDisplayed;
    if (currentPage === totalPages) {
      setItemsOnCurrentPage(numOfItemsOnLastPage);
    } else {
      setItemsOnCurrentPage(itemsPerPage);
    }
  }, [currentPage]);

  function setPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function nextPage() {
    let pageNo = currentPage + 1;
    setCurrentPage(pageNo);
  }

  function prevPage() {
    let pageNo = currentPage - 1;
    setCurrentPage(pageNo);
  }

  let instancePaginationOb = {
    currentPage: currentPage,
    totalPages: totalPages,
    startIndex: startIndex,
    endIndex: endIndex,
    itemsOnCurrentPage: itemsOnCurrentPage,
    setPage: setPage,
    nextPage: nextPage,
    prevPage: prevPage,
    canNextPage: canNextPage,
    canPrevPage: canPrevPage,
  };

  return instancePaginationOb;
}
