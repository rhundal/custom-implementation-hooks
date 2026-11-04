### Project Objective

- The goal of this lab is to design and apply custom hooks to solve common problems like pagination and debouncing input

### Learning Objective

- Practice designing custom hooks, state management within hooks, handling dependencies, ensuring hooks are generic for reuse
- Effectively manage dependencies and side effects within custom Hooks.
- Return values and functions from custom Hooks for use in components correctly.
- Consider basic performance aspects (e.g., memoization) where applicable within custom Hooks.

#### My Fallback on AI for correction and reflecting on my mistakes

- At first, I implemented the entire usePagination hook myself
- I then asked chatGPT to evaluate my code for feedback out of curiosity, and it pointed out all my mistakes - basically my entire hook was wrong
- I then corrected those mistakes - make proper use of useEffect which where I thought the values after re-rendering would be carried over to the next render, remove incorrect use of stateVariables for derived values which should have been calculated at rendering
