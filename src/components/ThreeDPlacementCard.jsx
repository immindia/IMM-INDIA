/* eslint-disable react/prop-types */
"use client"

import React, { useState, useRef, useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Building2, ExternalLink } from "lucide-react"

export default function ThreeDPlacementCard({
  image = "https://v0.dev/placeholder.svg?height=400&width=300",
  name = "Alex Morgan",
  company = "Nexus Technologies",
  role = "Senior Developer",
  featured = false,
}) {
  const cardRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (in percentage)
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Set rotation values (multiplier controls sensitivity)
    setRotation({
      x: y * -20, // Inverted for natural feel
      y: x * 20,
    })

    // Set highlight position
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Reset rotation smoothly
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="group m-0 z-50 relative h-[300px] w-[250px] sm:h-[350px] sm:w-[250px] cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative h-full w-full rounded-xl bg-background transition-all duration-300 ease-out ${
          isHovered ? "shadow-2xl" : "shadow-md"
        }`}
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glowing highlight effect */}
        {isHovered && isMounted && (
          <div
            className="pointer-events-none absolute -inset-2 z-[-10] opacity-70 blur-xl"
            style={{
              background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(125, 39, 255, 0.8), transparent 40%)`,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Card content with 3D layers */}
        <div className="absolute inset-0 overflow-hidden rounded-md">
          {/* Background image layer */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="relative h-full w-full">
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                className="object-cover h-full w-full transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
          </div>

          {/* Content layer with 3D effect */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6" style={{ transform: "translateZ(40px)" }}>
            {featured && (
              <Badge
                className="absolute right-4 top-4 bg-gradient-to-r from-pink-600 to-blue-500 px-3 py-1 text-white"
                style={{ transform: "translateZ(60px)" }}
              >
                Featured
              </Badge>
            )}

            <div className="sm:mb-2 mt-auto">
              <h3
                className="mb-1 sm:text-2xl font-bold tracking-tight text-white"
                style={{ transform: "translateZ(50px)" }}
              >
                {name}
              </h3>
              <div className="mb-4 flex items-center gap-2" style={{ transform: "translateZ(45px)" }}>
                <Building2 className="h-4 w-4 text-pink-300" />
                <p className="text-sm font-medium text-pink-300">{company}</p>
              </div>
              {/* <p className="text-sm text-gray-300" style={{ transform: "translateZ(40px)" }}>
                {role}
              </p> */}
            </div>

            {/* <div
              className="hidden sm:block  transform-gpu rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-pink-500/30 group-hover:bg-white/10"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-300">View Profile</span>
                <ExternalLink className="h-4 w-4 text-pink-300" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
