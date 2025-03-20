import { useState } from "react";
import img1 from "../../assets/ge1.jpg";

import img2 from "../../assets/ge2.jpg";
import Heading from "../../components/Heading";
import { ChevronRight } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import Slider from "./Slider";
export default function GlobalExcursion() {
  const internationalExcursion = [
    {
      slider: false,
      category: "London",
      title: "Few Global Excursion Glimpses",
      image: img1,
      alt: "Global Excursion group",
    },
    {
      slider: false,
      category: "London",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: img2,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Malaysia",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: img2,
      alt: "Vision Voyage event",
    },
  ];
  const nationalExcursion = [
    {
      slider: false,
      category: "Delhi",
      title: "Few Global Excursion Glimpses",
      image: img1,
      alt: "Global Excursion group",
    },
    {
      slider: false,
      category: "Manali",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: img2,
      alt: "Vision Voyage event",
    },
    {
      slider: false,
      category: "Delhi",
      title: "VISION VOYAGE AAGAMAN 2024",
      image: img2,
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
        <div className="p-4 bg-white ">
          <h2 className="mb-4 text-2xl font-bold text-center text-primary-color">
            {heading}
          </h2>
          <div className="overflow-hidden h-[400px]">
            <Slider slides={filteredSlides} effect="cube" />
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
          title="EduTour @ IMM"
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
          className="mx-auto mt-12 duration-300 ease-in-out shadow-2xl hover:-translate-y-2"
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
