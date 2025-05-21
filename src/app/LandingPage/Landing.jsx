"use client";
// import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LatestBlogsAndEvents from "./LatestBlogsAndEvents";
// import AboutIMM from "./AboutIMM";
import Stats from "./Stats";
import Testimonial from "./Testimonial";
import GlobalExcursion from "./EduTour";
import Awards from "./Awards";
import ProgramsOffered from "./ProgramsOffered";
// import AcademicPartners from "./AcademicPartners";
// import Hero from "./Hero";
import Recruiters from "./Recruiters";
import NetworkHappening from "./NetworkHappening";
import LiveProjects from "./LiveProjects";
import HeroSlider from "./HeroSlider";
import Placements from "./Placements";
import OurPartners from "./OurPartners";
import Magnet from "../../../yes/Magnet/Magnet";
import pgdm from "../../assets/pdfs/PGDM Brochure 2025-2027.pdf";
// import AwardsThreeD from "./AwardsThreeD";
// const sectionVariants = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

const Landing = () => {
  // const [heroRef, heroInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  
  // const [academicPartnersRef, academicPartnersInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [programsRef, programsInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [statsRef, statsInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [aboutRef, aboutInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [placementsRef, placementsInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [awardsRef, awardsInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [recruitersRef, recruitersInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [excursionRef, excursionInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [testimonialRef, testimonialInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [networkHappeningRef, networkHappeningInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [blogsRef, blogsInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });
  // const [liveProjectsRef, liveProjectsInView] = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });

  return (
    <div className="overflow-x-hidden">
      <div className="fixed -right-11 sm:-right-9 top-[40vh] z-50 transform -translate-y-1/2 animate-pulse">
        <Magnet
          padding={150}
          disabled={window.innerWidth < 768 ? true : false}
          magnetStrength={20}
          className=""
        >
          <button
            onClick={() => {
              window.location.href = "https://admissions.immindia.edu.in/";
            }}
            target="_blank"
            className={`flex items-center  rotate-[270deg] bg-red-800 hover:bg-red-900 text-white px-4 pt-2 pb-5 rounded-lg drop-shadow-lg transition-all duration-300 animate-pulse font-semibold`}
          >
            Apply Now
          </button>
        </Magnet>
      </div>
      <div className="fixed -right-[4.5rem] sm:-right-[4.2rem] top-[65vh] z-50 transform -translate-y-1/2">
        <Magnet
          padding={150}
          disabled={window.innerWidth < 768 ? true : false}
          magnetStrength={20}
          className=""
        >
          <a
            href={pgdm}
            target="_blank"
            className={`flex items-center rotate-[270deg] bg-red-800 hover:bg-red-900 text-white px-4 pt-2 pb-5 rounded-lg drop-shadow-lg transition-all duration-300 animate-pulse font-semibold`}
          >
            Download Brochure
          </a>
        </Magnet>
      </div>
      {/* <motion.div
        ref={heroRef}
        variants={sectionVariants}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
      > */}
        {/* <Hero /> */}
        <HeroSlider />
      {/* </motion.div> */}
      {/* <motion.div
        ref={academicPartnersRef}
        variants={sectionVariants}
        initial="hidden"
        animate={academicPartnersInView ? "visible" : "hidden"}
      >
        <AcademicPartners />
      // </motion.div> */}
      {/* <motion.div
        ref={academicPartnersRef}
        variants={sectionVariants}
        initial="hidden"
        animate={academicPartnersInView ? "visible" : "hidden"}
      > */}
        <OurPartners />
      {/* </motion.div> */}
     
      
      {/* <motion.div
        ref={programsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={programsInView ? "visible" : "hidden"}
      > */}
        <ProgramsOffered />
      {/* </motion.div> */}
      
      {/* <motion.div
        ref={statsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
      > */}
        <Stats />
      {/* </motion.div> */}
      {/* <motion.div
        ref={aboutRef}
        variants={sectionVariants}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
      >
        <AboutIMM />
      // </motion.div> */}
      {/* <motion.div
        ref={placementsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={placementsInView ? "visible" : "hidden"}
      > */}
        <Placements />
      {/* </motion.div> */}
      {/* <motion.div
        ref={awardsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={awardsInView ? "visible" : "hidden"}
      > */}
        <Awards />
        {/* <AwardsThreeD /> */}
      {/* </motion.div> */}
      
      {/* <motion.div
        ref={recruitersRef}
        variants={sectionVariants}
        initial="hidden"
        animate={recruitersInView ? "visible" : "hidden"}
      > */}
        <Recruiters />
      {/* </motion.div> */}
      {/* <motion.div
        ref={excursionRef}
        variants={sectionVariants}
        initial="hidden"
        animate={excursionInView ? "visible" : "hidden"}
      > */}
        <GlobalExcursion />
      {/* </motion.div> */}
      
   
      {/* <motion.div
        ref={networkHappeningRef}
        variants={sectionVariants}
        initial="hidden"
        animate={networkHappeningInView ? "visible" : "hidden"}
      > */}
        <NetworkHappening />
      {/* </motion.div> */}

      {/* <motion.div
        ref={blogsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={blogsInView ? "visible" : "hidden"}
      > */}
        <LatestBlogsAndEvents />
      {/* </motion.div> */}
      {/* <motion.div
        ref={liveProjectsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={liveProjectsInView ? "visible" : "hidden"}
      > */}
        <LiveProjects />
      {/* </motion.div> */}
      {/* <motion.div
        ref={testimonialRef}
        variants={sectionVariants}
        initial="hidden"
        animate={testimonialInView ? "visible" : "hidden"}
      > */}
        <Testimonial />
      {/* </motion.div> */}

    </div>
  );
};

export default Landing;
