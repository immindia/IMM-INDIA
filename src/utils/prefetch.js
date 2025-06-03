import { QueryClient } from "@tanstack/react-query";

// Create a separate query client for prefetching
const prefetchQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Base API URL
const BASE_URL = "https://stealthlearn.in/imm-admin/api";

// Generic fetch function
const fetchApiData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from ${endpoint}: ${response.status}`
    );
  }
  return response.json();
};

// Prefetch functions for each API endpoint
export const prefetchLandingPageData = async () => {
  const prefetchPromises = [
    // Prefetch placements data
    prefetchQueryClient.prefetchQuery({
      queryKey: ["placements"],
      queryFn: () => fetchApiData("/indexPlacement.php"),
      staleTime: 10 * 60 * 1000,
    }),

    // Prefetch awards data
    prefetchQueryClient.prefetchQuery({
      queryKey: ["awards"],
      queryFn: () => fetchApiData("/index.php"),
      staleTime: 15 * 60 * 1000,
    }),

    // Prefetch recruiters data
    prefetchQueryClient.prefetchQuery({
      queryKey: ["recruiters", "Home Page Recruiter"],
      queryFn: () => fetchApiData("/indexRecruiter.php"),
      staleTime: 15 * 60 * 1000,
    }),

    // Prefetch live project recruiters
    prefetchQueryClient.prefetchQuery({
      queryKey: ["recruiters", "Live Project Recruiter"],
      queryFn: () => fetchApiData("/indexRecruiter.php"),
      staleTime: 15 * 60 * 1000,
    }),

    // Prefetch EduTour data
    prefetchQueryClient.prefetchQuery({
      queryKey: ["edutour"],
      queryFn: () => fetchApiData("/indexEdutour.php"),
      staleTime: 20 * 60 * 1000,
    }),

    // Prefetch testimonials
    prefetchQueryClient.prefetchQuery({
      queryKey: ["testimonials"],
      queryFn: () => fetchApiData("/indexTestimonial.php"),
      staleTime: 10 * 60 * 1000,
    }),
  ];

  try {
    await Promise.allSettled(prefetchPromises);
    console.log("✅ Landing page data prefetched successfully");
  } catch (error) {
    console.warn("⚠️ Some prefetch requests failed:", error);
  }
};

// Prefetch critical images
export const prefetchCriticalImages = () => {
  const criticalImages = [
    // Add any critical background images or hero images here
    "/src/assets/landing/Placement-Banner.jpg",
    "/src/assets/awards/leaf.png",
  ];

  criticalImages.forEach((imageUrl) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageUrl;
    document.head.appendChild(link);
  });
};

// Main prefetch function to call on app initialization
export const initializePrefetch = () => {
  // Start prefetching after a short delay to not block initial render
  setTimeout(() => {
    prefetchLandingPageData();
    prefetchCriticalImages();
  }, 100);
};
