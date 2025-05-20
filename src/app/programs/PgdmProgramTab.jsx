import PgdmSpecialization from "./PgdmSpecialization";
import PgdmFeatures from "./PgdmFeatures";
import { useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import SemesterTabs from "./SemesterTabs";
import SemesterTabMobile from "./SemesterTabMobile";
const PgdmProgram = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className=" ">
      <div className="space-y-4">
        <h1 className="sm:text-4xl text-3xl font-bold text-pink-900 mb-6 drop-shadow-md backdrop-blur-sm w-fit">
          PGDM Program with Dual Specializations
        </h1>
        <p className="text-gray-600 text-base backdrop-blur-sm">
          IMM is one of the most premium Business Schools for PGDM in
          Delhi. The two-year full-time Post Graduate Diploma in Management
          (PGDM), is the flagship programme of IMM-Business School.
        </p>
        {isOpen && (
          <>
            <p className="text-gray-600 text-base backdrop-blur-sm">
              Its main objective is to develop young men and women into
              competent professional managers, capable of working in any sector
              of organized activity, learning leadership skills and achieving
              excellence in performance while contributing to the welfare of the
              larger society.
            </p>
            <p className="text-gray-600 text-base backdrop-blur-sm">
              Students learn to sharpen their managerial skills, open their
              minds to appreciate diverse managerial perspectives, creatively
              find innovative solutions to problems, and analyse different
              career options in a new way of working.
            </p>
          </>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary-color flex group items-center  animate-pulse"
        >
          {isOpen ? "Read Less" : "Read More"}
          {isOpen ? (
            <ArrowUp className="ml-1 mt-1 h-4 w-4 group-hover:rotate-90 group-hover:ml-2 transition-all duration-300" />
          ) : (
            <ArrowRight className="ml-1 mt-1 h-4 w-4 group-hover:rotate-90 group-hover:ml-2 transition-all duration-300" />
          )}
        </button>
      </div>
      

      <div className=" pt-10 grid sm:grid-cols-2 gap-4">
        <div className="order-2 sm:order-1">
          <PgdmSpecialization />
        </div>
        <div className="order-1 sm:order-2 sm:pt- grid justify-center items-center">
          <div className="text-justify sm:text-left lg:px-20">
            <p className="opacity-75 text-center sm:text-left uppercase">
              SPECIALIZATIONS
            </p>
            <h1 className="text-4xl text-center sm:text-left md:text-7xl leading-tight font-light uppercase tracking-wide">
              FUTURE <span className="font-bold">READY</span>
              <span className="inline-flex w-3 h-3 rounded-full bg-pink-800 ml-2"></span>
            </h1>
            <p className=" text-lg sm:text-xl leading-normal opacity-75 mt-4 mb-6 backdrop-blur-sm">
            Our PGDM prog offers cutting edge specializations in emerging technologies and modern business practices .
            </p>
            <p className="opacity-50 text-sm lg:mx backdrop-blur-sm">
            We offer seven future-focused specializations — Marketing, Human Resources, Finance, Operations, International Business, Business Analytics, and Entrepreneurship — complemented by a range of globally recognized certifications. Our forward-looking curriculum seamlessly integrates technology with business strategy, empowering you to thrive in an ever-evolving digital landscape. With immersive learning in the dynamic visualisations through Power BI, advanced data analysis using Python and R,*and *experiential learning in metaverse you’ll graduate with the cutting-edge skills and innovative mindset needed to lead in a data-driven world.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <PgdmFeatures />
      </div>
      <div className="sm:hidden mt-10 sm:mt-20">
        <SemesterTabMobile /> 
      </div>
      <div className="hidden sm:block mt-10 sm:mt-20">
        <SemesterTabs />
      </div>
    </section>
  );
};

export default PgdmProgram;
