import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// Base API URL
const BASE_URL = "https://stealthlearn.in/imm-admin/api";

// Generic fetch function with error handling
const fetchApiData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from ${endpoint}: ${response.status}`
    );
  }

  return response.json();
};

// Preload images function
const preloadImages = (imageUrls) => {
  if (typeof window !== "undefined") {
    imageUrls.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }
};

// Hook for Placements data
export const usePlacementsData = (options = {}) => {
  return useQuery({
    queryKey: ["placements"],
    queryFn: () =>
      fetchApiData(
        `/indexPlacement.php?category=${encodeURIComponent("Summer Placement")}&count=10`
      ),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    select: (data) => {
      // Preload images after data is processed
      const imageUrls = data
        .flatMap((item) => [item.url, item.logo_url])
        .filter(Boolean);
      preloadImages(imageUrls);

      return data;
    },
    ...options,
  });
};

// Hook for Awards data (Refactored for efficiency)
export const useAwardsData = ({ count, ...options } = {}) => {
  const category = "Award";
  // The query key includes the parameters to ensure different requests are cached separately.
  const queryKey = ["awards", { category, count }];

  return useQuery({
    queryKey,
    queryFn: () => {
      // Build the query string dynamically.
      const params = new URLSearchParams();
      params.append('category', category);
      if (count) {
        params.append('count', count);
      }
      // fetchApiData will now call a URL like: /index.php?category=Award&count=5
      return fetchApiData(`/index.php?${params.toString()}`);
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    select: (data) => {
      // The backend has already done the filtering and limiting.
      // We just need to map the data to the format the component expects.
      const processedAwards = data.map((award) => ({
        ...award,
        id: award.id || Math.random().toString(36).substr(2, 9),
        image: award.url || `${BASE_URL}/uploads/${award.file_name}`,
        title: award.title || "",
      }));

      // Preload award images (this logic remains the same)
      const imageUrls = processedAwards
        .map((award) => award.image)
        .filter(Boolean);
      preloadImages(imageUrls);

      return processedAwards;
    },
    ...options,
  });
};
// Hook for Recruiters data
export const useRecruitersData = (
  category = "Home Page Recruiter",
  options = {}
) => {
  return useQuery({
    queryKey: ["recruiters", category],
    queryFn: () => fetchApiData("/indexRecruiter.php"),
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 45 * 60 * 1000, // 45 minutes
    select: (data) => {
      // Filter recruiters by category
      const filteredRecruiters = data.filter(
        (recruiter) => recruiter.category === category
      );

      // Transform data based on category
      let processedData;
      if (category === "Home Page Recruiter") {
        processedData = filteredRecruiters.map((recruiter) => ({
          src: recruiter.url,
          alt: recruiter.title,
        }));
      } else if (category === "Live Project Recruiter") {
        processedData = filteredRecruiters.map((item) => ({
          id: item.id,
          name: item.title,
          username: item.title,
          img: item.url,
        }));
      } else {
        // For campus recruitment categories
        processedData = filteredRecruiters.map((recruiter) => ({
          id: recruiter.id,
          name: recruiter.title,
          logo: recruiter.url,
          category: determineRecruitmentCategory(recruiter.category),
        }));
      }

      // Preload images
      const imageUrls = processedData
        .map((item) => item.src || item.img || item.logo)
        .filter(Boolean);
      preloadImages(imageUrls);

      return processedData;
    },
    ...options,
  });
};

// Hook for all recruitment categories (for campus recruitment page)
export const useAllRecruitersData = (options = {}) => {
  return useQuery({
    queryKey: ["recruiters", "all"],
    queryFn: () => fetchApiData("/indexRecruiter.php"),
    staleTime: 15 * 60 * 1000,
    cacheTime: 45 * 60 * 1000,
    select: (data) => {
      // Process all recruitment data
      const recruitersData = data
        .filter((recruiter) =>
          [
            "Home Page Recruiter",
            "Final Placement Recruiter",
            "Summer Internship Recruiter",
          ].includes(recruiter.category)
        )
        .map((recruiter) => ({
          id: recruiter.id,
          name: recruiter.title,
          logo: recruiter.url,
          category: determineRecruitmentCategory(recruiter.category),
        }));

      // Preload images
      const imageUrls = recruitersData.map((item) => item.logo).filter(Boolean);
      preloadImages(imageUrls);

      return recruitersData;
    },
    ...options,
  });
};

// Hook for EduTour data
export const useEduTourData = (options = {}) => {
  return useQuery({
    queryKey: ["edutour"],
    queryFn: () => fetchApiData("/indexEdutour.php"),
    staleTime: 20 * 60 * 1000, // 20 minutes (tour data changes less frequently)
    cacheTime: 60 * 60 * 1000, // 1 hour
    select: (data) => {
      // Process data for international and national tours
      const internationalTours = data
        .filter((tour) => tour.category === "International")
        .map((tour) => ({
          slider: false,
          category: tour.subcategory,
          title: tour.title,
          image: tour.url,
          mobileImage: tour.url,
          alt: tour.title || "Tour image",
          description: tour.description,
        }));

      const nationalTours = data
        .filter((tour) => tour.category === "National")
        .map((tour) => ({
          slider: false,
          category: tour.subcategory,
          title: tour.title,
          image: tour.url,
          mobileImage: tour.url,
          alt: tour.title || "Tour image",
          description: tour.description,
        }));

      // Preload images
      const allImages = [...internationalTours, ...nationalTours];
      const imageUrls = allImages
        .flatMap((tour) => [tour.image, tour.mobileImage])
        .filter(Boolean);
      preloadImages(imageUrls);

      return { internationalTours, nationalTours };
    },
    ...options,
  });
};

// Hook for Testimonials data
export const useTestimonialsData = (options = {}) => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => fetchApiData("/indexTestimonial.php"),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    select: (data) => {
      // Transform the API data to match component structure
      const transformedData = data.map((item) => ({
        id: parseInt(item.id || 0),
        image: item.url || "", // Fallback handled in component
        quote: "Watch my testimonial video",
        name: item.name || "IMM Student",
        position: item.position || "Student",
        rating: 4.5,
        videoLink: item.link || "https://www.youtube.com",
      }));

      // Preload images
      const imageUrls = transformedData
        .map((item) => item.image)
        .filter(Boolean);
      preloadImages(imageUrls);

      return transformedData;
    },
    ...options,
  });
};

// Hook for Banner images
export const useBannerData = (options = {}) => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () => fetchApiData("/indexBanner.php"),
    staleTime: 30 * 60 * 1000, // 30 minutes (banners change less frequently)
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
    select: (data) => {
      // Preload all banner images
      const imageUrls = data.map((item) => item.url).filter(Boolean);
      preloadImages(imageUrls);

      return data;
    },
    ...options,
  });
};

// Utility function to determine recruitment category
const determineRecruitmentCategory = (category) => {
  if (
    category === "Final Placement Recruiter" ||
    category === "Home Page Recruiter"
  ) {
    return "final";
  }
  return "internship";
};

// Custom hook to prefetch all landing page data
export const usePrefetchLandingData = () => {
  const placementsQuery = usePlacementsData({ enabled: false });
  const awardsQuery = useAwardsData({ enabled: false });
  const recruitersQuery = useRecruitersData("Home Page Recruiter", {
    enabled: false,
  });
  const liveProjectsQuery = useRecruitersData("Live Project Recruiter", {
    enabled: false,
  });
  const eduTourQuery = useEduTourData({ enabled: false });
  const testimonialsQuery = useTestimonialsData({ enabled: false });
  const bannersQuery = useBannerData({ enabled: false });

  return {
    prefetchAll: async () => {
      await Promise.all([
        placementsQuery.refetch(),
        awardsQuery.refetch(),
        recruitersQuery.refetch(),
        liveProjectsQuery.refetch(),
        eduTourQuery.refetch(),
        testimonialsQuery.refetch(),
        bannersQuery.refetch(),
      ]);
    },
    queries: {
      placements: placementsQuery,
      awards: awardsQuery,
      recruiters: recruitersQuery,
      liveProjects: liveProjectsQuery,
      eduTour: eduTourQuery,
      testimonials: testimonialsQuery,
      banners: bannersQuery,
    },
  };
};
