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
  itemsPerPage?: number;
  initialPage?: number;
}

export default function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: PaginationProps): PaginationObject {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // I decided to have a useEffect for each calculation initially. But my decision was wrong,
  // I misunderstood the role of useEffect and so I removed the derived values from useEffect so they are calculated during rendering instead.

  let totalPagesCalculated = 0;
  let startIndex = 0,
    endIndex = 0;
  let itemsOnCurrentPage = 0;
  let canNextPage = false,
    canPrevPage = false;

  // 1. Calculate totalPages correctly (e.g., using Math.ceil)

  const safeTotalItems = Math.max(0, totalItems);
  const safeItemsPerPage = Math.max(1, itemsPerPage);

  totalPagesCalculated = Math.max(
    1,
    Math.ceil(safeTotalItems / safeItemsPerPage),
  );

  canNextPage = currentPage < totalPagesCalculated;
  canPrevPage = currentPage > 1;

  useEffect(() => {
    // 2. Ensure currentPage does not go below 1 or above totalPages.

    if (currentPage > totalPagesCalculated) {
      setCurrentPage(totalPagesCalculated);
    }

    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPagesCalculated, currentPage]);

  // 3. startIndex and endIndex should be calculated based on the currentPage and itemsPerPage.

  startIndex = (currentPage - 1) * itemsPerPage;
  endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // 4. itemsOnCurrentPage should correctly reflect the count for the last page if it’s not full.

  itemsOnCurrentPage = Math.max(
    0,
    Math.min(itemsPerPage, totalItems - startIndex),
  );

  function setPage(pageNumber: number) {
    const clampedPage = Math.min(Math.max(1, pageNumber), totalPagesCalculated);

    setCurrentPage(clampedPage);
  }

  function nextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPagesCalculated));
  }

  function prevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
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
