"use client";
import { useEffect, useState } from "react";
import { useMeta } from "@/context/MetaContext";
import { initializePrefetch } from "../../utils/prefetch";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import LatestBlogsAndEvents from "./LatestBlogsAndEvents";
import Stats from "./Stats";
import Testimonial from "./Testimonial";
import GlobalExcursion from "./EduTour";
import Awards from "./Awards";
import ProgramsOffered from "./ProgramsOffered";
import Recruiters from "./Recruiters";
import NetworkHappening from "./NetworkHappening";
import LiveProjects from "./LiveProjects";
import HeroSlider from "./HeroSlider";
import Placements from "./Placements";
import OurPartners from "./OurPartners";
import Magnet from "../../../yes/Magnet/Magnet";
import BrochureForm from "./BrochureForm";
import popup from "../../assets/landing/pop-up.png";

const MobilePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // 2-second delay

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="md:hidden z-[9999] w-full h-full px-5 py-10 aspect-ratio-[5/7]  bg-transparent border-0 rounded-lg overflow-hidden focus:outline-none">
        <a
          href="https://www.immindia.edu.in/imm/general-pgdm-lp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={popup}
            alt="Special Offer"
            className="rounded-lg object-cover w-full h-full"
          />
        </a>
      </DialogContent>
    </Dialog>
  );
};

const Landing = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - Best MBA Colleges in Delhi NCR | PGDM Colleges in India");
    setDescription(
      "Institute of marketing & management is a top-ranked MBA college in Delhi. Industry-focused curriculum, excellent placements, and strong alumni network."
    );

    // Initialize prefetching for better performance
    initializePrefetch();
  }, [setTitle, setDescription]);

  return (
    <div className="overflow-x-hidden">
      <MobilePopup />
      <div className="fixed -right-11 sm:-right-9 top-[40vh] z-[9999] transform -translate-y-1/2 animate-pulse">
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
      <div className="fixed -right-[4.7rem] sm:-right-[4.2rem] top-[65vh]  transform z-[9999] -translate-y-1/2">
        <Magnet
          padding={150}
          disabled={window.innerWidth < 768 ? true : false}
          magnetStrength={20}
          className=""
        >
          <BrochureForm />
        </Magnet>
      </div>

      <HeroSlider />

      <OurPartners />

      <ProgramsOffered />

      <Stats />

      {/* Optimized data fetch with React Query and lazy loading */}
      <Placements />

      {/* Optimized data fetch with React Query and lazy loading */}
      <Awards />

      {/* Optimized data fetch with React Query and lazy loading */}
      <Recruiters />

      {/* Optimized data fetch with React Query and lazy loading */}
      <GlobalExcursion />

      <NetworkHappening />

      <LatestBlogsAndEvents />

      {/* Optimized data fetch with React Query and lazy loading */}
      <LiveProjects />

      {/* Optimized data fetch with React Query and lazy loading */}
      <Testimonial />
    </div>
  );
};

export default Landing;
