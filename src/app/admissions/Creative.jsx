import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import img1 from "@/assets/admissions/creative (1).webp";
import img2 from "@/assets/admissions/creative (2).webp";
import img3 from "@/assets/admissions/creative (3).webp";
import img4 from "@/assets/admissions/creative (4).webp";
import img5 from "@/assets/admissions/creative (5).webp";
import img6 from "@/assets/admissions/creative (6).webp";
import img7 from "@/assets/admissions/creative (7).webp";
import img8 from "@/assets/admissions/creative (8).webp";

const reviews = [
  {
    id: 1,
    img: img1,
  },
  {
    id: 2,
    img: img2,
  },
  {
    id: 3,
    img: img3,
  },
  {
    id: 4,
    img: img4,
  },
  {
    id: 5,
    img: img5,
  },
  {
    id: 6,
    img: img6,
  },
  {
    id: 7,
    img: img7,
  },
  {
    id: 8,
    img: img8,
  },
];

const ReviewCard = ({
  img,
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-max cursor-pointer overflow-hidden    transition-all duration-300 rounded-xl border  p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] bg-white",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row justify-center items-center gap-2 ">
        <img className="rounded  h-60 sm:h-96" src={img} />
      </div>
    </figure>
  );
};

export function Creative() {
  return (
    <div className="relative flex sm:max-w-7xl max-w-[95%] mx-auto py-4 sm:py-10 flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]" >
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      {/* <Marquee pauseOnHover reverse className="[--duration:5s]">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee> */}
      
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6  bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
    </div>
  );
}

export default Creative;
