"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Utility function to wrap a value between min and max
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Inner component that handles the parallax animation
function ParallaxContent({ children, baseVelocity = 100, className, gap = 16 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Calculate how many times to repeat the content to fill the container
  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth + gap;
        const newRepetitions = Math.ceil(containerWidth / contentWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children, gap]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);
  const directionFactor = useRef(1);

  // Animate the content position on each frame
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div 
      className="w-full overflow-hidden whitespace-nowrap" 
      ref={containerRef}
    >
      <motion.div 
        className={cn("inline-flex items-center", className)} 
        style={{ x }}
      >
        {Array.from({ length: repetitions }).map((_, i) => (
          <div 
            key={i} 
            ref={i === 0 ? contentRef : null}
            className={cn("inline-flex items-center", gap && `mr-${gap}`)}
          >
            {React.Children.map(children, (child, childIndex) => (
              <div key={childIndex} className={cn(gap && `mr-${gap}`)}>
                {child}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Main component that creates two parallax instances moving in opposite directions
export function InfiniteCarousel({
  children,
  defaultVelocity = 5,
  className,
  gap = 4,
  reverse = false,
  singleRow = false
}) {
  return (
    <section className="relative w-full">
      <ParallaxContent 
        baseVelocity={defaultVelocity} 
        className={className}
        gap={gap}
      >
        {children}
      </ParallaxContent>
      
      {!singleRow && (
        <ParallaxContent 
          baseVelocity={reverse ? defaultVelocity : -defaultVelocity} 
          className={className}
          gap={gap}
        >
          {children}
        </ParallaxContent>
      )}
    </section>
  );
}

export default InfiniteCarousel;