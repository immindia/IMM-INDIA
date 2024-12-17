import { cn } from "@/lib/utils";
import Marquee from "../../components/ui/marquee";

// Import images
import img1 from "../../assets/live-projects/akalgroup.png";
import img2 from "../../assets/live-projects/beneton.png";
import img3 from "../../assets/live-projects/casback.png";
import img4 from "../../assets/live-projects/chatter.png";
import img5 from "../../assets/live-projects/hcl.png";
import img6 from "../../assets/live-projects/hrtz.png";
import img7 from "../../assets/live-projects/jio.png";
import img8 from "../../assets/live-projects/mankind.png";
import img9 from "../../assets/live-projects/panta.png";
import img10 from "../../assets/live-projects/pathkind.png";
import img11 from "../../assets/live-projects/pladis.png";
import img12 from "../../assets/live-projects/reliance-digital.png";
import img13 from "../../assets/live-projects/tata_tech2.png";

const reviews = [
    {
      img: img1,
    },
    {
      img: img2,
    },
    {
      img: img3,
    },
    {
      img: img4,
    },
    {
      img: img5,
    },
    {
      img: img6,
    },
    {
      img: img7,
    },
    {
      img: img8,
    },
    {
      img: img9,
    },
    {
      img: img10,
    },
    {
      img: img11,
    },
    {
      img: img12,
    },
    {
      img: img13,
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }) => {
  return (
    <figure
      className={cn(
        "relative h-max w-full cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="w-full"  alt="" src={img} />
      </div>
    </figure>
  );
};

export function IndustryMarquee() {
  return (
    <div className="relative flex h-[480px] w-full flex-row items-center justify-center overflow-hidden rounded-lg  bg-background ">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.img} img={review.img} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.img} img={review.img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-white dark:from-background"></div>
    </div>
  );
}
