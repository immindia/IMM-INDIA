import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../lib/api";

export const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_ENDPOINTS.BASE}${endpoint}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(options)]);

  return { data, loading, error };
};

// Example usage with query parameters
export const useQueryFetch = (endpoint, queryParams = {}, options = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const fullEndpoint = `${endpoint}${queryString ? `?${queryString}` : ""}`;

  return useFetch(fullEndpoint, options);
};
