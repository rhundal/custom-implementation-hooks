/*
usePagination Hook
Objective: Create a hook to manage pagination logic for a list of items.

Functionality:

Inputs:
totalItems: The total number of items to be paginated.
itemsPerPage: The number of items to display per page (default to 10).
initialPage: The page to start on (default to 1).
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
