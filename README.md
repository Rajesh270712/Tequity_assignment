GitHub User Autocompleted
  This is a simple React-based autocomplete search that fetches and displays GitHub users based on the input query. The application is optimized for performance, structured cleanly into components, and follows best practices for API handling and UI responsiveness.
Deployed Link : https://688e66ca910bb1b95821d5d5--githubsearchfast.netlify.app/

Components / Flow
  AutoComplete.jsx
    This is the main component responsible for:
    Managing the state (query, users, error, loading)
    Debouncing user input using setTimeout
    Fetching data from GitHub API with fetchUsers()
    Caching results to avoid repeated API calls
    Handling aborted requests and network errors

  AutoCompleteInput.jsx
    A simple controlled input component that:
    Accepts value and onChange as props
    Updates the parent query state on every change

  AutoCompleteResults.jsx
    A component that receives a list of users and:
    Displays the list with avatar and username
    On click, opens the user’s GitHub profile in a new tab

Optimization techniques used
  Debounce input: Input is debounced with a 500ms delay before triggering the API call to reduce unnecessary requests.
  AbortController: Cancels the previous fetch request if a new one is initiated before it completes.
  API caching using useRef: Results for previously searched queries are cached in memory to avoid refetching.
  useCallback: Used to memoize the fetch function and prevent unnecessary re-renders.
  Query normalization: Trims and lowercases the query to standardize and reduce redundant API hits.
  Loading and error state management: Provides user feedback when data is being fetched or if something goes wrong.
  Component-based structure: Input and result rendering are split into reusable components to keep the code clean and maintainable.
