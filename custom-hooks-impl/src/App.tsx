import { useState } from "react";

import "./App.css";

import PaginationDemo from "./example-components/PaginationDemo";

function App() {
  return (
    <>
      <PaginationDemo />;
      <hr className="border-t-4 border-dotted border-gray-300 rounded-xl shadow-xl w-[1300px] mx-auto" />
    </>
  );
}

export default App;
