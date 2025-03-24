/* eslint-disable react/prop-types */
"use client"


import {Link} from "react-router-dom"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"



export default function InternationalPartner({ partner, isLoaded }) {
  return (
    <section>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">International Partner</h2>
        <div className="mt-2 h-1 w-20 bg-white/80"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ y: -5 }}
        className="overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 dark:bg-slate-800"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-100 p-8 dark:bg-slate-700 md:h-80">
            <motion.div className="relative h-full w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                className="object-contain"
              />
            </motion.div>
          </div>
          <div className="flex flex-col justify-center p-8">
            <h3 className="mb-3 text-2xl font-bold">{partner.name}</h3>
            <p className="mb-6 text-muted-foreground">{partner.description}</p>
            <Button asChild className="group w-fit">
              <Link to={partner.website} target="_blank" rel="noopener noreferrer">
                Read More
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

