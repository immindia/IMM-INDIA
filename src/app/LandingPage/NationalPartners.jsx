/* eslint-disable react/prop-types */
import { useState } from "react";
// import img from "next/img"
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export default function NationalPartners({ partners, isLoaded }) {
  return (
    <section>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          National Partners
        </h2>
        <div className="w-20 h-1 mt-2 bg-white/80"></div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full overflow-hidden transition-all duration-300 bg-white border-transparent group hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30">
              <CardContent className="p-0">
                <div className="relative flex items-center justify-center w-full p-0 overflow-hidden bg-white aspect-square dark:bg-slate-700">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="object-cover w-full h-full mx-auto shadow-md "
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col p-4 bg-white">
                  <h3 className="mb-2 font-semibold text-">{partner.name}</h3>
                  <Badge
                    variant="outline"
                    className="mb-4 w-fit bg-primary/10 text-primary dark:bg-primary/20 text-"
                  >
                    {partner.category}
                  </Badge>
                  <Link to={partner.website}>
                    {/* <Button variant="outline" className="w-full mt-auto text-xs group">
                    Read More
                    <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">
                      →
                      </span>
                    </Button> */}
                    <span className="w-full mt-auto text-sm group text-primary-color">
                      Read More{" "}
                      <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
