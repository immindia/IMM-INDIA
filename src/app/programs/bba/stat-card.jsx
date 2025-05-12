"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const StatCard = ({ value, label, icon: Icon, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const numericValue = Number.parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const end = Math.min(numericValue, 30000) // Cap at 5000 to prevent performance issues
          const increment = end / 100
          const stepTime = Math.abs(Math.floor(duration / 100))

          const timer = setInterval(() => {
            start += increment
            setCount(Math.floor(start))
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            }
          }, stepTime)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [numericValue, duration])

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-lg p-6 text-center h-full flex flex-col items-center justify-center"
    >
      <div className="rounded-full bg-blue-50 p-3 mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <div
        ref={countRef}
        className="text-3xl md:text-4xl font-bold text-amber-500 mb-2 flex items-center justify-center"
      >
        {count}
        <span>{suffix}</span>
      </div>
      <div className="text-sm md:text-base text-blue-800 font-medium">{label}</div>
    </motion.div>
  )
}

export default StatCard
