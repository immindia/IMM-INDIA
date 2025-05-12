/* eslint-disable react/prop-types */
"use client";

import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
const SpecializationCard = ({ title, description, icon, imageUrl }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl shadow-md h-full relative overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          
          className="object-cover h-full w-full"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-blue-800/30"></div> */}
        <div className="absolute bottom-0 left-0 p-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-full p-3 w-14 h-14 flex items-center justify-center ">
            {icon}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-blue-700 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <BorderBeam
        duration={6}
        size={600}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={600}
        className="from-transparent via-blue-500 to-transparent"
      />
    </motion.div>
  );
};

export default SpecializationCard;
