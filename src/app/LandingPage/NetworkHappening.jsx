/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Heading from "../../components/Heading";
import club from "../../assets/network-happenings/club-imm.webp";
import corporate from "../../assets/network-happenings/Corporate Connect.webp";
import industry from "../../assets/network-happenings/Industry Visit.webp";
import research from "../../assets/network-happenings/Research Conference.webp";
import Container from "../../components/wrappers/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonialList = [
  {
    author: {
      fullName: "Club Immersion",
      picture: club,
    },

    description:
      "Join our vibrant student clubs at IMM India where you can develop leadership skills, network with peers, and pursue your passions through various extracurricular activities.",
    path: "/life-at-imm/clubs-at-imm",
  },
  {
    author: {
      fullName: "Corporate Connect",
      picture: corporate,
    },

    description:
      "Engage with industry leaders and alumni through IMM India's Corporate Connect programs, fostering valuable networking opportunities and real-world business perspectives.",
    path: "/corporate-connect/corporate-events",
  },

  {
    author: {
      fullName: "Industry Visit",
      picture: industry,
    },

    description:
      "Experience firsthand exposure to leading companies through IMM India's industry visits, where students gain practical insights into business operations and corporate culture.",
    path: "/corporate-connect/industry-visit",
  },
  {
    author: {
      fullName: "Research Conference",
      picture: research,
    },

    description:
      "Participate in our annual Research Conference where you can present your latest research findings, network with peers, and gain valuable insights from industry experts.",
    path: "/faculty-and-research/research",
  },
];

const NavigationButton = ({ direction, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: "rgba(148, 163, 184, 0.3)" }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 text-[12px] bg-transparent border border-slate-400 dark:border-slate-600 rounded-full inline-flex items-center justify-center duration-150 hover:bg-slate-400 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200"
    onClick={onClick}
  >
    {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
  </motion.button>
);

const NetworkHappening = () => {
  const [index, setIndex] = useState(0);
  const { author, description, path } = testimonialList[index];

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.3 });

  const handleControl = (type) => {
    setIndex((prevIndex) => {
      if (type === "prev") {
        return prevIndex <= 0 ? testimonialList.length - 1 : prevIndex - 1;
      } else {
        return prevIndex >= testimonialList.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleControl("next");
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <Container
      ref={sectionRef}
      className="text-zinc-900 dark:text-white z-[99] relative"
    >
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "z-[-1]"
        )}
      />
      <div className="container px-4 mx-auto">
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
            title="Campus Chronicles: Clubs and Connections"
            subtitle="Explore the vibrant campus life, clubs, and connections that shape our community."
            subtitleClassName="text-center"
            titleClassName="text-center"
            className="text-center"
          />
        </motion.div>

        <div className="flex justify-center mt-6">
          <div className="w-full">
            <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-6">
              <motion.div
                ref={imageRef}
                className="md:w-1/2 md:py-12 transition-all duration-300"
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: isImageInView ? 1 : 0,
                  x: isImageInView ? 0 : -50,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="object-cover shadow-lg shadow-gray-400/50 h-full bg-center bg-no-repeat bg-cover rounded-xl min-h-80"
                    style={{
                      backgroundImage: `url(${author.picture})`,
                    }}
                  ></motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
                ref={contentRef}
                className="relative md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: isContentInView ? 1 : 0,
                  x: isContentInView ? 0 : 50,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
              >
                <div className="absolute -top-[10%] md:top-0 right-0 left-0 md:-left-[20%] bottom-0 bg-gray-200 dark:bg-slate-800 -z-[1] rounded-xl"></div>
                <div className="flex flex-col justify-center h-full mb-10 md:mb-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-6 mb-6 lg:py-16"
                    >
                      <motion.h4
                        className="mb-4 text-4xl font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {author.fullName}
                      </motion.h4>

                      <motion.p
                        className="opacity-50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.5, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {description}
                      </motion.p>

                      <Link to={path}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <Button className="mt-4 flex items-center justify-center group">
                            <span>Explore More</span>
                            <ArrowRight className="ml-1 group-hover:ml-2 transition-all duration-300 h-4 w-4 mt-1" />
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                  <div className="px-6 space-x-2 lg:px-12 text-end">
                    <NavigationButton
                      direction="prev"
                      onClick={() => handleControl("prev")}
                    />
                    <NavigationButton
                      direction="next"
                      onClick={() => handleControl("next")}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NetworkHappening;
