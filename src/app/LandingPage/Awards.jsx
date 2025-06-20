/* eslint-disable react/prop-types */
import Heading from "../../components/Heading";
import leaf from "../../assets/awards/leaf.png";
import ShimmerButton from "@/components/ui/shimmer-button";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useAwardsData } from "../../hooks/useApiData";
import LazySection from "../../components/LazySection";

const placeholderAwards = [
  {
    id: "p1",
    image: "/awards/award (1).webp",
    description:
      "Most Preferred B-School\nProviding Global Exposure\nby MyBrand Better",
  },
  {
    id: "p2",
    image: "/awards/award (2).webp",
    description:
      "Outstanding Performance in\nVirtual Knowledge Delivery\nby Begin Up Research Intelligence",
  },
  {
    id: "p3",
    image: "/awards/award (3).webp",
    description:
      "Top & Most Innovative\nPrivate Business School\nby National Education Excellence Awards",
  },
  {
    id: "p4",
    image: "/awards/award (4).webp",
    description:
      "Top 10 Promising Colleges\nProviding Logistics & Supply\nChain Management Programs\nby Higher Education Review",
  },
  {
    id: "p5",
    image: "/awards/award (5).webp",
    description:
      "Top 10 Sales & Marketing\nColleges In India\nby Higher Education Review",
  },
];

const preloadImages = (images) => {
  if (typeof window !== "undefined") {
    images.forEach((imageUrl) => {
      if (imageUrl) {
        // Ensure URL is not null or undefined
        const img = new Image();
        img.src = imageUrl;
      }
    });
  }
};

// Renamed AwardsContent back to Awards to match original component structure
const AwardsInternal = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  // Data fetching with React Query
  const {
    data: awardData = [],
    isLoading,
    error,
  } = useAwardsData({
    count: 5,
  });
  // Slicing to 5 items as per original UI logic
  // const awardData = awards.slice(0, 21);

  // const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 }); // Temporarily commenting out
  // const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 }); // Temporarily commenting out

  useEffect(() => {
    // Preload leaf and placeholder images on mount
    const placeholderImages = placeholderAwards.map((award) => award.image);
    preloadImages([leaf, ...placeholderImages]);
  }, []); // Run only on mount

  useEffect(() => {
    if (awardData.length > 0) {
      const imagesToPreload = [
        ...awardData.map((award) => award.image).filter(Boolean),
      ];
      preloadImages(imagesToPreload);
    }
  }, [awardData]); // Dependency on awardData (the sliced version) is fine here for preloading these specific images

  if (error) {
    return (
      <section className="relative px-0 py-10 lg:py-20 md:py-12 sm:px-0 bg-gradient-to-bl from-blue-950 via-blue-900 to-blue-950">
        <div className="relative z-30 px-4 mx-auto max-w-screen-xl md:px-8">
          <div className="text-center py-10">
            <p className="text-red-400 bg-red-900 p-3 rounded">
              Failed to load awards data. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayAwards = isLoading ? placeholderAwards : awardData;

  return (
    <section
      ref={sectionRef}
      className="relative px-0 py-10 lg:py-20 md:py-12 sm:px-0 bg-gradient-to-bl from-blue-950 via-blue-900 to-blue-950"
    >
      <div className="relative z-30 px-4 mx-auto max-w-screen-xl md:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1, // Always visible for testing
            y: 0, // No offset for testing
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heading
            title="Awards and Recognitions"
            titleClassName="text-4xl md:text-6xl font-bold text-white"
            subtitle="We are proud to have received numerous Awards and Recognitions for our Academic Excellence and Innovation."
            subtitleClassName="text-gray-300 text-base md:text-lg"
            className="text-center"
          />
        </motion.div>

        {/* Display AwardsCards only if awardData has items to prevent errors if API is slow or returns empty post-slice */}
        {displayAwards.length > 0 ? (
          <AwardsCards cardsRef={cardsRef} awards={displayAwards} />
        ) : (
          !isLoading && (
            <div className="text-white text-center py-10">
              No awards to display at the moment.
            </div>
          )
        )}

        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1, // Always visible for testing
            y: 0, // No offset for testing
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/about/accreditations-awards">
            <ShimmerButton
              className="shadow-2xl mt-12 mx-auto hover:-translate-y-2 duration-300 ease-in-out"
              background="#FFF"
              shimmerSize="0.1em"
              shimmerColor="#000"
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black/60 dark:from-white dark:to-slate-900/10 lg:text-base flex items-center hover:text-gray-500 duration-300 ease-in-out">
                View more
                <ChevronRight
                  size={20}
                  className="text-black/60 mt-1 group-hover:translate-x-1 duration-300 ease-in-out"
                />
              </span>
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Main exported component using LazySection
const Awards = () => {
  return (
    <LazySection rootMargin="100px">
      <AwardsInternal />
    </LazySection>
  );
};

export default Awards;

const CardItem = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.2 + index * 0.2, ease: "easeOut" }}
    whileHover={{ y: -5, scale: 1.02 }}
    style={{ willChange: "transform, opacity" }}
  >
    <div className="w-fit mx-auto relative">
      <img
        src={leaf}
        alt="Award logo"
        loading="eager" // Keep eager as it's part of the main visual once loaded
        decoding="async"
        className="max-w-[160px] sm:max-w-[230px] text-blue-600 mx-auto duration-500"
      />
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-24 sm:w-36 h-24 sm:h-36 object-cover rounded-full z-40 absolute top-4 sm:top-5 border-2 sm:border-4 border-yellow-400 left-8 sm:left-11 cursor-pointer hover:border-yellow-300 transition-colors overflow-hidden ">
            <img
              src={item.image} // Ensure item.image is a valid URL
              alt={item.title || "Award image"}
              loading="lazy" // Individual award images can be lazy
              decoding="async"
              className="w-24 sm:w-36 h-24 sm:h-36 object-cover cursor-pointer hover:border-yellow-300 transition-colors scale-150"
            />
          </div>
        </DialogTrigger>
        <DialogContent
          className="z-[9999] sm:max-w-[600px] w-[98vw] rounded-md bg-transparent border-none"
          crossIcon="text-white sm:h-8 sm:w-8 rounded bg-slate-600 p-1"
        >
          <div className="w-full h-full flex justify-center items-center sm:p-8 p-3">
            <img
              src={item.image}
              alt={item.title || "Award image enlarged"}
              loading="lazy"
              decoding="async"
              className="w-fit h-auto max-h-[600px] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <motion.h5
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="text-sm text-white font-medium leading-relaxed mb-0 text-center"
    >
      {item.description?.split("\n").map((line, i) => (
        <span key={i} className="">
          {line}
          <br />
        </span>
      )) || item.title}
    </motion.h5>
  </motion.div>
);

const AwardsCards = ({ cardsRef, awards }) => {
  return (
    <section className="rounded-lg dark-gray dark:bg-[#0b1727] text-slate-800 dark:text-white">
      <div className="container mx-auto">
        <div
          ref={cardsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {awards.map((item, i) => (
            <div
              className={`${
                // Restoring original className logic for item columns
                i === awards.length - 1 ? "col-span-2" : "sm:col-span-3"
              } duration-300 md:col-span-1 hover:scale-105`}
              key={item.id || i} // Using item.id if available for a more stable key
            >
              <CardItem item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
