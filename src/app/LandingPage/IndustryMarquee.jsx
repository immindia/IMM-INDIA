import { cn } from "@/lib/utils";
import Marquee from "../../components/ui/marquee";
import { useRecruitersData } from "../../hooks/useApiData";

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
  // Fallback data in case the API fails
  const fallbackRecruiters = [
    {
      id: 1,
      name: "Tata 1 MG",
      username: "Tata 1 MG",
      img: img13,
    },
    {
      id: 2,
      name: "Reliance",
      username: "Reliance",
      img: img12,
    },
    {
      id: 3,
      name: "Aditya Birla",
      username: "Aditya Birla",
      img: img1,
    },
    {
      id: 4,
      name: "Herz",
      username: "Herz",
      img: img6,
    },
    {
      id: 5,
      name: "Saudi Aramco",
      username: "Saudi Aramco",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Saudi_Aramco_logo.svg/200px-Saudi_Aramco_logo.svg.png",
    },
    {
      id: 6,
      name: "Patanjali",
      username: "Patanjali",
      img: "https://www.patanjaliayurved.net/media/images/logo.svg",
    },
    {
      id: 7,
      name: "Protivity",
      username: "Protivity",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Protiviti_logo.svg/330px-Protiviti_logo.svg.png",
    },
    {
      id: 8,
      name: "Cavinkare",
      username: "Cavinkare",
      img: "https://cavinkare.com/wp-content/uploads/2017/01/logo.png",
    },
  ];

  const {
    data: liveProjectRecruiters = fallbackRecruiters,
    isLoading,
    error,
  } = useRecruitersData("Live Project Recruiter");

  // Use fallback data if API fails or is loading
  const recruiters =
    isLoading || error ? fallbackRecruiters : liveProjectRecruiters;

  // Split the recruiters into two rows for the marquee
  const firstRow = recruiters.slice(0, Math.ceil(recruiters.length / 2));
  const secondRow = recruiters.slice(Math.ceil(recruiters.length / 2));

  return (
    <div className="relative flex h-[480px] w-full flex-row items-center justify-center overflow-hidden rounded-lg bg-background">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
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
          {error && (
            <div className="absolute top-2 right-2 text-xs text-red-500 bg-white/80 px-2 py-1 rounded">
              Using cached data
            </div>
          )}
        </>
      )}
    </div>
  );
}
