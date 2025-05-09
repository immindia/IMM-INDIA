import PgdmSpecialization from "./PgdmSpecialization";
import PgdmFeatures from "./PgdmFeatures";
import { useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
const PgdmProgram = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="ezy__about1 light   bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-primary-color">
          PGDM Program with Dual Specializations
        </h1>
        <p className="text-gray-600 text-base">
          IMM is one of the most premium Business Schools for PGDM /MBA in
          Delhi. The two-year full-time Post Graduate Diploma in Management
          (PGDM), is the flagship programme of IMM-Business School.
        </p>
        {isOpen && (
          <>
            <p className="text-gray-600 text-base">
              Its main objective is to develop young men and women into
              competent professional managers, capable of working in any sector
              of organized activity, learning leadership skills and achieving
              excellence in performance while contributing to the welfare of the
              larger society.
            </p>
            <p className="text-gray-600 text-base">
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
      <div className="sm:mt-10 grid sm:grid-cols-2 gap-4">
        <PgdmSpecialization />
        <div className="pt-20">
          <div className="text-justify sm:text-left lg:px-20">
            <p className="opacity-75 text-center sm:text-left uppercase">
              SPECIALIZATIONS
            </p>
            <h1 className="text-4xl text-center sm:text-left md:text-7xl leading-tight font-light uppercase tracking-wide">
              FUTURE <span className="font-bold">READY</span>
              <span className="inline-flex w-3 h-3 rounded-full bg-pink-800 ml-2"></span>
            </h1>
            <p className=" text-lg sm:text-xl leading-normal opacity-75 mt-4 mb-6">
              Our PGDM program offers cutting-edge specializations in emerging
              technologies and modern business practices. Students gain
              expertise in Data Science, Machine Learning, Python, R
              Programming, and more.
            </p>
            <p className="opacity-50 text-sm lg:mx">
              The dual specialization approach allows students to combine
              traditional management skills with technical expertise, preparing
              them for leadership roles in the digital age.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <PgdmFeatures />
      </div>
    </section>
  );
};

export default PgdmProgram;
