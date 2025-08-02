import "../Styles/AutoComplete.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { AutoCompleteInput } from "./AutoCompleteInput";
import { AutoCompleteResults } from "./AutoCompleteResults";
const DELAY = 500;
const AutoComplete = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const cacheRef = useRef({}); // Stores previous query results
  const [loading, setLoading] = useState(false);


  const fetchUsers = useCallback(async (signal) => {
    if (query.trim().length === 0) {
      setUsers([]);
      setLoading(false);
      return;
    }

    if (cacheRef.current[query]) {
      setUsers(cacheRef.current[query]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // start loading
      const result = await fetch(`https://api.github.com/search/users?q=${query}`, { signal });
      if (!result.ok) throw new Error("Failed to fetch users");

      const data = await result.json();
      cacheRef.current[query] = data?.items || [];
      setUsers(data?.items || []);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    } finally {
      setLoading(false); // stop loading regardless of success or error
    }
  }, [query]);


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let timerId = setTimeout(() => {
      fetchUsers(signal);
    }, DELAY);

    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="autocomplete-container">
      <AutoCompleteInput value={query} onChange={setQuery} />
      {error && <div className="error-message">{error}</div>}
      {users.length > 0 && <AutoCompleteResults users={users} loading={loading} />}
    </div>
  );
};

export default AutoComplete;