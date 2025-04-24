import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import { ChevronRight } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import Slider from "./Slider";
import PropTypes from "prop-types";

export default function GlobalExcursion() {
  const [internationalExcursion, setInternationalExcursion] = useState([]);
  const [nationalExcursion, setNationalExcursion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedInternationalCategory, setSelectedInternationalCategory] =
    useState("All");
  const [selectedNationalCategory, setSelectedNationalCategory] =
    useState("All");

  useEffect(() => {
    const fetchEduTours = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexEdutour.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch edutour data");
        }
        const data = await response.json();

        // Process data for international and national tours
        const internationalTours = data
          .filter((tour) => tour.category === "International")
          .map((tour) => ({
            slider: false,
            category: tour.subcategory,
            title: tour.title,
            image: tour.url,
            mobileImage: tour.url,
            alt: tour.title || "Tour image",
            description: tour.description,
          }));

        const nationalTours = data
          .filter((tour) => tour.category === "National")
          .map((tour) => ({
            slider: false,
            category: tour.subcategory,
            title: tour.title,
            image: tour.url,
            mobileImage: tour.url,
            alt: tour.title || "Tour image",
            description: tour.description,
          }));

        setInternationalExcursion(internationalTours);
        setNationalExcursion(nationalTours);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEduTours();
  }, []);

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
    isLoading,
    errorMessage,
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
          {isLoading ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[400px]">
              <p className="text-lg">Loading tour information...</p>
            </div>
          ) : errorMessage ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[400px]">
              <p className="text-lg text-red-500">Error: {errorMessage}</p>
            </div>
          ) : filteredSlides.length === 0 ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[400px]">
              <p className="text-lg">No tour images available</p>
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
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
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
            isLoading={loading}
            errorMessage={error}
          />
          <ExcursionCard
            slides={nationalExcursion}
            heading="National EduTour"
            onCategoryChange={handleNationalCategoryChange}
            selectedCategory={selectedNationalCategory}
            isLoading={loading}
            errorMessage={error}
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
