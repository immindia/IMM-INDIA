"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"

export default function CallUsButton() {
  const [expanded, setExpanded] = useState(false)

  // Toggle the expanded state for continuous animation
  useEffect(() => {
    const interval = setInterval(() => {
      setExpanded((prev) => !prev)
    }, 2000) // Toggle every 2 seconds

    return () => clearInterval(interval)
  }, [])

  // Spring configuration for smooth, bouncy animations
  const springConfig = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.button
        className="relative flex items-center justify-center bg-red-800 text-white rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        initial={{ width: 56, height: 56 }}
        animate={{
          width: expanded ? 160 : 100,
        }}
        transition={springConfig}
        aria-label="Call us"
      >
        {/* Container to keep everything aligned */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Pulsing circle animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/50 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </div>

        {/* Content container with fixed positioning */}
        <motion.div
          className="flex items-center justify-center w-full"
          animate={{
            justifyContent: expanded ? "flex-start" : "flex-start",
            paddingLeft: expanded ? "16px" : "16px",
          }}
          transition={springConfig}
        >
          {/* Phone icon - always visible */}
          <Phone className="h-6 w-6 text-white flex-shrink-0" />

          {/* Text container */}
          <motion.div
            className="overflow-hidden"
            initial={{ width: 0 }}
            animate={{
              width: expanded ? "auto" : 0,
            }}
            transition={springConfig}
          >
            {/* Text with slide-in animation */}
            <motion.span
              className="ml-2 font-medium whitespace-nowrap block"
              initial={{ x: 20, opacity: 0 }}
              animate={{
                x: expanded ? 0 : 20,
                opacity: expanded ? 1 : 0,
              }}
              transition={{
                ...springConfig,
                delay: expanded ? 0.1 : 0, // Slight delay for text appearance for better effect
              }}
            >
              Call Us
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.button>
    </div>
  )
}
