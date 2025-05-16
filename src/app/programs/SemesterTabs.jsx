"use client";
import { BookOpen } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { AnimatedBeamMultipleOutputDemo } from "./AnimatedCertification";
import { curriculum } from "./data/pgdm-program-data";
import { Badge } from "@/components/ui/badge";
export default function SemesterTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);

  // Use a debounced tab change to avoid rapid switching on hover
  const handleTabHover = useCallback((index) => {
    setHoveredTab(index);
    // Only change the active tab if the hover persists
    const timer = setTimeout(() => {
      setActiveTab(index);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="">
      <motion.div
        className="text-center sm:text-left mt-10 max-w-4xl mx mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
       
        <h2 className="sm:text-4xl text-3xl font-bold text-pink-900 mb-6 drop-shadow-md backdrop-blur-sm  w-fit">
        13 SKILL CERTIFICATIONS BY KLADIO
        </h2>
        <p className="text-gray-700 text-lg drop-shadow-sm backdrop-blur-sm">
          Choose from a variety of specializations designed to align with your
          career goals and industry demands.
        </p>
      </motion.div>
      <div className="flex flex-col md:flex-row w-full sm:max-w-7xl mx-auto gap-6 sm:px-4">
        {/* Vertical Tab Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="flex flex-col space-y-2">
            {curriculum.map((semester, index) => (
              <motion.button
                key={index}
                onMouseEnter={() => handleTabHover(index)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                  "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50",
                  "flex items-center relative overflow-hidden",
                  activeTab === index
                    ? "bg-gradient-to-r from-pink-700 to-pink-900 text-white"
                    : "bg-white border-2 border-slate-100 hover:bg-gradient-to-r hover:from-pink-700 hover:to-pink-900 hover:text-white "
                )}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={
                    hoveredTab === index
                      ? {
                          x: [0, 3, 0],
                          transition: {
                            duration: 0.5,
                            ease: "easeInOut",
                          },
                        }
                      : {}
                  }
                  className="flex items-center"
                >
                  {semester.modules && semester.modules[0] ? (
                    React.createElement(semester.modules[0].icon, {
                      className: "mr-2 h-5 w-5",
                    })
                  ) : (
                    <BookOpen className="mr-2 h-5 w-5" />
                  )}
                  {semester.semester}
                </motion.div>

                {/* Subtle background pulse effect on hover */}
                {hoveredTab === index && (
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0"
                    animate={{
                      opacity: [0, 0.1, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Display with Animation */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md min-h-[300px]">
          <AnimatePresence>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <AnimatedBeamMultipleOutputDemo
                curriculumData={curriculum}
                activeSemesterIndex={activeTab}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>{" "}
    </section>
  );
}
