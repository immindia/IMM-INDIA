"use client";
import celebratingSuccess from "../../../assets/bba/celebratingsuccess.webp";
import { useState } from "react";
import { API_ENDPOINTS } from "@/lib/api";
import { motion } from "framer-motion";

const images = [
  {
    id: 1,
    src: `${API_ENDPOINTS.UPLOADS}/68075cde8b051.webp`,
    alt: "IMM Business School Campus",
    title: "Our Campus",
    description:
      "Experience our world-class facilities designed to provide an optimal learning environment.",
  },
  {
    id: 2,
    src: `${API_ENDPOINTS.UPLOADS}/68073314afec4.webp`,
    alt: "Students in classroom",
    title: "Interactive Learning",
    description:
      "Our teaching methodology focuses on interactive discussions and practical learning.",
  },
  {
    id: 3,
    src: `${API_ENDPOINTS.UPLOADS}/6807331471a47.webp`,
    alt: "Students studying",
    title: "Modern Facilities",
    description:
      "Access state-of-the-art resources including digital libraries and research databases.",
  },
  {
    id: 4,
    src: celebratingSuccess,
    alt: "Graduation ceremony",
    title: "Celebrating Success",
    description:
      "Join our community of successful graduates making an impact in the business world.",
  },
];

const ImageAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="flex flex-col sm:flex-row gap-2 h-[70vh] sm:h-[500px] w-full">
      {images.map((image, index) => {
        const isExpanded = index === expandedIndex;

        return (
          <motion.div
            key={image.id}
            className={`relative overflow-hidden rounded-lg sm:rounded-xl ${
              isExpanded
                ? "w-full h-4/6 sm:w-4/6 shadow-lg shadow-black/50 brightness-110"
                : "w-full h-1/6 sm:w-1/6 drop-shadow-sm  brightness-75"
            } transition-all duration-500 ease-in-out sm:h-full`}
            onMouseEnter={() => setExpandedIndex(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>

            <motion.div
              className="absolute bottom-0 left-0 z-10 p-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.5, delay: isExpanded ? 0.5 : 0 }}
            >
              <motion.h3
                className={`font-bold transition-all duration-300 ${
                  isExpanded
                    ? "text-xl mb-2"
                    : "text-sm rotate-[-90deg] origin-bottom-left sm:rotate-0"
                }`}
              >
                {image.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.5, delay: isExpanded ? 0.5 : 0 }}
                className="max-w-xs text-sm text-white/90"
              >
                {image.description}
              </motion.p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImageAccordion;
