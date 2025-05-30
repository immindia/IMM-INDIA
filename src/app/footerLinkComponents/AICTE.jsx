"use client";

import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import { motion } from "framer-motion";
import { FileDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { yearGroups } from "./aicetData";

export default function AICTE() {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - AICTE Approval Letter");
    setDescription(
      "Download and verify the AICTE Approval Letter for your institute. Ensure compliance with AICTE norms and maintain transparency for quality technical education in India."
    );
  }, [setTitle, setDescription]);

  window.scrollTo(0, 0);
  const [selectedYear, setSelectedYear] = useState(null);

  // Group years by decade for better organization
  const handleYearClick = (year) => {
    setSelectedYear(year.year);
    // In a real application, this would trigger the download
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = year.pdf;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      // Simulate a click on this element to open in a new tab
      link.click();
      setSelectedYear(null);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">
          Download AICTE Approval Letter
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Select an academic year to download the corresponding AICTE approval
          letter
        </p>
      </motion.div>

      <Card className="border-0 shadow-md overflow-hidden">
        <CardHeader className="bg-slate-800 text-white py-6">
          <CardTitle className="text-center text-2xl font-bold">
            AICTE APPROVAL
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 h-auto">
              {yearGroups.map((group) => (
                <TabsTrigger
                  key={group.id}
                  value={group.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-8"
                >
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {yearGroups.map((group) => (
              <TabsContent key={group.id} value={group.id} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {group.years.map((year) => (
                    <motion.div
                      key={year.year}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        variant="outline"
                        className={`w-full h-16 text-lg font-medium relative overflow-hidden ${
                          selectedYear === year.year
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-[#8b1f41] hover:bg-[#7a1b39] text-white border-0 hover:text-white/80"
                        }`}
                        onClick={() => handleYearClick(year)}
                        disabled={selectedYear !== null}
                      >
                        {selectedYear === year.year ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2"
                          >
                            <FileDown className="h-5 w-5" />
                            Downloading...
                          </motion.div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 w-full">
                            {year.year}
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "mirror",
                                duration: 1.5,
                                ease: "easeInOut",
                              }}
                            >
                              <ChevronRight className="h-4 w-4 opacity-70" />
                            </motion.div>
                          </div>
                        )}

                        {/* Ripple effect on click */}
                        {selectedYear !== year.year && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial="initial"
                            whileTap="tap"
                            variants={{
                              initial: { opacity: 0 },
                              tap: { opacity: 0 },
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white rounded-md"
                              initial={{ scale: 0, opacity: 0.7 }}
                              whileTap={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Floating action button for mobile */}
      <motion.div
        className="fixed bottom-6 right-6 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button className="h-14 w-14 rounded-full shadow-lg bg-[#8b1f41] hover:bg-[#7a1b39]">
          <FileDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
}
