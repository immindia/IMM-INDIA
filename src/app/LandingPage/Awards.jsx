/* eslint-disable react/prop-types */
import Heading from "../../components/Heading";
import img1 from "../../assets/awards/Aims.webp";
import img2 from "../../assets/awards/Best B-School.webp";
import img3 from "../../assets/awards/Best Business School.webp";
import img4 from "../../assets/awards/Economic Times.webp";
import img5 from "../../assets/awards/Centre of Academic.webp";
import ShimmerButton from "@/components/ui/shimmer-button";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "AIMS Innovation Award",
    image: img1,
  },
  {
    title: "Best B-School Of the Year 2023",
    image: img2,
  },
  {
    title:
      "Best Business School with Excellent",
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
];
const Awards = () => {
  return (
    <section className="relative px-0 py-10 lg:py-20 md:py-12 sm:px-0 bg-gradient-to-bl  from-blue-950 via-blue-900 to-blue-950">
      <div className="relative z-30 px-4 mx-auto max-w-screen-xl md:px-8">
        <Heading
          title="Awards and Recognitions"
          titleClassName="text-4xl md:text-6xl font-bold text-white"
          subtitle="We are proud to have received numerous awards and recognitions for our academic excellence and innovation."
          subtitleClassName="text-gray-300 text-base md:text-lg"
          className="text-center"
        />
        <PlacementHighlights />
        <Link to="/about/accreditations-awards">
        <ShimmerButton
          className="shadow-2xl mt-12 mx-auto hover:-translate-y-2 duration-300 ease-in-out"
          background="#FFF"
          shimmerSize="0.1em"
          shimmerColor="#000"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black/60 dark:from-white dark:to-slate-900/10 lg:text-base flex items-center hover:text-gray-500 duration-300 ease-in-out ">
            View more
            <ChevronRight
              size={20}
              className="text-black/60 mt-1 group-hover:translate-x-1 duration-300 ease-in-out"
            />
          </span>
        </ShimmerButton>
        </Link>
      </div>
    </section>
  );
};

export default Awards;

const CardItem = ({ item }) => (
  <div className="">
    <div className="w-fit mx-auto relative">
      <img
        src="https://cdn.easyfrontend.com/pictures/logos/award-logo.png"
        alt=""
        className=" max-w-[160px] sm:max-w-[220px] text-blue-600 mx-auto  duration-500"
      />
      <Dialog>
        <DialogTrigger asChild>
          <img
            src={item.image}
            alt={item.title}
            className="w-24 sm:w-36 h-24 sm:h-36 object-cover rounded-full z-40 absolute top-4 border-2 sm:border-4 border-yellow-400 left-8 sm:left-10 cursor-pointer hover:border-yellow-300 transition-colors"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] w-[98vw] rounded-md bg-transparent border-none" crossIcon="text-white sm:h-8 sm:w-8  rounded bg-slate-600 p-1">
          <div className="w-full h-full flex justify-center items-center sm:p-8 p-3">
            <img 
              src={item.image} 
            alt={item.title}
            className="w-full h-auto object-contain rounded-lg"
          />
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <h5 className="text-[17px] text-white font-medium leading-relaxed mb-0 text-center ">
      {item.title}
    </h5>
  </div>
);

const PlacementHighlights = () => {
  return (
    <section className="rounded-lg dark-gray dark:bg-[#0b1727] text-slate-800 dark:text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {cards.map((item, i) => (
            <div
              className={`${i === cards.length - 1 ? "col-span-2" : "sm:col-span-3"} duration-300 md:col-span-1 hover:scale-105`}
              key={i}
            >
            
              <CardItem item={item} key={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


