/*

Example Usage Component (PaginationDemo.tsx):

Create a component that uses your usePagination hook.
Simulate a list of items (e.g., an array of 100 numbers or strings).
Display the current page number, total pages, and the slice of items for the current page.
Include buttons for “Previous”, “Next”, and jumping to specific page numbers (if you wish to demonstrate setPage more thoroughly).
Disable Previous/Next buttons when canPrevPage or canNextPage is false.

*/

import { useState, useEffect } from "react";
import usePagination from "../hooks/usePagination";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export default function PaginationDemo(props: PaginationProps) {
  let objectReceived: PaginationProps = {
    totalItems: props.totalItems,
    itemsPerPage: props.itemsPerPage,
    initialPage: props.initialPage,
  };

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination(objectReceived);

  let totalDisplayed = 0;

  let totalPagesArray: number[] = [5, 10, 15, 20];

  const [itemsToDisplay, setItemsToDisplay] = useState(itemsOnCurrentPage); // items to display per page by user selection
  const [currPageNo, setCurrPageNo] = useState(currentPage);

  function handleItemsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    let selectedValue = e.target.value;
    setItemsToDisplay(Number(selectedValue));
  }

  function handlePageChange(
    e: React.MouseEvent<HTMLButtonElement>,
    pageNumber: number,
  ) {
    e.preventDefault();
    setCurrPageNo(pageNumber);
    console.log(pageNumber);
    setPage(pageNumber);
  }

  return (
    <>
      <div className="flex justify-center mt-15">
        <div className="border-2 border-gray-200 rounded-xl w-[45%] p-10">
          <div className="mb-10">
            <h1 className="text-center"> Pagination Demo</h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex justify-start flex flex-row gap-2">
              <div> Items per page: </div>
              <div>
                <select
                  value={itemsToDisplay}
                  className="rounded-lg border border-gray-300 px-1 p1-2 bg-white text-black"
                  onChange={(e) => handleItemsChange(e)}
                >
                  <option value=""> Select a value</option>
                  {totalPagesArray.map((pageNumber) => (
                    <option key={pageNumber} value={pageNumber}>
                      {pageNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              Total Items: {props.totalItems}
            </div>
          </div>
          <div className="bg-slate-100/50 mt-5 mb-10">
            <ul>
              {(() => {
                const listItems = [];
                let computedValue = startIndex;
                for (let i = 0; i < itemsToDisplay; i++) {
                  const currentItemNumber = computedValue + i + 1;

                  listItems.push(
                    <li key={i}>
                      {currentItemNumber}. Item {currentItemNumber}
                    </li>,
                  );
                }
                return listItems;
              })()}
            </ul>
          </div>
          <div className="mb-5 flex flex-row justify-between">
            <div>
              <button onClick={prevPage}>Previous</button>
            </div>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <div>
              <button onClick={nextPage}>Next</button>
            </div>
          </div>
          <div className="mb-3">
            <p>
              Showing items {currentPage} - {itemsToDisplay} (Total on this
              page: {itemsToDisplay})
            </p>
          </div>
          <div className="flex justify-center">
            {(() => {
              const pageButtons = [];

              for (let x = 1; x <= totalPages; x++) {
                pageButtons.push(
                  <button
                    onClick={(e) => handlePageChange(e, x)}
                    key={x}
                    className={`ml-3 rounded-md w-6 ${currPageNo === x} ? bg-blue-200 : bg-gray-300/50`}
                  >
                    {x}
                  </button>,
                );
              }

              return pageButtons; // 3. Return the complete array of buttons
            })()}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
