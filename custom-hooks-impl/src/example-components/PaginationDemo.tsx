/*

Example Usage Component (PaginationDemo.tsx):

Create a component that uses your usePagination hook.
Simulate a list of items (e.g., an array of 100 numbers or strings).
Display the current page number, total pages, and the slice of items for the current page.
Include buttons for “Previous”, “Next”, and jumping to specific page numbers (if you wish to demonstrate setPage more thoroughly).
Disable Previous/Next buttons when canPrevPage or canNextPage is false.

*/

import usePagination from "../hooks/usePagination";

export default function PaginationDemo() {
  return (
    <>
      <div>
        <div>
          {" "}
          <h1> Pagination Demo</h1>
        </div>
        <div>
          <div> Items per page</div>
          <div> Total Items: </div>
        </div>
        <div>
          <p> this will display all the items</p>
        </div>
        <div>
          <div>previous</div>
          <div> Page 1 of 13</div>
          <div> next</div>
        </div>
        <div>
          <p>Showing items 1 - 10 (Total on this page: 10)</p>
        </div>
        <div>page tabs or buttons</div>
      </div>
      ;
    </>
  );
}
