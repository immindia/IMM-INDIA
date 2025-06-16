"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function PlacementGrid() {
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await fetch(
          `https://stealthlearn.in/imm-admin/api/indexPlacement.php?category=${encodeURIComponent("Summer Placement")}`
        );
        const data = await response.json();
        // Filter for Summer Placement category
        const summerPlacements = data;
        // const summerPlacements = data.filter(
        //   (item) => item.category === "Summer Placement"
        // );

        // Prioritize specific names
        const prioritizedNames = [
          "Vipin Yadav",
          "Divya Bansal",
          "Dheeraj Satija",
          "Abhay Bhadouria",
          "Muskan Garg",
          "Milind K Yadav",
          "Tamanna Bhardwaj",
          "Ankur Sharma",
          "Shweta Singh",
          "Diksha Joshi",
          "Ritam Kalkhandey",
          "Shambhavi Mishra",
          "Gaurav Sahu",
          "Akshay Kumar",
        ];

        const prioritizedPlacements = [];
        const otherPlacements = [];

        summerPlacements.forEach((placement) => {
          if (prioritizedNames.includes(placement.title)) {
            prioritizedPlacements.push(placement);
          } else {
            otherPlacements.push(placement);
          }
        });

        // Ensure prioritized names appear in the specified order and handle duplicates like "Dheeraj Satija"
        const finalPrioritized = [];
        const seenTitles = new Set();

        prioritizedNames.forEach((name) => {
          summerPlacements.forEach((p) => {
            if (p.title === name && !seenTitles.has(p.id)) {
              // Use ID to distinguish if names can be non-unique
              finalPrioritized.push(p);
              seenTitles.add(p.id);
            }
          });
        });

        const remainingPlacements = summerPlacements
          .reverse()
          .filter((p) => !finalPrioritized.find((fp) => fp.id === p.id));

        setPlacements([...finalPrioritized, ...remainingPlacements]);
      } catch (error) {
        console.error("Error fetching placements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, []);

  // Preload the first 4 images that will be visible in the viewport
  useEffect(() => {
    if (typeof window !== "undefined" && placements.length > 0) {
      const preloadCount = 4; // Preload first 4 images
      placements.slice(0, preloadCount).forEach((placement) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = placement.url || "/placeholder.svg";
        document.head.appendChild(link);
      });
    }
  }, [placements]);

  const handleImageLoad = (id) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading placements...</p>
        </div>
      </div>
    );
  }

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
              Final Placement Highlights
            </h1>
            <p className="text-xl text-gray-600">
              Our talented students securing positions at leading companies
            </p>
          </motion.div>
        </div>

        {/* Placement Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placements.map((placement, index) => (
            <motion.div
              key={placement.id}
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
                        imagesLoaded[placement.id] ? "opacity-0" : "opacity-100"
                      } transition-opacity duration-300`}
                    />
                    <img
                      src={placement.url || "/placeholder.svg"}
                      alt={`${placement.title}'s placement`}
                      className="sm:h-full h-[200px] w-full object-cover object-top"
                      loading="lazy"
                      width={300}
                      height={400}
                      decoding="async"
                      fetchPriority={index < 4 ? "high" : "low"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onLoad={() => handleImageLoad(placement.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold capitalize text-lg mb-1 line-clamp-1 sm:line-clamp-none">
                        {placement.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        {placement.logo_url && (
                          <img
                            src={placement.logo_url}
                            alt={placement.title}
                            className="h-12"
                            loading="lazy"
                            height={32}
                            decoding="async"
                          />
                        )}
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
