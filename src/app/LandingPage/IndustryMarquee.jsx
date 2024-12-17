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
      name: "Mr. S. Swapnil",
      username: "Wipro Technologies, Pune",
      body: "Insightful contributions to technical processes and solutions.",
      img: img1,
    },
    {
      name: "Mr. Ishlesh Bhaskar",
      username: "HDFC Bank",
      body: "Engaging discussions on financial strategies and market insights.",
      img: img2,
    },
    {
      name: "Mr. Sanjeev Garg",
      username: "CEO, Reliance Communication, Punjab Circle",
      body: "Strategic contributions to communications and networking advancements.",
      img: img3,
    },
    {
      name: "Mr. Siddharth Bhardwaj",
      username: "Regional Director North, Adlabs Films Ltd, BIG 92.7 FM",
      body: "Valuable insights into media management and audience engagement.",
      img: img4,
    },
    {
      name: "Ms. Banmala Shardar",
      username: "HR, IRLE Kay Jay Rolls Pvt. Ltd, Panchkula",
      body: "Effective strategies for workforce management and development.",
      img: img5,
    },
    {
      name: "Mr. A.C. Cheema",
      username: "Cheema Boilers, Ropar",
      body: "Deep understanding of energy systems and boiler technologies.",
      img: img6,
    },
    {
      name: "Mr. Ravi Verma",
      username: "The Times of India",
      body: "Innovative approaches to media and journalism.",
      img: img7,
    },
    {
      name: "Mr. Sandeep Khosla",
      username: "Aditya Birla Retail Ltd",
      body: "Exceptional insights into retail management and customer satisfaction.",
      img: img8,
    },
    {
      name: "Mr. Varinder Verma",
      username: "Sr. Manager-personnel, Swaraj Engines Ltd, Mohali",
      body: "Advanced personnel management and team-building expertise.",
      img: img9,
    },
    {
      name: "Dr. R.K. Kalia",
      username: "G.M. (HRLADM), Amrit Banaspati Co. Ltd, Rajpur",
      body: "Strong leadership in HR and administrative management.",
      img: img10,
    },
    {
      name: "Mr. Sanjeev Updadhyay",
      username: "Sr. Manager HR, Cellebrum Technologies LTD",
      body: "Pioneering HR strategies for technological organizations.",
      img: img11,
    },
    {
      name: "Mr. Hreetesh Bhandari",
      username: "Manager-HR, ICICI Prudentical",
      body: "Forward-thinking HR management and employee engagement.",
      img: img12,
    },
    {
      name: "Mr. I.V. Rao",
      username: "Managing Executive Officer, Maruti Suzuki Pvt. Ltd",
      body: "Extensive knowledge in automotive industry leadership.",
      img: img13,
    },
    
    
  ];
  
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}) => {
  return (
    <figure
      className={cn(
        "relative h-max w-full cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="w-full"  alt="" src={img} />
        {/* <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-normal dark:text-white/40">{username}</p>
        </div> */}
      </div>
      {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
    </figure>
  );
};

export function IndustryMarquee() {
  return (
    <div className="relative flex h-[480px] w-full flex-row items-center justify-center overflow-hidden rounded-lg  bg-background ">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-white dark:from-background"></div>
    </div>
  );
}
