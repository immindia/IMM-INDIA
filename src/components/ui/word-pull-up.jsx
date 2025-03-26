"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function WordPullUp({
  words,

  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation for each word
        delayChildren: 0.3, // Delay before starting to stagger the words
      },
    },
  },

  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  },

  className,
}) {
  const controls = useAnimation();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Detect when the component is near the viewport
  const { ref, inView } = useInView({
    threshold: 0.3, // Lower threshold for earlier trigger
    triggerOnce: true, // Only animate once to improve performance
  });

  // Check for reduced motion preference or low-end device
  useEffect(() => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Simple performance check - can be expanded with more sophisticated detection
    const isLowEndDevice = navigator.hardwareConcurrency <= 4;

    setShouldReduceMotion(prefersReducedMotion || isLowEndDevice);
  }, []);

  // Control animation when in view
  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Prepare words array only once
  const wordArray = words.split(" ");

  return (
    <motion.h1
      ref={ref}
      variants={wrapperFramerProps}
      initial="hidden"
      animate={controls}
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{
            display: "inline-block",
            paddingRight: "8px",
            // GPU acceleration properties
            willChange: "transform, opacity",
            // Apply simpler animation for low-end devices
            ...(shouldReduceMotion && {
              transition: { type: "tween", duration: 0.3 },
            }),
          }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
