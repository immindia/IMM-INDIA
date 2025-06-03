import { useState } from "react";
import Heading from "../../components/Heading";
import { ChevronRight } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import Slider from "./Slider";
import PropTypes from "prop-types";
import { useEduTourData } from "../../hooks/useApiData";
import LazySection from "../../components/LazySection";

// Loading skeleton component
const EduTourSkeleton = () => (
  <section className="px-6 py-8 bg-primary-color lg:py-20 md:py-12 sm:px-0">
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="animate-pulse">
          <div className="h-12 bg-white/20 rounded w-64 mx-auto"></div>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-48 mx-auto mb-4"></div>
            <div className="h-64 bg-white/20 rounded"></div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="h-8 w-20 bg-white/20 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EduTourContent = () => {
  const { data, isLoading, error: errorMessage } = useEduTourData();
  const [selectedInternationalCategory, setSelectedInternationalCategory] =
    useState("All");
  const [selectedNationalCategory, setSelectedNationalCategory] =
    useState("All");

  if (isLoading) {
    return <EduTourSkeleton />;
  }

  const {
    internationalTours: internationalExcursion = [],
    nationalTours: nationalExcursion = [],
  } = data || {};

  const handleInternationalCategoryChange = (category) => {
    setSelectedInternationalCategory(category);
  };

  const handleNationalCategoryChange = (category) => {
    setSelectedNationalCategory(category);
  };

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

    const allCategories = [...new Set(slides.map((slide) => slide.category))];
    const priorityCategories = ["London", "Manali"];
    const otherCategories = allCategories.filter(
      (cat) => !priorityCategories.includes(cat)
    );
    const categories = [
      "All",
      ...priorityCategories.filter((cat) => allCategories.includes(cat)),
      ...otherCategories,
    ];

    return (
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-white rounded ">
          <h2 className="mb-4 text-2xl font-bold text-center text-primary-color">
            {heading}
          </h2>
          {errorMessage && slides.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[400px]">
              <p className="text-lg text-red-500">
                Error: {errorMessage.message || "Failed to load tour images"}
              </p>
            </div>
          ) : filteredSlides.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[400px]">
              <p className="text-lg">
                No tour images available for {selectedCategory}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-sm h-[200px] sm:h-[400px]">
              <Slider slides={filteredSlides} effect="fade" />
            </div>
          )}
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

  ExcursionCard.propTypes = {
    slides: PropTypes.array.isRequired,
    heading: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
  };

  return (
    <section className="px-6 py-8 bg-primary-color lg:py-20 md:py-12 sm:px-0">
      <div className="container max-w-6xl mx-auto">
        <Heading
          title="EduTours @ IMM"
          titleClassName="lg:font-extrabold text-center text-white"
          className="block w-full pb-0 mx-auto text-left sm:col-span-4 sm:pb-0 lg:pb-14"
        />

        {errorMessage &&
          !internationalExcursion.length &&
          !nationalExcursion.length && (
            <div className="text-center py-10">
              <p className="text-red-300 bg-red-800 p-4 rounded-md">
                Failed to load educational tour data:{" "}
                {errorMessage.message || "Unknown error"}
              </p>
            </div>
          )}

        <div className="grid gap-8 md:grid-cols-2">
          <ExcursionCard
            slides={internationalExcursion}
            heading="International EduTour"
            onCategoryChange={handleInternationalCategoryChange}
            selectedCategory={selectedInternationalCategory}
          />
          <ExcursionCard
            slides={nationalExcursion}
            heading="National Offsite Bonding"
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
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black/60 dark:from-white dark:to-slate-900/10 lg:text-base flex items-center hover:text-gray-500 duration-300 ease-in-out">
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
};

export default function GlobalExcursion() {
  return (
    <LazySection fallback={<EduTourSkeleton />} rootMargin="100px">
      <EduTourContent />
    </LazySection>
  );
}
