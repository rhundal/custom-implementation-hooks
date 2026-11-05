/*
Example Usage Component (DebounceSearchDemo.tsx):

Create a component with an input field.
As the user types into the input, use the useDebounce hook to get the debounced version of the input’s value.
Display both the current input value and the debounced value.
You can simulate an API call or filtering action whenever the debouncedValue changes by logging to the console (e.g., “Searching for: [debouncedValue]”).

*/
import { useState, useEffect } from "react";

import useDebounce from "../hooks/useDebounce";

export default function DebounceSearchDemo() {
  // 1. Local state to track the raw, immediate user input
  const [inputValue, setInputValue] = useState("");

  // 2. Pass the immediate value and 500ms delay into your custom hook
  const { debounceValue } = useDebounce({ value: inputValue, delay: 500 });

  useEffect(() => {
    // Prevent logging/fetching if the input is completely empty
    if (!debounceValue.trim()) {
      return;
    }

    // Simulate an API network request
    console.log(`Searching for: "${debounceValue}"`);
  }, [debounceValue]);
  const isSearching =
    inputValue.trim() !== debounceValue.trim() && inputValue.trim() !== "";
  return (
    <>
      <div className="flex justify-center border-2 border-white rounded-md bg-gray-300 w-[700px] mt-10 p-6 text-black mx-auto mb-20">
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="flex justify-center">
            <h1 className="text-xl font-bold">Debounce Search Demo</h1>
          </div>

          <div className="border border-gray-600 rounded">
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full p-2 text-black rounded bg-white outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="text-sm text-gray-300">
            <span className="font-semibold text-black">Current Input:</span>{" "}
            {inputValue}
          </div>

          <div className="text-sm text-gray-300">
            <span className="font-semibold text-black">
              Debounced Value (after 500ms): {debounceValue}
            </span>
          </div>
          <div className="mt-2 space-y-3 text-sm">
            <div className="text-black font-medium">
              {isSearching ? "Searching..." : "Simulated Search Results:"}
            </div>
            {/* Rendered List Array Group */}
            <ul className="space-y-2 list-disc pl-5 text-black">
              <li className="marker:text-black">
                Result for "{debounceValue}": Item 1
              </li>
              <li className="marker:text-black">
                Result for "{debounceValue}": Item 2
              </li>
              <li className="marker:text-black">
                Result for "{debounceValue}": Item 3
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
