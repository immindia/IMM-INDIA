import Container from "../../components/wrappers/Container";
import { IndustryMarquee } from "./IndustryMarquee";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import LazySection from "../../components/LazySection";

// Loading skeleton component
const LiveProjectsSkeleton = () => (
  <Container className="ezy__about11 sm:pt-20 sm:px-8 light bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
    <div className="container">
      <div className="grid grid-cols-12 gap-5 justify-start items-start">
        <div className="col-span-12 lg:col-span-6">
          <div className="text-left md:pr-20 animate-pulse">
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </Container>
);

const LiveProjectsContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Container className="ezy__about11 sm:pt-20 sm:px-8 light  bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="container"
      >
        <div className="grid grid-cols-12 gap-5 justify-start items-start">
          <div className="col-span-12 lg:col-span-6">
            <div className="text-left md:pr-20">
              {/* <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="opacity-75 uppercase pl-1"
              >
                IMM India
              </motion.p> */}

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-4xl md:text-6xl leading-tight font-light uppercase tracking-wide"
              >
                Our{" "}
                <span className="font-bold">
                  Live Projects International and National
                </span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: isInView ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="inline-flex w-3 h-3 rounded-full bg-primary-color ml-2"
                ></motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-xl leading-normal opacity-75 mt-4 mb-6"
              >
                Gain hands-on experience through our industry-integrated live
                projects, where students work directly with leading companies to
                solve real business challenges and implement innovative
                solutions.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="opacity-50 text-sm"
              >
                Our live projects provide invaluable exposure to real-world
                business scenarios, enabling students to apply classroom
                learning to practical situations while building strong industry
                connections and enhancing their professional portfolio.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 100 }}
            transition={{ duration: 1, delay: 1 }}
            className="col-span-12 lg:col-span-6"
          >
            <IndustryMarquee />
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
};

const LiveProjects = () => {
  return (
    <LazySection fallback={<LiveProjectsSkeleton />} rootMargin="100px">
      <LiveProjectsContent />
    </LazySection>
  );
};

export default LiveProjects;
