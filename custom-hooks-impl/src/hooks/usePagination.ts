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

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage: number;
}

export default function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: PaginationProps): PaginationObject {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // I decided to have a useEffect for each calculation

  let totalPagesCalculated = 0;
  let startIndex = 0,
    endIndex = 0;
  let itemsOnCurrentPage = 0;
  let canNextPage = false,
    canPrevPage = false;
  let totalItemsDisplayed = 0;
  let numOfItemsOnLastPage = 0;

  useEffect(() => {
    // 1. Calculate totalPages correctly (e.g., using Math.ceil)

    totalPagesCalculated =
      totalItems > 0 && itemsPerPage >= 1
        ? Math.ceil(totalItems / itemsPerPage)
        : 0;
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    // 2. Ensure currentPage does not go below 1 or above totalPages.

    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > 2 && currentPage < totalPagesCalculated) {
      let prevPageNumber = currentPage;
      setCurrentPage(prevPageNumber + 1);
    } else if (currentPage > totalPagesCalculated) {
      setCurrentPage(totalPagesCalculated - 1);
    }

    const hasNext = currentPage < totalPagesCalculated;
    const hasPrev = currentPage > 1;

    canNextPage = hasNext;
    canPrevPage = hasPrev;
  }, [totalPagesCalculated, currentPage]);

  useEffect(() => {
    // 3. startIndex and endIndex should be calculated based on the currentPage and itemsPerPage.

    startIndex = startIndex + itemsPerPage;
    endIndex = endIndex + startIndex;
  }, [currentPage]);

  useEffect(() => {
    // 4. itemsOnCurrentPage should correctly reflect the count for the last page if it’s not full.

    totalItemsDisplayed = currentPage * itemsPerPage;
    numOfItemsOnLastPage = totalItems - totalItemsDisplayed;
    if (currentPage === totalPagesCalculated) {
      itemsOnCurrentPage = numOfItemsOnLastPage;
    } else {
      itemsOnCurrentPage = itemsPerPage;
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
    totalPages: totalPagesCalculated,
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
