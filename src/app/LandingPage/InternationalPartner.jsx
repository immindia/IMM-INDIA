/* eslint-disable react/prop-types */
"use client";

import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function InternationalPartner({ partner }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.3 });
  const isLogoInView = useInView(logoRef, { once: true, amount: 0.5 });

  return (
    <section ref={sectionRef}>
      <motion.div
        ref={titleRef}
        className="mb-8"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: isTitleInView ? 1 : 0, x: isTitleInView ? 0 : -40 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          International Partner
        </h2>
        <div className="mt-2 h-1 w-20 bg-white/80"></div>
      </motion.div>

      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{
          opacity: isContentInView ? 1 : 0,
          scale: isContentInView ? 1 : 0.9,
          y: isContentInView ? 0 : 40,
        }}
        transition={{ duration: 0.7, delay: 0.1 }}
        whileHover={{ y: -5 }}
        className="overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 dark:bg-slate-800"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-100 p-8 dark:bg-slate-700 md:h-80">
            <motion.div
              ref={logoRef}
              className="flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, rotateY: 30 }}
              animate={{
                opacity: isLogoInView ? 1 : 0,
                rotateY: isLogoInView ? 0 : 30,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                className="object-contain"
              />
            </motion.div>
          </div>
          <div className="flex flex-col justify-center p-8">
            <motion.h3
              className="mb-3 text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isContentInView ? 1 : 0,
                y: isContentInView ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {partner.name}
            </motion.h3>
            <motion.p
              className="mb-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isContentInView ? 1 : 0,
                y: isContentInView ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {partner.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isContentInView ? 1 : 0,
                y: isContentInView ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild className="group w-fit">
                <Link
                  to={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
