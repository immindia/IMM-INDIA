/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Link } from "react-router-dom";
import AccreditationLogo from "./AccreditationLogo";
import { AccreditationLogoMobile } from "./AccreditationLogoMobile";
export default function Slider({
  slides,
  autoPlay = true,
  autoPlayInterval = 50000,
  indicators = true,
  arrows = true,
  effect = "cube",
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const sliderRef = useRef(null);
  const slideRefs = useRef([]);
  const cubeRef = useRef(null);

  const slideCount = slides.length;

  // Initialize slide refs array
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slideCount);
  }, [slideCount]);

  const animateSlideTransition = useCallback(
    (nextIndex, direction) => {
      if (!cubeRef.current) return;

      setIsAnimating(true);

      // Reset cube position
      gsap.set(cubeRef.current, {
        rotationY: 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      });

      // Set up the slides for the cube effect
      const currentSlideEl = slideRefs.current[currentSlide];
      const nextSlideEl = slideRefs.current[nextIndex];

      if (!currentSlideEl || !nextSlideEl) return;

      // Reset positions
      gsap.set([currentSlideEl, nextSlideEl], {
        rotationY: 0,
        zIndex: 0,
        visibility: "visible",
        opacity: 1,
      });

      // Position the slides for the cube effect
      if (effect === "cube") {
        // Current slide starts at front face
        gsap.set(currentSlideEl, {
          rotationY: 0,
          zIndex: 2,
          transformOrigin:
            direction === "right" ? "left center" : "right center",
        });

        // Next slide starts at the side face
        gsap.set(nextSlideEl, {
          rotationY: direction === "right" ? 90 : -90,
          zIndex: 1,
          transformOrigin:
            direction === "right" ? "right center" : "left center",
        });

        // Animate the cube rotation
        const timeline = gsap.timeline({
          onComplete: () => {
            setCurrentSlide(nextIndex);
            setIsAnimating(false);

            // Reset all slides
            slideRefs.current.forEach((slide, i) => {
              if (slide && i !== nextIndex) {
                gsap.set(slide, { visibility: "hidden", opacity: 0 });
              }
            });
          },
        });

        timeline
          .to(
            currentSlideEl,
            {
              duration: 0.8,
              rotationY: direction === "right" ? -90 : 90,
              ease: "power2.inOut",
            },
            0
          )
          .to(
            nextSlideEl,
            {
              duration: 0.8,
              rotationY: 0,
              ease: "power2.inOut",
            },
            0
          );
      } else if (effect === "flip") {
        // Set up for flip effect
        gsap.set(currentSlideEl, {
          rotationY: 0,
          zIndex: 2,
          backfaceVisibility: "hidden",
        });

        gsap.set(nextSlideEl, {
          rotationY: 180,
          zIndex: 1,
          backfaceVisibility: "hidden",
        });

        // Animate the flip
        const timeline = gsap.timeline({
          onComplete: () => {
            setCurrentSlide(nextIndex);
            setIsAnimating(false);

            // Reset all slides
            slideRefs.current.forEach((slide, i) => {
              if (slide && i !== nextIndex) {
                gsap.set(slide, { visibility: "hidden", opacity: 0 });
              }
            });
          },
        });

        timeline
          .to(
            currentSlideEl,
            {
              duration: 0.8,
              rotationY: 180,
              ease: "power2.inOut",
            },
            0
          )
          .to(
            nextSlideEl,
            {
              duration: 0.8,
              rotationY: 0,
              ease: "power2.inOut",
            },
            0
          );
      } else if (effect === "fade") {
        // Simple fade effect
        gsap.set(currentSlideEl, { zIndex: 1 });
        gsap.set(nextSlideEl, { zIndex: 2, opacity: 0 });

        gsap.to(nextSlideEl, {
          duration: 0.8,
          opacity: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentSlide(nextIndex);
            setIsAnimating(false);

            // Reset all slides
            slideRefs.current.forEach((slide, i) => {
              if (slide && i !== nextIndex) {
                gsap.set(slide, { visibility: "hidden", opacity: 0 });
              }
            });
          },
        });
      } else {
        // Default slide effect
        gsap.set(currentSlideEl, { x: 0 });
        gsap.set(nextSlideEl, { x: direction === "right" ? "100%" : "-100%" });

        gsap.to(currentSlideEl, {
          duration: 0.8,
          x: direction === "right" ? "-100%" : "100%",
          ease: "power2.inOut",
        });

        gsap.to(nextSlideEl, {
          duration: 0.8,
          x: 0,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentSlide(nextIndex);
            setIsAnimating(false);

            // Reset all slides
            slideRefs.current.forEach((slide, i) => {
              if (slide && i !== nextIndex) {
                gsap.set(slide, { visibility: "hidden", opacity: 0 });
              }
            });
          },
        });
      }
    },
    [currentSlide, effect]
  );

  const nextSlide = useCallback(() => {
    if (isAnimating) return;

    const nextIndex = (currentSlide + 1) % slideCount;
    setDirection("right");
    animateSlideTransition(nextIndex, "right");
  }, [currentSlide, slideCount, isAnimating, animateSlideTransition]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;

    const nextIndex = (currentSlide - 1 + slideCount) % slideCount;
    setDirection("left");
    animateSlideTransition(nextIndex, "left");
  }, [currentSlide, slideCount, isAnimating, animateSlideTransition]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;

    const direction = index > currentSlide ? "right" : "left";
    setDirection(direction);
    animateSlideTransition(index, direction);
  };

  // Initialize slides on mount
  useEffect(() => {
    if (!sliderRef.current) return;

    // Set initial state
    slideRefs.current.forEach((slide, i) => {
      if (slide) {
        gsap.set(slide, {
          visibility: i === currentSlide ? "visible" : "hidden",
          opacity: i === currentSlide ? 1 : 0,
          rotationY: 0,
        });
      }
    });
  }, [currentSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Handle touch events for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      <div className="relative w-full h-full perspective-1000" ref={cubeRef}>
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className={cn(
              "absolute top-0 left-0 w-full h-full backface-hidden",
              index === currentSlide ? "visible" : "invisible"
            )}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/10" />
            {index === 0 && slide.slider && (
              <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-start w-full h-full gap-10 md:p-12 lg:p-16">
               
                <div className="max-w-4xl ml-10 sm:space-y-8 ">
                  <h1 className="mb-4 space-y-4 text-4xl font-bold leading-tight lg:text-7xl md:text-6xl">
                    <SparklesText
                      className="text-4xl text-transparent bg-gradient-to-r from-white via-white/80 to-white/70 bg-clip-text sm:text-5xl md:text-5xl lg:text-7xl"
                      text={slide.heading1}
                      colors={{
                        first: "#DDC99F",
                        second: "#C4184B",
                      }}
                    />

                    <SparklesText
                      className="text-4xl text-transparent bg-gradient-to-r from-white via-white/80 to-white/70 bg-clip-text sm:text-5xl md:text-5xl lg:text-7xl"
                      text={slide.heading2}
                      colors={{
                        first: "#DDC99F",
                        second: "#C4184B",
                      }}
                    />
                  </h1>

                  <p className="mb-6 text-xl lg:text-3xl text-white/90 md:text-2xl">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-5 sm:mt-14">
                    <Link
                      to="/programs/pgdm"
                      className="relative overflow-hidden rounded-full bg-[#C4184B] px-6 py-2 text-sm lg:text-lg font-semibold text-white hover:bg-white hover:text-black duration-150 transition-all hover:-translate-y-2"
                    >
                      <span>
                        <BorderBeam className="absolute inset-0" />
                        PGDM Program
                      </span>
                    </Link>
                    <Link
                      to="/programs/bba"
                      className="relative overflow-hidden rounded-full bg-[#C4184B] px-6 py-2 text-sm lg:text-lg font-semibold text-white hover:bg-white hover:text-black duration-150 transition-all hover:-translate-y-2"
                    >
                      <span>
                        <BorderBeam className="absolute inset-0" />
                        BBA Program
                      </span>
                    </Link>
                  </div>
                </div>
                {/* <div className="hidden md:block px-5 py-1 rounded-lg bg-black/40 backdrop-blur-3xl">
                  <AccreditationLogo />
                </div> */}
                <div className="block sm:hidden px-5 py-1 rounded-lg bg-black/40 backdrop-blur-3xl">
                  <AccreditationLogoMobile />
                </div>
              </div>
            )}

            {!slide.slider && (
              <div className="absolute left-0 right-0 z-20 bottom-10">
                <div className="max-w-4xl mx-auto">
                {/* <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl md:mb-6">{slide.title}</h2> */}
                {/* <p className="max-w-2xl text-base md:text-lg lg:text-xl text-white/90">{slide.description}</p> */}
              </div>

                {/* <div className="w-full bg-black/40 backdrop-blur-sm">
                  <h1 className="px-3 py-2 mx-auto text-lg text-white rounded-md w-max">
                    {"📍" + slide.category}
                  </h1>
                </div> */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {arrows && (
        <div className="hidden sm:flex ">
          <Button
            onClick={prevSlide}
            disabled={isAnimating}
            className="z-20 p-2 -translate-y-1/2 border rounded-full sm:absolute left-4 top-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 md:p-3"
            size="icon"
            variant="ghost"
          >
            <ChevronLeft className="w-5 h-5 text-white md:h-6 md:w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute z-20 p-2 -translate-y-1/2 border rounded-full right-6 top-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 md:p-3"
            size="icon"
            variant="ghost"
          >
            <ChevronRight className="w-5 h-5 text-white md:h-6 md:w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      )}

      {/* Indicators */}
      {indicators && (
        <div className="absolute z-20 flex space-x-2 -translate-x-1/2 bottom-6 left-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "hidden md:block w-2 h-2 md:w-4 md:h-1 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/20 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
