"use client";

import { forwardRef, useRef } from "react";
import { User, Cpu } from "lucide-react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const Circle = forwardRef(({ className, children }, ref) => {
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

export function AnimatedBeamMultipleOutputDemo({
  className,
  curriculumData,
  activeSemesterIndex = 0,
}) {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const userRef = useRef(null);

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

  return (
    <div
      className={cn(
        "relative flex h-max w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      {activeSemester ? (
        <div className="flex size-full max-w-3xl flex-row items-stretch justify-between gap-10">
          <div className="flex flex-col justify-center">
            <Circle ref={userRef}>
              <User />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle
              ref={centerRef}
              className="size- flex flex-col items-center justify-between"
            >
              <Cpu />
              <p className="text-sm font-medium text-center text-slate-500 w-max">
                {activeSemester.semester}
              </p>
            </Circle>
          </div>
          <div className="flex flex-col justify-center gap-10">
            {activeSemester.modules.map((module, index) => {
              if (index >= 10) return null; // Limit to 10 modules maximum
              const ModuleIcon = module.icon;

              return (
                <Circle
                  key={index}
                  ref={moduleRefs[index]}
                  className="flex flex-col items-center justify-between"
                >
                  <ModuleIcon size={18} />
                  <p className="text-sm font-medium text-center text-slate-500 w-max">
                    {module.name}
                  </p>
                </Circle>
              );
            })}
          </div>
        </div>
      ) : (
        <div>No curriculum data available</div>
      )}

      {/* AnimatedBeams */}
      {activeSemester &&
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
                  duration={5}
                />
              )
          )}

      {centerRef && centerRef.current && userRef && userRef.current && (
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={centerRef}
          toRef={userRef}
          duration={5}
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
