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
import AcademicPartners from "./AcademicPartners";
import Hero from "./Hero";
import Recruiters from "./Recruiters";
import NetworkHappening from "./NetworkHappening";
import LiveProjects from "./LiveProjects";
import HeroSlider from "./HeroSlider";
import Placements from "./Placements";
import OurPartners from "./OurPartners";

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
  const [heroRef, heroInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const [academicPartnersRef, academicPartnersInView] = useInView({
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
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [placementsRef, placementsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [awardsRef, awardsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [recruitersRef, recruitersInView] = useInView({
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
  const [networkHappeningRef, networkHappeningInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [blogsRef, blogsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [liveProjectsRef, liveProjectsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="overflow-x-hidden">
      <motion.div
        ref={heroRef}
        variants={sectionVariants}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        {/* <Hero /> */}
        <HeroSlider />
      </motion.div>
      {/* <motion.div
        ref={academicPartnersRef}
        variants={sectionVariants}
        initial="hidden"
        animate={academicPartnersInView ? "visible" : "hidden"}
      >
        <AcademicPartners />
      </motion.div> */}
      <motion.div
        ref={academicPartnersRef}
        variants={sectionVariants}
        initial="hidden"
        animate={academicPartnersInView ? "visible" : "hidden"}
      >
        <OurPartners />
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
      {/* <motion.div
        ref={aboutRef}
        variants={sectionVariants}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
      >
        <AboutIMM />
      </motion.div> */}
      <motion.div
        ref={placementsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={placementsInView ? "visible" : "hidden"}
      >
        <Placements />
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
        ref={recruitersRef}
        variants={sectionVariants}
        initial="hidden"
        animate={recruitersInView ? "visible" : "hidden"}
      >
        <Recruiters />
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
        ref={networkHappeningRef}
        variants={sectionVariants}
        initial="hidden"
        animate={networkHappeningInView ? "visible" : "hidden"}
      >
        <NetworkHappening />
      </motion.div>

      <motion.div
        ref={blogsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={blogsInView ? "visible" : "hidden"}
      >
        <LatestBlogsAndEvents />
      </motion.div>
      <motion.div
        ref={liveProjectsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={liveProjectsInView ? "visible" : "hidden"}
      >
        <LiveProjects />
      </motion.div>

    </div>
  );
};

export default Landing;
