"use client";

import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
  import { AnimatedBeam } from "@/components/ui/animated-beam";
import P from "@/assets/pgdm/P.gif";

import R from "@/assets/pgdm/R.gif";
import logo from "@/assets/pgdm/imm.jpg";
import aicte from "@/assets/pgdm/aicet.png";


import body from "@/assets/bba/icons/body.gif";
import digital from "@/assets/bba/icons/digital.gif";
import nudge from "@/assets/bba/icons/nudge.gif";
import projects from "@/assets/bba/icons/projects.gif";
import research from "@/assets/bba/icons/research.gif";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-20  items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function PgdmSpecialization() {
  // Create refs for each circle
  const containerRef = useRef(null);
  const circleRefs = Array(8)
    .fill(null)
    .map(() => useRef(null));

  return (
    <div
      className="relative flex items-center justify-center w-full py-2 sm:p-20 sm:bg-background  sm:shadow-lg my-5 rounded-lg"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[550px] sm:-mt-10 sm:py-10 items-stretch justify-between gap-20">
        {/* Top Row */}
        <div className="flex flex-row items-center justify-between">
          <a href="#Marketing & Innovation Management">
          <Circle
            ref={circleRefs[0]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.dataScience />
            <p className="text-sm font-medium text-center mt-36 text-slate-500 w-max ">
              {/* Data Science */}
              Marketing &  <br /> Innovation  <br /> Management
            </p>
          </Circle>
          </a>
          <img src={aicte} alt="aicte" className="w-20 h-20 drop-shadow-lg  hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]" />
          <a href="#Financial Management">
          <Circle
            ref={circleRefs[4]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.python />
            <p className="text-sm font-medium text-center mt-36 text-slate-500 w-max">
            Financial <br /> Management
            </p>
          </Circle>
          </a>
        </div>

        {/* Middle Row */}
        <div className="flex flex-row items-center justify-between ">
          <a href="#Human Resource Management">
          <Circle
            ref={circleRefs[1]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.designThinking />
            <p className="text-sm font-medium text-center mt-36 text-slate-500 w-max ">
            Human Resource <br /> Management
            </p>
          </Circle>
          </a>
          <a href="#Business Analytics & Research">
          <Circle
            ref={circleRefs[3]}
            className="relative flex flex-col items-center justify-center bg-[#F7F7F7]"
          >
            <Icons.imm />
            <p className="text-sm font-medium text-center mt-40 bg-white border  rounded-lg p-1 text-slate-500 w-max ">
              PGDM <br /> Specializations
            </p>
          </Circle>
          </a>
          <a href="#International Business Management">
          <Circle
            ref={circleRefs[5]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.machineLearning />
            <p className="text-sm font-medium text-center mt-36 text-slate-500 w-max ">
            Business  <br /> Analytics & <br /> Research
            </p>
          </Circle>
          </a>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-row items-center justify-between">
          <a href="#International Business Management">
          <Circle
            ref={circleRefs[2]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.metaverse />
            <p className="text-sm font-medium text-center mt-36 text-slate-500 w-max ">
            International  <br /> Business <br /> Management
            </p>
          </Circle>
          </a>
          <a href="#Entrepreneurship Management">
          <Circle
            ref={circleRefs[6]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.rProgramming />
            <p className="text-sm font-medium text-center mt-36 text-slate-500 w-max ">
            Entrepreneurship <br /> Management
            </p>
          </Circle>
          </a>
          <a href="#Operations & Supply Chain Management">
          <Circle
            ref={circleRefs[7]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.pgdm />
            <p className="text-sm font-medium text-center mt-36 text-slate-500 w-max ">
            Operations & <br /> Supply Chain <br /> Management
            </p>
          </Circle>
          </a>
        </div>
      </div>

      {/* Animated Beams */}
      {[
        { from: 0, to: 3, curvature: -75, endYOffset: -10 },
        { from: 1, to: 3 },
        { from: 2, to: 3, curvature: 75, endYOffset: 10 },
        { from: 4, to: 3, curvature: -75, endYOffset: -10, },
        { from: 5, to: 3, },
        { from: 6, to: 3, curvature: 75, endYOffset: 10,},
        { from: 7, to: 3, curvature: 75, endYOffset: 10 },
      ].map((beam, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={circleRefs[beam.from]}
          toRef={circleRefs[beam.to]}
          curvature={beam.curvature}
          endYOffset={beam.endYOffset}
          reverse={beam.reverse}
        />
      ))}
    </div>
  );
}

// Icons object remains the same
const Icons = {
  dataScience: () => (
    <img
      src={digital}
      alt="DS"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  python: () => (
    <img src={nudge} alt="python" className="absolute top-0 left-0 w-full h-full p-3" />
  ),
  pgdm: () => (
    <img src={P} alt="P" className="absolute top-0 left-0 w-full h-full p-3" />
  ),
  machineLearning: () => (
    <img
      src={research}
      alt="ML"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  imm: () => (
    <img src={logo} alt="imm" className="absolute top-0 left-0 w-full h-full p-3" />
  ),
  designThinking: () => (
    <img
      src={body}
      alt="DT"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  metaverse: () => (
    <img
      src={projects}
      alt="MV"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  rProgramming: () => (
    <img src={R} alt="R" className="absolute top-0 left-0 w-full h-full p-3" />
  ),
};
