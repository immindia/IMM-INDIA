import { useEffect, useState, useRef } from "react";
import Container from "../../components/wrappers/Container";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import OrbitingCircles from "../../components/ui/orbiting-circles";

import Heading from "../../components/Heading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AkshiImg from "../../assets/testimonials/Akshi Agarwal_11zon.webp";
import AmanImg from "../../assets/testimonials/Aman Goswami_11zon.webp";
import { useTestimonialsData } from "../../hooks/useApiData";
import LazySection from "../../components/LazySection";

// Loading skeleton component
const TestimonialSkeleton = () => (
  <Container className="grid">
    <Heading
      title="Student Testimonials"
      titleClassName="lg:font-extrabold lg:text-left text-yellow-950 "
      className=" sm:hidden block w-full pb-0 text-left sm:col-span-4 sm:pb-0 lg:pb-14"
    />
    <div className="flex justify-center items-center h-[400px] animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64"></div>
    </div>
  </Container>
);

const TestimonialContent = () => {
  const { data: testimonialsData, isLoading, error } = useTestimonialsData();
  const [centralImage, setCentralImage] = useState(AkshiImg);
  const [fade, setFade] = useState(false);
  const [api, setApi] = useState(null);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackTestimonials = [
    {
      id: 1,
      image: AkshiImg,
      quote: "Fallback: Watch my testimonial video",
      name: "Akshi Agarwal (Fallback)",
      position: "IMM Student",
      rating: 4.5,
      videoLink: "https://www.youtube.com",
    },
    {
      id: 2,
      image: AmanImg,
      quote: "Fallback: Watch my testimonial video",
      name: "Aman Goswami (Fallback)",
      position: "IMM Student",
      rating: 4.5,
      videoLink: "https://www.youtube.com",
    },
  ];

  const testimonials =
    testimonialsData?.length > 0 ? testimonialsData : fallbackTestimonials;

  useEffect(() => {
    if (testimonials.length > 0 && !centralImage) {
      setCentralImage(testimonials[0].image || AkshiImg);
    }
  }, [testimonials, centralImage]);

  useEffect(() => {
    if (!api || testimonials.length === 0) {
      return;
    }
    setTimeout(() => {
      api.reInit();
      if (testimonials[currentIndex]) {
        setCentralImage(testimonials[currentIndex].image || AkshiImg);
      }
    }, 100);

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      handleImageChange(selectedIndex);
    };
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, testimonials, currentIndex]);

  const handleImageError = (e) => {
    e.target.src = AkshiImg;
    e.target.onerror = null;
  };

  const handleImageChange = (index) => {
    if (!testimonials.length || index < 0 || index >= testimonials.length)
      return;
    setFade(true);
    setTimeout(() => {
      setCentralImage(testimonials[index]?.image || AkshiImg);
      setCurrentIndex(index);
      setFade(false);
    }, 300);
  };

  const handleNext = () => {
    if (!api || !testimonials.length) return;
    api.scrollNext();
  };

  const handlePrevious = () => {
    if (!api || !testimonials.length) return;
    api.scrollPrev();
  };

  const handleOrbitingCircleClick = (index) => {
    if (
      !api ||
      !testimonials.length ||
      index < 0 ||
      index >= testimonials.length
    )
      return;
    api.scrollTo(index);
    handleImageChange(index);
  };

  if (isLoading) {
    return <TestimonialSkeleton />;
  }

  if (error && testimonialsData?.length === 0) {
    return (
      <Container className="grid">
        <Heading
          title="Student Testimonials"
          titleClassName="lg:font-extrabold lg:text-left text-yellow-950 "
          className=" sm:hidden block w-full pb-0 text-left sm:col-span-4 sm:pb-0 lg:pb-14"
        />
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-lg text-red-500">
            Failed to load testimonials. {error.message}. Displaying fallback
            content.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="grid ">
      <Heading
        title="Student Testimonials"
        titleClassName="lg:font-extrabold lg:text-left text-yellow-950 "
        className=" sm:hidden block w-full pb-0 text-left sm:col-span-4 sm:pb-0 lg:pb-14"
      />

      <div className="grid grid-cols-1 gap-8 md:gap-20 md:grid-cols-2">
        <div className="hidden relative h-[600px] md:flex w-full flex-col items-center justify-center rounded-lg">
          <span
            className={`pointer-events-none overflow-hidden whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={centralImage}
              alt="Central Testimonial Student"
              className="w-[200px] rounded-full border border-blue-900 transition-opacity duration-300"
              onError={handleImageError}
            />
          </span>
          {testimonials.map((testimonial, index) => (
            <OrbitingCircles
              key={testimonial.id}
              className="size-[100px] border-none overflow-hidden"
              radius={index % 2 === 0 ? 170 : 290}
              duration={20}
              delay={index * 5}
              reverse={index % 2 === 1}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name || `Person ${index + 1}`}
                className={`w-[100px] cursor-pointer transition-opacity border border-blue-900 rounded-full duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => handleOrbitingCircleClick(index)}
                onError={handleImageError}
              />
            </OrbitingCircles>
          ))}
        </div>

        <div className="md:hidden relative h-[300px] flex w-full flex-col items-center justify-center rounded-lg">
          <span
            className={`pointer-events-none  overflow-hidden whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={centralImage}
              alt="Central Testimonial Student Mobile"
              className="w-[100px] rounded-full border border-blue-900"
              onError={handleImageError}
            />
          </span>
          {testimonials.map((testimonial, index) => (
            <OrbitingCircles
              key={testimonial.id}
              className="size-[50px] border-none overflow-hidden"
              radius={index % 2 === 0 ? 90 : 140}
              duration={20}
              delay={index * 5}
              reverse={index % 2 === 1}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name || `Person ${index + 1}`}
                className={`w-[50px] cursor-pointer transition-opacity rounded-full border border-blue-900 duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => handleOrbitingCircleClick(index)}
                onError={handleImageError}
              />
            </OrbitingCircles>
          ))}
        </div>

        <div className="w-full h-full">
          <Heading
            title="Student Testimonials"
            titleClassName="lg:font-extrabold lg:text-left  text-primary-color"
            className=" hidden sm:block w-full pb-0 text-left sm:col-span-4 sm:pb-0 lg:pb-14"
          />
          <Carousel
            plugins={[plugin.current]}
            setApi={setApi}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="p-1">
                    <Card className="bg-transparent border-none rounded-none shadow-none">
                      <CardContent className="p-0 lg min-h-[250px] sm:h-[350px] border-none shadow-none grid">
                        <div className="bg-white">
                          <div className="p-0 sm:space-y-8">
                            <div className="flex mb-4 items-center justify-center sm:justify-start">
                              {[
                                ...Array(Math.floor(testimonial.rating || 0)),
                              ].map((_, i) => (
                                <Star
                                  key={i}
                                  className="sm:w-6 sm:h-6 text-yellow-400 fill-current"
                                />
                              ))}
                              {testimonial.rating % 1 === 0.5 && (
                                <Star
                                  key="half"
                                  className="sm:w-6 sm:h-6 text-yellow-400 fill-current"
                                />
                              )}
                            </div>
                            <div className="mt-6">
                              <p className="text-lg text-center sm:text-left font-semibold text-red-600 md:text-2xl">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-center sm:text-left text-gray-600 md:text-xl">
                                {testimonial.position}
                              </p>
                              <div className="flex justify-center sm:justify-start">
                                <Button className="mt-4 sm:mt-8 w-fit mx-auto sm:mx-0 rounded-full bg-[#C4184B] hover:bg-primary-color px-6 !py-2 text-sm lg:text-lg font-semibold text-white duration-150 transition-all hover:-translate-y-2 ">
                                  <Link
                                    to={testimonial.videoLink || "#"}
                                    target="_blank"
                                  >
                                    Watch Testimonial Video{" "}
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              onClick={handlePrevious}
              iconStyle="text-white h-4 lg:h-8"
              className="absolute sm:left-[0px] left-[20%] top-[90%] sm:top-[110%] bg-gray-300 hover:bg-pink-800 h-10 w-20 active:bg-pink-700 sm:w-24 rounded-none opacity-100"
            />
            <CarouselNext
              onClick={handleNext}
              iconStyle="text-white h-4 lg:h-8"
              className="absolute sm:left-[110px] left-[55%] top-[90%] sm:top-[110%] bg-slate-300 hover:bg-pink-800 w-20 sm:w-24 h-10 rounded-none opacity-100 active:bg-pink-700"
            />
          </Carousel>
        </div>
      </div>
    </Container>
  );
};

export default function Testimonial() {
  return (
    <LazySection fallback={<TestimonialSkeleton />} rootMargin="100px">
      <TestimonialContent />
    </LazySection>
  );
}
