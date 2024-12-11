"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export function FadeText({
  direction = "up",
  className,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } },
  },
  text
}) {
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps;

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
      },
    };
  }, [directionOffset, axis, framerProps]);

  const handleViewportEnter = () => {
    setTimeout(() => {
      setIsVisible(true); // Trigger visibility after 1 second delay
    }, 1000);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      onViewportEnter={handleViewportEnter} // Call the function when entering the viewport
      viewport={{ once: false }} // Allows multiple triggers when entering the viewport
      variants={FADE_ANIMATION_VARIANTS}
    >
      <motion.span className={className}>{text}</motion.span>
    </motion.div>
  );
}
