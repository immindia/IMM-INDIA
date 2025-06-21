import img1 from "../../assets/awards/Aims.webp";
import img2 from "../../assets/awards/Best B-School.webp";
import img3 from "../../assets/awards/Best Business School.webp";
import img4 from "../../assets/awards/Economic Times.webp";
import img5 from "../../assets/awards/Centre of Academic.webp";
import img6 from "../../assets/awards/award (1).webp";
import img7 from "../../assets/awards/award (2).webp";
import img8 from "../../assets/awards/award (3).webp";
import img9 from "../../assets/awards/award (4).webp";
import img10 from "../../assets/awards/award (5).webp";
import img11 from "../../assets/awards/award (6).webp";
import img12 from "../../assets/awards/award (7).webp";
import img13 from "../../assets/awards/award (8).webp";
import img14 from "../../assets/awards/award (9).webp";
import img15 from "../../assets/awards/award (10).webp";
import img16 from "../../assets/awards/award (11).webp";
import img17 from "../../assets/awards/award (12).webp";
import img18 from "../../assets/awards/award (13).webp";
import img19 from "../../assets/awards/award (14).webp";
// import img20 from "../../assets/awards/award (15).webp";
// import img21 from "../../assets/awards/award (16).webp";
// import img22 from "../../assets/awards/award (17).webp";

export const cards = [
  {
    title: "AIMS Innovation Award",
    image: img1,
  },
  {
    title: "Best B-School",
    image: img2,
  },
  {
    title: "Best Business School with Excellent Placement Record",
    image: img3,
  },
  {
    title: "Economic Times Most Promising Brand",
    image: img4,
  },
  {
    title: "Centre of Academic Excellence (B School) from Delhi NCR",
    image: img5,
  },
  {
    title: "Best B-School",
    image: img6,
  },
  {
    title: "Bharat Leadership Excellence Award - Leadership Federation",
    image: img7,
  },
  {
    title: "Excellence in Digital Education & Innovation - AdorComm",
    image: img8,
  },
  {
    title:
      "Top & Most Innovative Private Business School - National Education Excellence Awards",
    image: img9,
  },
  {
    title:
      "Outstanding Performance in Virtual Knowledge Delivery During Pandemic - Begin Up Research Intelligence",
    image: img10,
  },
  {
    title: "Iconic Leadership in Higher Education - AdorComm",
    image: img11,
  },
  {
    title: "Consumers Chosen India's Best Brands - WCRC Leaders",
    image: img12,
  },
  {
    title:
      "Top 10 Sales & Marketing Colleges in India - Higher Education Review",
    image: img13,
  },
  {
    title: "Most Innovative Institute in Global Collaboration - AdorComm",
    image: img14,
  },
  {
    title:
      "Top 10 Promising Colleges Providing Logistics & Supply Chain Management Programs - Higher Education Review",
    image: img15,
  },
  {
    title: "Best B-School of the Year - ASSOCHAM",
    image: img16,
  },
  {
    title: "Institution of Excellence - International Education Pride Awards",
    image: img17,
  },
  {
    title:
      "Extraordinaire Business School - Business Connect at International Corporate Connect",
    image: img18,
  },
  {
    title: "Media Innovator Award - Corporate Vision",
    image: img19,
  },
  // {
  //   title:
  //     "India's Best Brands & Leaders Chosen by Consumers - WCRCINT & WCRC Leaders",
  //   image: img20,
  // },
  // {
  //   title: "Excellence in Student Outreach & Industry Engagement - ArdorComm",
  //   image: img21,
  // },
  // {
  //   title: "Business School of the Year - The Academic Insights",
  //   image: img22,
  // },
];

import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/api";

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
        const response = await fetch(API_ENDPOINTS.GALLERY);

        if (!response.ok) {
          throw new Error("Failed to fetch awards");
        }

        const data = await response.json();

        // Filter awards and process data
        const processedAwards = data
          .filter((item) => item.category === "Award")
          .map((award) => ({
            ...award,
            id: award.id,
            title: award.title,
            image: award.url,
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
