import img1 from "../../assets/ge1.jpg";
import img2 from "../../assets/ge2.jpg";
import Heading from "../../components/Heading";
import { ChevronRight } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import Slider from "./Slider";
export default function GlobalExcursion() {
  const internationalExcursion = [
    {
      title: "Few Global Excursion Glimpses",
      image: img1,
      alt: "Global Excursion group",
    },
    {
      title: "VISION VOYAGE AAGAMAN 2024",
      image: img2,
      alt: "Vision Voyage event",
    },
  ];
  const nationalExcursion = [
    {
      title: "Few Global Excursion Glimpses",
      image: img1,
      alt: "Global Excursion group",
    },
    {
      title: "VISION VOYAGE AAGAMAN 2024",
      image: img2,
      alt: "Vision Voyage event",
    },
  ];

  const ExcursionCard = ({slides,heading }) => (
    <div className="p-4 bg-white">
      <h2 className="mb-4 text-2xl font-bold text-center text-primary-color">
        {heading}
      </h2>
      <div className="overflow-hidden h-[400px]">
        {/* <img
          src={image}
          alt={alt}
          className="object-cover w-full h-auto hover:scale-125 duration-300"
          width={600}
          height={400}
        /> */}
        <Slider slides={slides} effect="fade" />
      </div>
    </div>
  );

  return (
    <section className="bg-primary-color lg:py-20 md:py-12 py-8 sm:px-0 px-6">
      <div className="container mx-auto max-w-6xl">
        <Heading
          title="EduTour @ IMM"
          titleClassName="lg:font-extrabold text-center text-white"
          className="block pb-0 mx-auto w-full text-left sm:col-span-4 sm:pb-0 lg:pb-14"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <ExcursionCard slides={internationalExcursion} heading="International EduTour"/>
          <ExcursionCard slides={nationalExcursion} heading="National EduTour"/>
        </div>
        <ShimmerButton
          className="shadow-2xl mt-12 mx-auto hover:-translate-y-2 duration-300 ease-in-out"
          background="#ffffff"
          shimmerSize="0.08em"
          shimmerColor="#1e1e1e"
        >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black/60 dark:from-white dark:to-slate-900/10 lg:text-base flex items-center hover:text-gray-500 duration-300 ease-in-out ">
            View more
            <ChevronRight
              size={20}
              className="text-black/60 mt-1 group-hover:translate-x-1 duration-300 ease-in-out"
            />
          </span>
        </ShimmerButton>
      </div>
    </section>
  );
}
