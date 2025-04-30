import { cn } from "@/lib/utils";
import Marquee from "../../components/ui/marquee";
import { useEffect, useState } from "react";

// Keep some fallback images in case the API fails
import img1 from "../../assets/live-projects/akalgroup.png";
import img6 from "../../assets/live-projects/hrtz.png";
import img12 from "../../assets/live-projects/reliance-digital.png";
import img13 from "../../assets/live-projects/tata_tech2.png";

const ReviewCard = ({ img, name, username }) => {
  return (
    <figure
      className={cn(
        "relative h-max w-full cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="w-full" alt={name} src={img} />
      </div>
    </figure>
  );
};

export function IndustryMarquee() {
  const [liveProjectRecruiters, setLiveProjectRecruiters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case the API fails
  const fallbackRecruiters = [
    {
      name: "Tata 1 MG",
      username: "Tata 1 MG",
      img: img13,
    },
    {
      name: "Reliance",
      username: "Reliance",
      img: img12,
    },
    {
      name: "Aditya Birla",
      username: "Aditya Birla",
      img: img1,
    },
    {
      name: "Herz",
      username: "Herz",
      img: img6,
    },
    {
      name: "Saudi Aramco",
      username: "Saudi Aramco",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Saudi_Aramco_logo.svg/200px-Saudi_Aramco_logo.svg.png",
    },
    {
      name: "Patanjali",
      username: "Patanjali",
      img: "https://www.patanjaliayurved.net/media/images/logo.svg",
    },
    {
      name: "Protivity",
      username: "Protivity",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Protiviti_logo.svg/330px-Protiviti_logo.svg.png",
    },
    {
      name: "Cavinkare",
      username: "Cavinkare",
      img: "https://cavinkare.com/wp-content/uploads/2017/01/logo.png",
    },
  ];

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexRecruiter.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recruiters");
        }
        const data = await response.json();

        // Filter for Live Project Recruiter category
        const filteredData = data.filter(
          (item) => item.category === "Live Project Recruiter"
        );

        // Map the data to the format needed for our component
        const formattedData = filteredData.map((item) => ({
          id: item.id,
          name: item.title,
          username: item.title,
          img: item.url,
        }));

        setLiveProjectRecruiters(
          formattedData.length > 0 ? formattedData : fallbackRecruiters
        );
      } catch (err) {
        console.error("Error fetching recruiters:", err);
        setError(err.message);
        setLiveProjectRecruiters(fallbackRecruiters);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  // Split the recruiters into two rows for the marquee
  const recruiters = isLoading ? fallbackRecruiters : liveProjectRecruiters;
  const firstRow = recruiters.slice(0, Math.ceil(recruiters.length / 2));
  const secondRow = recruiters.slice(Math.ceil(recruiters.length / 2));

  return (
    <div className="relative flex h-[480px] w-full flex-row items-center justify-center overflow-hidden rounded-lg bg-background">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>Error loading recruiters: {error}</p>
        </div>
      ) : (
        <>
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.id || review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.id || review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-white dark:from-background"></div>
        </>
      )}
    </div>
  );
}
