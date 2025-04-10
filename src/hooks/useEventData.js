import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and manage event data from the API
 * @param {string} category - Optional category to filter events
 * @returns {Object} Event data and loading state
 */
export const useEventData = (category) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/index2.php?resource=events"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        // Process and filter events
        const processedEvents = data
          .filter((event) => (category ? event.category === category : true))
          .map((event) => ({
            ...event,
            id: event.id || Math.random().toString(36).substr(2, 9),
            photoCount: event.gallery ? event.gallery.length : 0,
            image: event.image.startsWith("http")
              ? event.image
              : `https://stealthlearn.in/imm-admin/api/${event.image}`,
            gallery: event.gallery
              ? event.gallery.map((img) =>
                  img.startsWith("http")
                    ? img
                    : `https://stealthlearn.in/imm-admin/api/${img}`
                )
              : [],
          }));

        setEvents(processedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  return { events, loading, error };
};
