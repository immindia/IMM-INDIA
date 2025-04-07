import { useState } from "react";
import international1 from "../../assets/edutour/international/international (1).webp";
import international2 from "../../assets/edutour/international/international (2).webp";
import international3 from "../../assets/edutour/international/international (3).webp";
import international4 from "../../assets/edutour/international/international (4).webp";
import international5 from "../../assets/edutour/international/international (5).webp";
import international6 from "../../assets/edutour/international/international (6).webp";
import international7 from "../../assets/edutour/international/international (7).webp";
import international8 from "../../assets/edutour/international/international (8).webp";
import international9 from "../../assets/edutour/international/international (9).webp";
import international10 from "../../assets/edutour/international/international (10).webp";
import international11 from "../../assets/edutour/international/international (11).webp";
import international12 from "../../assets/edutour/international/international (12).webp";
import international13 from "../../assets/edutour/international/international (13).webp";

import national1 from "../../assets/edutour/national/national (1).webp";
import national2 from "../../assets/edutour/national/national (2).webp";
import national3 from "../../assets/edutour/national/national (3).webp";
import national4 from "../../assets/edutour/national/national (4).webp";
import national5 from "../../assets/edutour/national/national (5).webp";
import national6 from "../../assets/edutour/national/national (6).webp";
import national7 from "../../assets/edutour/national/national (7).webp";
import national8 from "../../assets/edutour/national/national (8).webp";
import national9 from "../../assets/edutour/national/national (9).webp";
import national10 from "../../assets/edutour/national/national (10).webp";
import national11 from "../../assets/edutour/national/national (11).webp";
import national12 from "../../assets/edutour/national/national (12).webp";





import Heading from "../../components/Heading";
import { ChevronRight } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import Slider from "./Slider";


export default function GlobalExcursion() {

  const internationalExcursion = [
    {
      slider: false,
      category: "London",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: international1,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Dubai",
      title: "Exploring the Great Barrier Reef",
      image: international2,
      alt: "Great Barrier Reef",
    },
    {
      slider: false,
      category: "Dubai",
      title: "Cultural Journey in Tokyo",
      image: international3,
      alt: "Tokyo culture",
    },
    {
      slider: false,
      category: "Dubai",
      title: "A Day in Paris",
      image: international4,
      alt: "Paris sightseeing",
    },
    {
      slider: false,
      category: "Dubai",
      title: "Discovering Rome",
      image: international5,
      alt: "Rome exploration",
    },
    {
      slider: false,
      category: "Malaysia",
      title: "Flavors of Barcelona",
      image: international6,
      alt: "Barcelona food tour",
    },
    {
      slider: false,
      category: "Malaysia",
      title: "Carnival in Rio",
      image: international7,
      alt: "Rio Carnival",
    },
    {
      slider: false,
      category: "Malaysia",
      title: "Mysteries of the Pyramids",
      image: international8,
      alt: "Egyptian pyramids",
    },
    {
      slider: false,
      category: "Malaysia",
      title: "Taj Mahal Experience",
      image: international9,
      alt: "Taj Mahal",
    },
    {
      slider: false,
      category: "London",
      title: "Nature's Beauty in Banff",
      image: international10,
      alt: "Banff National Park",
    },
    {
      slider: false,
      category: "London",
      title: "Safari Adventure",
      image: international11,
      alt: "South African safari",
    },
    {
      slider: false,
      category: "London",
      title: "Island Hopping in Phuket",
      image: international12,
      alt: "Phuket islands",
    },
    {
      slider: false,
      category: "London",
      title: "Santorini Sunset",
      image: international13,
      alt: "Santorini view",
    },
  ];
  const nationalExcursion = [
    {
      slider: false,
      category: "Udaipur",
      title: "Few Global Excursion Glimpses",
      image: national1,
      alt: "Global Excursion group",
    },
    {
      slider: false,
      category: "Udaipur",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national2,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Udaipur",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national3,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Udaipur",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national4,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Udaipur",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national5,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Manali",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national6,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Manali",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national7,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Manali",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national8,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Manali",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national9,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Udaipur",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national10,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Udaipur",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national11,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Udaipur",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: national12,
      alt: "Vision Voyage event",
    },


  ];
  
  const [selectedInternationalCategory, setSelectedInternationalCategory] =
    useState("All");
  const [selectedNationalCategory, setSelectedNationalCategory] =
    useState("All");

  function handleInternationalCategoryChange(category) {
    setSelectedInternationalCategory(category);
  }

  function handleNationalCategoryChange(category) {
    setSelectedNationalCategory(category);
  }

  const ExcursionCard = ({
    slides,
    heading,
    onCategoryChange,
    selectedCategory,
  }) => {
    const filteredSlides =
      selectedCategory === "All"
        ? slides
        : slides.filter((slide) => slide.category === selectedCategory);

    const categories = [
      "All",
      ...new Set(slides.map((slide) => slide.category)),
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-white rounded ">
          <h2 className="mb-4 text-2xl font-bold text-center text-primary-color">
            {heading}
          </h2>
          <div className="overflow-hidden rounded-sm h-[200px]  sm:h-[400px]">
            <Slider slides={filteredSlides} effect="fade" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <h3
              key={category}
              className={`py-2 px-4 hover:-translate-y-1 duration-300 transition-all text-sm font-bold rounded-full w-max cursor-pointer ${
                selectedCategory === category
                  ? "bg-primary-color border-2 text-white"
                  : "bg-white text-primary-color"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </h3>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="px-6 py-8 bg-primary-color lg:py-20 md:py-12 sm:px-0">
      <div className="container max-w-6xl mx-auto">
        <Heading
          title="EduTours @ IMM"
          titleClassName="lg:font-extrabold text-center text-white"
          className="block w-full pb-0 mx-auto text-left sm:col-span-4 sm:pb-0 lg:pb-14"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <ExcursionCard
            slides={internationalExcursion}
            heading="International EduTour"
            onCategoryChange={handleInternationalCategoryChange}
            selectedCategory={selectedInternationalCategory}
          />
          <ExcursionCard
            slides={nationalExcursion}
            heading="National EduTour"
            onCategoryChange={handleNationalCategoryChange}
            selectedCategory={selectedNationalCategory}
          />
        </div>
        <ShimmerButton
          className="mx-auto mt-12 hidden duration-300 ease-in-out shadow-2xl hover:-translate-y-2"
          background="#ffffff"
          shimmerSize="0.08em"
          shimmerColor="#1e1e1e"
        >
          <span className="flex items-center text-sm font-medium leading-none tracking-tight text-center whitespace-pre-wrap duration-300 ease-in-out text-black/60 dark:from-white dark:to-slate-900/10 lg:text-base hover:text-gray-500 ">
            View more
            <ChevronRight
              size={20}
              className="mt-1 duration-300 ease-in-out text-black/60 group-hover:translate-x-1"
            />
          </span>
        </ShimmerButton>
      </div>
    </section>
  );
}
