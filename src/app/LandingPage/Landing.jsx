"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// import Container from "../../components/wrappers/Container"
// import AboutIndoGlobal from "./AboutIndoGolbal";
// import Events from "./Events";
// import Hero from "./HeroSlider";
import LatestBlogsAndEvents from "./LatestBlogsAndEvents";
// import Placements from "./Placements";
// import Programs from "./Programs";
// import RankSlider from "./RankSlider";
import Stats from "./Stats";
import Testimonial from "./Testimonial";
import GlobalExcursion from "./GlobalExcursion";

const sectionVariants = {
  hidden: { scale: 0.8, opacity: 0 }, // Starting state (small and transparent)
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6, // Animation duration
      ease: "easeOut",
    },
  },
};

const Landing = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [placementsRef, placementsInView] = useInView({
    threshold: 0.0,
    triggerOnce: true,
  });
  const [statsRef, statsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [rankSliderRef, rankSliderInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [programsRef, programsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [eventsRef, eventsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [blogsRef, blogsInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="overflow-x-hidden">
      {/* <motion.div
        ref={heroRef}
        variants={sectionVariants}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      >
        <Hero />
      </motion.div>

      <motion.div
        ref={placementsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={placementsInView ? "visible" : "hidden"}
      >
        <Placements />
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
        ref={rankSliderRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rankSliderInView ? "visible" : "hidden"}
      >
        <RankSlider />
      </motion.div>

      <motion.div
        ref={programsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={programsInView ? "visible" : "hidden"}
      >
        <Programs />
      </motion.div>

      <motion.div
        ref={aboutRef}
        variants={sectionVariants}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
      >
        <AboutIndoGlobal />
      </motion.div>

      <motion.div
        ref={eventsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={eventsInView ? "visible" : "hidden"}
      >
        <Events />
      </motion.div> */}
      <motion.div
        ref={statsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
      >
        <Stats />
      </motion.div>
      <motion.div
        ref={testimonialsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
      >
        <GlobalExcursion />
      </motion.div>
      <motion.div
        ref={testimonialsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
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
