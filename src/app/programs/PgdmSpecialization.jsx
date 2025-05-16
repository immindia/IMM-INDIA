"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import ML from "@/assets/pgdm/ML.gif";
import P from "@/assets/pgdm/P.gif";
import DS from "@/assets/pgdm/DS.gif";
import MV from "@/assets/pgdm/MV.gif";
import DT from "@/assets/pgdm/DT.gif";
import R from "@/assets/pgdm/R.gif";
import python from "@/assets/pgdm/Python Logo.mp4";

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
  const circleRefs = Array(7)
    .fill(null)
    .map(() => useRef(null));

  return (
    <div
      className="relative flex items-center justify-center w-full py-2 sm:p-20 sm:bg-background  sm:shadow-lg my-5 rounded-lg"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[350px] items-stretch justify-between gap-14">
        {/* Top Row */}
        <div className="flex flex-row items-center justify-between">
          <Circle
            ref={circleRefs[0]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.dataScience />
            <p className="text-sm font-medium text-center mt-28 text-slate-500 w-max ">
              Data Science
            </p>
          </Circle>
          <Circle
            ref={circleRefs[4]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.python />
            <p className="text-sm font-medium text-center mt-28 text-slate-500 w-max">
              Python
            </p>
          </Circle>
        </div>

        {/* Middle Row */}
        <div className="flex flex-row items-center justify-between ">
          <Circle
            ref={circleRefs[1]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.designThinking />
            <p className="text-sm font-medium text-center mt-28 text-slate-500 w-max ">
              Design Thinking
            </p>
          </Circle>
          <Circle
            ref={circleRefs[3]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.pgdm />
            <p className="text-sm font-medium text-center mt-28 text-slate-500 w-max ">
              PGDM Tools
            </p>
          </Circle>
          <Circle
            ref={circleRefs[5]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.machineLearning />
            <p className="text-sm font-medium text-center mt-28 text-slate-500 w-max ">
              Machine Learning
            </p>
          </Circle>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-row items-center justify-between">
          <Circle
            ref={circleRefs[2]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.metaverse />
            <p className="text-sm font-medium text-center mt-28 text-slate-500 w-max ">
              Metaverse 2.0
            </p>
          </Circle>
          <Circle
            ref={circleRefs[6]}
            className="relative flex flex-col items-center justify-center"
          >
            <Icons.rProgramming />
            <p className="text-sm font-medium text-center mt-28 text-slate-500 w-max ">
              R Programming
            </p>
          </Circle>
        </div>
      </div>

      {/* Animated Beams */}
      {[
        { from: 0, to: 3, curvature: -75, endYOffset: -10 },
        { from: 1, to: 3 },
        { from: 2, to: 3, curvature: 75, endYOffset: 10 },
        { from: 4, to: 3, curvature: -75, endYOffset: -10, reverse: true },
        { from: 5, to: 3, reverse: true },
        { from: 6, to: 3, curvature: 75, endYOffset: 10, reverse: true },
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
      src={DS}
      alt="DS"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  python: () => (
    <video src={python} className="absolute top-0 left-0 w-full h-full p-3" />
  ),
  pgdm: () => (
    <img src={P} alt="P" className="absolute top-0 left-0 w-full h-full p-3" />
  ),
  machineLearning: () => (
    <img
      src={ML}
      alt="ML"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  designThinking: () => (
    <img
      src={DT}
      alt="DT"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  metaverse: () => (
    <img
      src={MV}
      alt="MV"
      className="absolute top-0 left-0 w-full h-full p-3"
    />
  ),
  rProgramming: () => (
    <img src={R} alt="R" className="absolute top-0 left-0 w-full h-full p-3" />
  ),
};
