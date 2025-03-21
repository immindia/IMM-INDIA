import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import AACSB from "@/assets/accreditationLogo/AACSB.webp";
import AICTE from "@/assets/accreditationLogo/AICTE.webp";
import AMDISA from "@/assets/accreditationLogo/AMDISA.webp";
import AUAP from "@/assets/accreditationLogo/AUAP.webp";
import GGU from "@/assets/accreditationLogo/GGU.webp";

const reviews = [

  {id: 1,
    img: AACSB,
  },
  {id: 2,
    img: AICTE,
  },
  {id: 3,
    img: AMDISA,
  },
  {id: 4,
    img: AUAP,
  },
  {id: 5,
    img: GGU,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01]  bg-white",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2 ">
        <img className="rounded max-w-40" src={img} />
      </div>
    </figure>
  );
};

export default function AccreditationLogo() {
  return (
    <div className="relative max-w-xl flex h-80 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:200px]  ">
      <div
        className="flex flex-row items-center gap-4 "
        style={{
          transform:
            "translateX(0px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Marquee>
       
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black via-black/50 to-black/0"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black via-black/50 to-black/0"></div>
      
    </div>
  );
}
