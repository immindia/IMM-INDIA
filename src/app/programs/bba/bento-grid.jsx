/* eslint-disable react/prop-types */
"use client";

import { motion } from "framer-motion";

const BentoGrid = ({ features }) => {
  // Define grid layout - which items take up more space
  const getGridClass = (index, size) => {
    if (size === "large") return "md:col-span-2 md:row-span-2 ";
    if (size === "medium") return "md:col-span-2 md:row-span-1 ";
    if (size === "") return "md:col-span-3 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative shadow-md hover:shadow-lg hover:shadow-black/80 shadow-black/50 drop-shadow-black  rounded-xl overflow-hidden group ${getGridClass(
            index,
            feature.size
          )}`}
        >
          <img
            src={feature.imageUrl || "/placeholder.svg"}
            alt={feature.title}
            
            className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10 z-0"></div>

          <div className="absolute inset- -bottom-0 flex flex-col justify-end p-6 text-white z-20 ">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>

            <p className="text-sm text-white/80 ">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BentoGrid;
