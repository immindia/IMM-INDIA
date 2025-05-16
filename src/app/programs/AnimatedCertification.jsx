"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
// import { User } from "lucide-react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import User from "@/assets/bba/icons/User.gif"
const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex  items-center  justify-center rounded-full  border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
const Rectangle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex  items-center  justify-center rounded  border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";
Circle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
Rectangle.displayName = "Rectangle";
Rectangle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export function AnimatedBeamMultipleOutputDemo({
  className,
  curriculumData,
  activeSemesterIndex = 0,
}) {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const userRef = useRef(null);
  const [beamsReady, setBeamsReady] = useState(false);

  // Create individual refs for each possible module (max 10)
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);

  // Get the active semester based on the index
  const activeSemester = curriculumData
    ? curriculumData[activeSemesterIndex]
    : null;

  // Create an array of refs
  const moduleRefs = [
    ref0,
    ref1,
    ref2,
    ref3,
    ref4,
    ref5,
    ref6,
    ref7,
    ref8,
    ref9,
  ];

  // Number of modules to display
  const moduleCount = activeSemester?.modules?.length || 0;

  // Reset and set up beams when tab changes
  useEffect(() => {
    setBeamsReady(false);
    const timer = setTimeout(() => {
      setBeamsReady(true);
    }, 150); // Small delay to ensure DOM elements are properly rendered

    return () => clearTimeout(timer);
  }, [activeSemesterIndex]);

  return (
    <div
      className={cn(
        "relative flex min-h-[500px] w-full items-center justify-center overflow-hidden sm:p-10 ",
        className
      )}
      ref={containerRef}
    >
      {activeSemester ? (
        <div className="flex size-full sm:max-w-3xl flex-row items-stretch justify-between gap-10">
          <div className="flex flex-col justify-center">
            <Circle ref={userRef} 
            className="hover:scale-110 transition-all duration-300"
            >
              <img src={User} alt="User" width="100" height="100" className="w-16 h-16 object-contain" />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Rectangle
              ref={centerRef}
              className=" hover:scale-105 transition-all duration-300 flex flex-col items-center justify-between p-4"
            >
              <img
                src={activeSemester.title.icon}
                alt={activeSemester.title.name}
                width="100"
                height="100"
                className="w-16 h-16 object-contain"
              />
              <p className="text-sm font-medium text-center text-slate-500 w-max">
                {activeSemester.title.name}
              </p>
            </Rectangle>
          </div>
          <div className="flex flex-col justify-center gap-10">
            {activeSemester.modules.map((module, index) => {
              if (index >= 10) return null; // Limit to 10 modules maximum

              return (
                <Rectangle
                  key={index}
                  ref={moduleRefs[index]}
                  className="flex flex-col items-center hover:scale-105 transition-all duration-300 justify-between"
                >
                  <img
                    src={module.icon}
                    alt={module.name}
                    width="100"
                    height="100"
                    className="w-16 h-16 object-contain"
                  />
                  <p className="text-sm font-medium text-center text-slate-500 w-max p-2">
                    {module.name}
                  </p>
                </Rectangle>
              );
            })}
          </div>
        </div>
      ) : (
        <div>No curriculum data available</div>
      )}

      {/* AnimatedBeams */}
      {beamsReady &&
        activeSemester &&
        moduleRefs
          .slice(0, moduleCount)
          .map(
            (moduleRef, index) =>
              moduleRef &&
              moduleRef.current && (
                <AnimatedBeam
                  key={index}
                  containerRef={containerRef}
                  fromRef={moduleRef}
                  toRef={centerRef}
                  duration={2}
                />
              )
          )}

      {beamsReady &&
        centerRef &&
        centerRef.current &&
        userRef &&
        userRef.current && (
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={userRef}
            duration={2}
          />
        )}
    </div>
  );
}

AnimatedBeamMultipleOutputDemo.propTypes = {
  className: PropTypes.string,
  curriculumData: PropTypes.array,
  activeSemesterIndex: PropTypes.number,
};
