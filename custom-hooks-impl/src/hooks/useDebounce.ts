/*
useDebounce Hook
Objective: Create a hook to debounce a rapidly changing value.

Functionality:

Inputs:
value: The value to debounce (e.g., a search string from an input field).
delay: The debounce delay in milliseconds (default to 500ms).
Return Value:
debouncedValue: The value after the debounce delay has passed without value changing.

Implementation Details:

Use useState to store the debouncedValue.
Use useEffect to set up a timer (setTimeout) whenever the input value or delay changes.
The effect should clear the timer (using clearTimeout) if value or delay changes before the timer fires (this is the core of debouncing).
When the timer finally fires, update the debouncedValue state.

*/
