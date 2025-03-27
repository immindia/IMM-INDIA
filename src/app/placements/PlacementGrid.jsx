"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { placementCards } from "@/data/placementData";
import { useEffect, useState } from "react";

export default function PlacementGrid() {
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Preload the first 4 images that will be visible in the viewport
  useEffect(() => {
    if (typeof window !== "undefined") {
      const preloadCount = 4; // Preload first 4 images
      placementCards.slice(0, preloadCount).forEach((placement) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = placement.image || "/placeholder.svg";
        document.head.appendChild(link);
      });
    }
  }, []);

  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Summer Placement Highlights
            </h1>
            <p className="text-xl text-gray-600">
              Our talented students securing positions at leading companies
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total Placements", value: "150+" },
            { label: "Companies", value: "25+" },
            { label: "Average Package", value: "12 LPA" },
            { label: "Highest Package", value: "24 LPA" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white hover:-translate-y-3 rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-2xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Placement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placementCards.map((placement, index) => (
            <motion.div
              key={placement.name + index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative sm:h-80 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 hover:bg-gradient-to-t hover:from-black/0 duration-200 transition-all" />
                    <div
                      className={`absolute inset-0 bg-gray-200 animate-pulse ${
                        imagesLoaded[placement.name + index]
                          ? "opacity-0"
                          : "opacity-100"
                      } transition-opacity duration-300`}
                    />
                    <img
                      src={placement.image || "/placeholder.svg"}
                      alt={`${placement.name}'s placement`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={300}
                      height={400}
                      decoding="async"
                      fetchPriority={index < 4 ? "high" : "low"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onLoad={() => handleImageLoad(placement.name + index)}
                    />
                    <Badge
                      variant={
                        placement.company === "Pladis" ? "default" : "secondary"
                      }
                      className="absolute top-4 right-4 z-20"
                    >
                      {placement.company}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {placement.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <img
                          src={placement.logo}
                          alt={placement.name}
                          className="h-8"
                          loading="lazy"
                          // width={32}
                          height={32}
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
