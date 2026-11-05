import { useState } from "react";

import "./App.css";

import PaginationDemo from "./example-components/PaginationDemo";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

function App() {
  let objToPass: PaginationProps = {
    totalItems: 50,
    itemsPerPage: 4,
    initialPage: 1,
  };
  return (
    <>
      <PaginationDemo {...objToPass} />
      ;
      <hr className="border-t-4 border-dotted border-gray-300 rounded-xl shadow-xl w-[1300px] mx-auto" />
    </>
  );
}

export default App;
