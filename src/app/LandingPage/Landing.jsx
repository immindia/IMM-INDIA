"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LatestBlogsAndEvents from "./LatestBlogsAndEvents";
import AboutIMM from "./AboutIMM";
import Stats from "./Stats";
import Testimonial from "./Testimonial";
import GlobalExcursion from "./GlobalExcursion";
import Awards from "./Awards";
import ProgramsOffered from "./ProgramsOffered";

const sectionVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Landing = () => {
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [programsRef, programsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [statsRef, statsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [awardsRef, awardsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [excursionRef, excursionInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [testimonialRef, testimonialInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [blogsRef, blogsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="overflow-x-hidden">
      <motion.div
        ref={aboutRef}
        variants={sectionVariants}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
      >
        <AboutIMM />
      </motion.div>
      
      <motion.div
        ref={programsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={programsInView ? "visible" : "hidden"}
      >
        <ProgramsOffered />
      </motion.div>
      
      <motion.div
        ref={statsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
      >
        <Stats />
      </motion.div>
      
      <motion.div
        ref={awardsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={awardsInView ? "visible" : "hidden"}
      >
        <Awards />
      </motion.div>
      
      <motion.div
        ref={excursionRef}
        variants={sectionVariants}
        initial="hidden"
        animate={excursionInView ? "visible" : "hidden"}
      >
        <GlobalExcursion />
      </motion.div>
      
      <motion.div
        ref={testimonialRef}
        variants={sectionVariants}
        initial="hidden"
        animate={testimonialInView ? "visible" : "hidden"}
      >
        <Testimonial />
      </motion.div>

      <motion.div
        ref={blogsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={blogsInView ? "visible" : "hidden"}
      >
        <LatestBlogsAndEvents />
      </motion.div>
    </div>
  );
};

export default Landing;
