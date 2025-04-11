import { cn } from "@/lib/utils";
import Marquee from "../../components/ui/marquee";

// Import images
import img1 from "../../assets/live-projects/akalgroup.png";
// import img2 from "../../assets/live-projects/beneton.png";
// import img3 from "../../assets/live-projects/casback.png";
// import img4 from "../../assets/live-projects/chatter.png";
// import img5 from "../../assets/live-projects/hcl.png";
import img6 from "../../assets/live-projects/hrtz.png";
// import img7 from "../../assets/live-projects/jio.png";
// import img8 from "../../assets/live-projects/mankind.png";
// import img9 from "../../assets/live-projects/panta.png";
// import img10 from "../../assets/live-projects/pathkind.png";
// import img11 from "../../assets/live-projects/pladis.png";
import img12 from "../../assets/live-projects/reliance-digital.png";
import img13 from "../../assets/live-projects/tata_tech2.png";

const reviews = [
    {
      name: "Mr. S. Swapnil",
      username: "Tata 1 MG",
      body: "Insightful contributions to technical processes and solutions.",
      img: img13, // Updated to match the imported image name
    },
    {
      name: "Mr. Ishlesh Bhaskar",
      username: "Reliance",
      body: "Engaging discussions on financial strategies and market insights.",
      img: img12, // Updated to match the imported image name
    },
    {
      name: "Mr. Sanjeev Garg",
      username: "Aditya Birla",
      body: "Strategic contributions to communications and networking advancements.",
      img: img1, // Updated to match the imported image name
    },
    {
      name: "Mr. Siddharth Bhardwaj",
      username: "Herz",
      body: "Valuable insights into media management and audience engagement.",
      img: img6, // Updated to match the imported image name
    },
    {
      name: "Ms. Banmala Shardar",
      username: "Saudi Aramco",
      body: "Effective strategies for workforce management and development.",
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Saudi_Aramco_logo.svg/200px-Saudi_Aramco_logo.svg.png', // Updated to match the imported image name
    },
    {
      name: "Mr. A.C. Cheema",
      username: "Patanjali",
      body: "Deep understanding of energy systems and boiler technologies.",
      img: 'https://www.patanjaliayurved.net/media/images/logo.svg', // Updated to match the imported image name
    },
    // {
    //   name: "Mr. Ravi Verma",
    //   username: "Saarthi",
    //   body: "Innovative approaches to media and journalism.",
    //   img: img7, // Updated to match the imported image name
    // },
    {
      name: "Mr. Sandeep Khosla",
      username: "Protivity",
      body: "Exceptional insights into retail management and customer satisfaction.",
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Protiviti_logo.svg/330px-Protiviti_logo.svg.png', // Updated to match the imported image name
    },
    {
      name: "Mr. Varinder Verma",
      username: "Cavinkare",
      body: "Advanced personnel management and team-building expertise.",
      img: 'https://cavinkare.com/wp-content/uploads/2017/01/logo.png', // Updated to match the imported image name
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
