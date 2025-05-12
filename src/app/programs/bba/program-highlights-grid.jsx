/* eslint-disable react/prop-types */
"use client";

import { motion } from "framer-motion";

const ProgramHighlightsGrid = ({ highlights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {highlights.map((highlight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative h-[300px] rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-black/50  "
        >
          <img
            src={highlight.imageUrl || "/placeholder.svg"}
            alt={highlight.title}
            
            className={` h-full w-full transition-transform duration-700 group-hover:scale-110 ${index === 0 ? "object-contain p-10 bg-blue-950" : " object-cover"}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors duration-300">
              {highlight.icon}
            </div>

            <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>

            <motion.p
              initial={{ opacity: 0.7, height: "1.5rem", overflow: "hidden" }}
              whileHover={{ opacity: 1, height: "auto" }}
              className="text-sm text-white/80"
            >
              {highlight.description}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgramHighlightsGrid;
