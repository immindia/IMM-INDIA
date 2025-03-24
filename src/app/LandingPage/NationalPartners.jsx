/* eslint-disable react/prop-types */
import { useState } from "react";
// import img from "next/img"
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        <div className="mt-2 h-1 w-20 bg-white/80"></div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full"
          >
            <Card className="group h-full overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-lg dark:hover:border-primary/30">
              <CardContent className="p-0">
                <div className="relative flex h-40 w-full items-center justify-center overflow-hidden bg-white p-6 dark:bg-slate-700">
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="object-contain h-full w-max mx-auto shadow-md rounded-md"
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col p-6">
                  <h3 className="mb-2 font-semibold">{partner.name}</h3>
                  <Badge
                    variant="outline"
                    className="mb-4 w-fit bg-primary/10 text-primary dark:bg-primary/20"
                  >
                    {partner.category}
                  </Badge>
                  <Link to={partner.website} >
                  <Button variant="outline" className="mt-auto group w-full">
                    Read More
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      →
                      </span>
                    </Button>
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
