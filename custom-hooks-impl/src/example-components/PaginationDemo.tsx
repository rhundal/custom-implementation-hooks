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
      <div className="flex justify-center mt-15">
        <div className="border-2 border-gray-200 rounded-xl w-[45%] p-10">
          <div className="mb-10">
            <h1 className="text-center"> Pagination Demo</h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex justify-start"> Items per page: </div>
            <div className="flex justify-end"> Total Items: </div>
          </div>
          <div className="bg-slate-100/50 mt-5 mb-10">
            <p> this will display all the items</p>
          </div>
          <div className="mb-5">
            <div>previous</div>
            <div> Page 1 of 13</div>
            <div> next</div>
          </div>
          <div className="mb-3">
            <p>Showing items 1 - 10 (Total on this page: 10)</p>
          </div>
          <div>page tabs or buttons</div>
        </div>
      </div>
      ;
    </>
  );
}
