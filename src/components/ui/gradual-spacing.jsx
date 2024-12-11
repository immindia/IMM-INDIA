"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import the useInView hook
import { cn } from "@/lib/utils";

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,

  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },

  className
}) {
  // Use the useInView hook to detect when the component is in view
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is visible
    triggerOnce: false, // Allow re-animation each time it comes into view
  });

  return (
    <div ref={ref} className="flex justify-center space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // Animate based on inView state
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("drop-shadow-sm", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
