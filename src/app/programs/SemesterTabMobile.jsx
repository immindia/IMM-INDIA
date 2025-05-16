"use client";

import { BookOpen, Layers, Code, GraduationCap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { curriculum as semesterData } from "./data/pgdm-program-data.js";

export default function SemesterTabMobile() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto gap-6 pt-4">
      {/* Vertical Tab Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="flex flex-col space-y-2">
          {semesterData.map((semester, index) => (
            <motion.button
              key={index}
              onMouseEnter={() => {
                setActiveTab(index);
                setHoveredTab(index);
              }}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab(index)}
              className={cn(
                "text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50",
                "flex items-center relative overflow-hidden",
                activeTab === index
                  ? "bg-gradient-to-r from-pink-700 to-pink-900 text-white drop-shadow-lg text-lg "
                  : "bg-white border-2 border-slate-100 hover:bg-gradient-to-r hover:from-pink-700 hover:to-pink-900 hover:text-white shadow-md shadow-black/20"
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
                <img
                  src={semester.title.icon}
                  alt={semester.title.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-pink-800">
                  {semesterData[activeTab].title.name}
                </h2>
                <p className="text-gray-500">
                  {semesterData[activeTab].semester}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Modules</h3>
                <ul className="space-y-3">
                  {semesterData[activeTab].modules.map((module, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.1 }}
                      className="flex items-center bg-pink-50 p-3 rounded-md"
                    >
                      <img
                        src={module.icon}
                        alt={module.name}
                        width={20}
                        height={20}
                        className="mr-3"
                      />
                      <span>{module.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
