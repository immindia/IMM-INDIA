import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../lib/api";

/**
 * Custom hook to fetch and manage awards data from the API
 * @returns {Object} Awards data and loading state
 */
export const useAwardsData = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.AWARDS);

        if (!response.ok) {
          throw new Error("Failed to fetch awards");
        }

        const data = await response.json();

        // Filter and process awards
        const processedAwards = data.map((award) => ({
          ...award,
          id: award.id || Math.random().toString(36).substr(2, 9),
          image: award.url || `${API_ENDPOINTS.UPLOADS}/${award.file_name}`,
          title: award.title || "",
        }));

        setAwards(processedAwards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching awards:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  return { awards, loading, error };
};
