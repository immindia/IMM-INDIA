import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../lib/api";

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
          `${API_ENDPOINTS.EVENTS}&categories=${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        // Process, filter and sort events by date
        const processedEvents = data
          .filter((event) => (category ? event.category === category : true))
          .map((event) => ({
            ...event,
            id: event.id || Math.random().toString(36).substr(2, 9),
            photoCount: event.gallery ? event.gallery.length : 0,
            image: event.image.startsWith("http")
              ? event.image
              : `${API_ENDPOINTS.API}/${event.image}`,
            gallery: event.gallery
              ? event.gallery.map((img) =>
                  img.startsWith("http") ? img : `${API_ENDPOINTS.API}/${img}`
                )
              : [],
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order

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
