/* eslint-disable react/prop-types */
import Heading from "../../components/Heading";
import leaf from "../../assets/awards/leaf.png";
// import ShimmerButton from "@/components/ui/shimmer-button";
// import { ChevronRight } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
// import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
// import { cards } from "./awardsData";
import { useAwardsData } from "../../hooks/useAwardsData";

// Add preload function at the top level
const preloadImages = (images) => {
  images.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  });
};

const Awards = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  // const buttonRef = useRef(null);
  const { awards, loading } = useAwardsData();

  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const areCardsInView = useInView(cardsRef, { once: true, amount: 0.1 });
  // const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 });

  // Preload award images when component mounts
  useEffect(() => {
    // Preload the award logo and all award images
    if (awards.length > 0) {
      const imagesToPreload = [leaf, ...awards.map((award) => award.image)];
      preloadImages(imagesToPreload);
    }
  }, [awards]);

  return (
    <section
      ref={sectionRef}
      className="relative px-0 py-10 lg:py-20 md:py-12 sm:px-0 bg-gradient-to-bl  from-blue-950 via-blue-900 to-blue-950"
    >
      <div className="relative z-30 px-4 mx-auto max-w-screen-xl md:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isHeadingInView ? 1 : 0,
            y: isHeadingInView ? 0 : 50,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Heading
            title="Awards and Recognitions"
            titleClassName="text-4xl md:text-6xl font-bold text-white"
            subtitle="We are proud to have received numerous Awards and Recognitions for our Academic Excellence and Innovation."
            subtitleClassName="text-gray-300 text-base md:text-lg"
            className="text-center"
          />
        </motion.div>
        {loading ? (
          <div className="text-white text-center py-10">Loading awards...</div>
        ) : (
          <AwardsCards cardsRef={cardsRef} awards={awards} />
        )}
      </div>
    </section>
  );
};

export default Awards;

const CardItem = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.7,
      delay: 0.2 + index * 0.2,
      ease: "easeOut",
    }}
    whileHover={{ y: -5, scale: 1.02 }}
    style={{ willChange: "transform, opacity" }}
  >
    <div className="w-fit mx-auto relative">
      <img
        src={leaf}
        alt="Award logo"
        loading="eager"
        decoding="async"
        className="max-w-[160px] sm:max-w-[230px] text-blue-600 mx-auto duration-500"
      />
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-24 sm:w-36 h-24 sm:h-36 object-cover rounded-full z-40 absolute top-4 sm:top-5 border-2 sm:border-4 border-yellow-400 left-8 sm:left-11 cursor-pointer hover:border-yellow-300 transition-colors overflow-hidden ">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
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
              alt={item.title}
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
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
      }}
      className="text-sm text-white font-medium leading-relaxed mb-0 text-center max-w-[300px] break-words mx-auto"
    >
      {/* {item.title
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")} */}
        {item.description.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
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
                i === awards.length - 1 ? "col-span-2" : "sm:col-span-3"
              } duration-300 md:col-span-1 hover:scale-105`}
              key={i}
            >
              <CardItem item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
