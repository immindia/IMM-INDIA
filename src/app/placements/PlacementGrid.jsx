'use client'

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Building2 } from 'lucide-react'
import img1 from '../../assets/recruiters-logo/amazon.webp';
import img2 from '../../assets/recruiters-logo/citibank.webp';
import img3 from '../../assets/recruiters-logo/ese.webp';
import img4 from '../../assets/recruiters-logo/haldriram.webp';
const placements = [
  {
    name: "Imran Khan",
    year: "2020-22",
    company: "Amazon",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img1
  },
  {
    name: "Abhishek Singh",
    year: "2020-22",
    company: "Citi Bank",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img2
  },
  {
    name: "Aakash Singh",
    year: "2020-22",
    company: "ESE",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img3
  },
  {
    name: "Pranav Singh",
    year: "2020-22",
    company: "Haldriram",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img4
  },
  
  {
    name: "Imran Khan",
    year: "2020-22",
    company: "Amazon",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img1
  },
  {
    name: "Abhishek Singh",
    year: "2020-22",
    company: "Citi Bank",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img2
  },
  {
    name: "Aakash Singh",
    year: "2020-22",
    company: "ESE",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img3
  },
  {
    name: "Pranav Singh",
    year: "2020-22",
    company: "Haldriram",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img4
  },
  
  {
    name: "Imran Khan",
    year: "2020-22",
    company: "Amazon",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img1
  },
  {
    name: "Abhishek Singh",
    year: "2020-22",
    company: "Citi Bank",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img2
  },
  {
    name: "Aakash Singh",
    year: "2020-22",
    company: "ESE",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img3
  },
  {
    name: "Pranav Singh",
    year: "2020-22",
    company: "Haldriram",
    image: "https://v0.dev/placeholder.svg",
    companyImage: img4
  },
  
]

export default function PlacementGrid() {
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
              <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Placement Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {placements.map((placement, index) => (
            <motion.div
              key={placement.name + index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 hover:bg-gradient-to-t hover:from-black/0 duration-200 transition-all" />
                    <img
                      src={placement.companyImage || "/placeholder.svg"}
                      alt={`${placement.name}'s placement`}
                      className="h-full w-full object-contain sm:p-10 p-6"
                    />
                    <Badge 
                      variant={placement.company === "Pladis" ? "default" : "secondary"}
                      className="absolute top-4 right-4 z-20"
                    >
                      {placement.company}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{placement.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="h-4 w-4 mr-1" />
                        <span>{placement.year}</span>
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
  )
}

