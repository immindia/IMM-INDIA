"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { AnimatedList } from "@/components/ui/animated-list";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const ProgramCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState([0]);
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);

  // Set up refs for each slide
  useEffect(() => {
    if (items && items.length > 0) {
      slideRefs.current = Array(items.length)
        .fill()
        .map((_, i) => slideRefs.current[i] || React.createRef());
    }
  }, [items]);

  const nextSlide = () => {
    if (!items || items.length === 0) return;
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    if (!visibleSlides.includes(nextIndex)) {
      setVisibleSlides([...visibleSlides, nextIndex]);
    }
  };

  const prevSlide = () => {
    if (!items || items.length === 0) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    if (!visibleSlides.includes(prevIndex)) {
      setVisibleSlides([...visibleSlides, prevIndex]);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (!visibleSlides.includes(index)) {
      setVisibleSlides([...visibleSlides, index]);
    }
  };

  // If no items are provided, render nothing
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-xl">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="min-w-full">
              {visibleSlides.includes(index) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="relative  rounded-xl overflow-hidden">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 overflow-hidden h-96 md:h-[500px]">
                    <p className="text-gray-700 mb-6">{item.description}</p>
                    <AnimatedList className="space-y-1 w-full " delay={1500}>
                      {item.points.map((point, idx) => (
                        <Card
                          key={idx}
                          className="border bg-gradient-to-r from-blue-500 via-blue-700 to-blue-800  shadow-sm hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4 flex items-start">
                            <CheckCircle className="h-5 w-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-white text-sm">{point}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </AnimatedList>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevSlide}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: items.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                currentIndex === index
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

ProgramCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      points: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default ProgramCarousel;
