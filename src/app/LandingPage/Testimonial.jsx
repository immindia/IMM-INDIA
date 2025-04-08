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
// import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import AkshiImg from "../../assets/testimonials/Akshi Agarwal_11zon.webp";
import AmanImg from "../../assets/testimonials/Aman Goswami_11zon.webp";
import AmitImg from "../../assets/testimonials/Amit Kumar Aman_11zon.webp";
import AnjaliImg from "../../assets/testimonials/Anjali Sharma_11zon.webp";
import KunalImg from "../../assets/testimonials/Kunal Chaudhary_11zon.webp";
import MehtabImg from "../../assets/testimonials/Mehtab Agarwal_11zon.webp";
import PragyaImg from "../../assets/testimonials/Pragya Singhal_11zon.webp";
import ShrutiImg from "../../assets/testimonials/Shruti_11zon.webp";

export default function Testimonial() {
  // Testimonials data array
  const testimonials = [
    {
      id: 0,
      image: ShrutiImg,
      quote: "Watch my testimonial video",
      name: "Shruti",
      position: "Student",
      videoLink: "https://youtu.be/_wmO1XuXtew?feature=shared",
    },
    {
      id: 1,
      image: AmitImg,
      quote: "Watch my testimonial video",
      name: "Amit",
      position: "Student",
      videoLink: "https://youtu.be/UfCXe3g0z60?feature=shared",
    },
    {
      id: 2,
      image: AmanImg,
      quote: "Watch my testimonial video",
      name: "Aman",
      position: "Student",
      videoLink: "https://youtu.be/Gv5ooJEsBpc?feature=shared",
    },
    {
      id: 3,
      image: AkshiImg,
      quote: "Watch my testimonial video",
      name: "Akshi",
      position: "Student",
      videoLink: "https://youtu.be/UxdxlXncWS8?feature=shared",
    },
    {
      id: 4,
      image: PragyaImg,
      quote: "Watch my testimonial video",
      name: "Pragya",
      position: "Student",
      videoLink: "https://youtu.be/_uN1KDA46bA?feature=shared",
    },
    {
      id: 5,
      image: MehtabImg,
      quote: "Watch my testimonial video",
      name: "Mehtab",
      position: "Student",
      videoLink: "https://youtu.be/Y0nkrcTL5U8?feature=shared",
    },
    {
      id: 6,
      image: KunalImg,
      quote: "Watch my testimonial video",
      name: "Kunal",
      position: "Student",
      videoLink: "https://youtu.be/lCYdDnKrzxY?feature=shared",
    },
    {
      id: 7,
      image: AnjaliImg,
      quote: "Watch my testimonial video",
      name: "Anjali",
      position: "Student",
      videoLink: "https://youtu.be/zAtcsH8b5Ec?feature=shared",
    },
  ];

  // Set initial state for the central image
  const [centralImage, setCentralImage] = useState(testimonials[0].image);
  const [fade, setFade] = useState(false);
  const [api, setApi] = useState(null);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentIndex(selectedIndex);
      handleImageChange(selectedIndex); // Update central image on carousel select
    });
  }, [api]);

  // Function to handle image swapping with fade effect
  const handleImageChange = (index) => {
    setFade(true); // Trigger fade-out effect

    // Wait for fade-out to complete before swapping the images
    setTimeout(() => {
      setCentralImage(testimonials[index].image);
      setCurrentIndex(index); // Update current index
      setFade(false); // Trigger fade-in effect after swap
    }, 300); // Adjust the timeout to match the fade-out duration
  };

  // Functions for next and previous button handling
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    api.scrollTo(nextIndex); // Scroll to the next testimonial
    handleImageChange(nextIndex); // Update central image
  };

  const handlePrevious = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    api.scrollTo(prevIndex); // Scroll to the previous testimonial
    handleImageChange(prevIndex); // Update central image
  };

  // Function to handle orbiting circle clicks
  const handleOrbitingCircleClick = (index) => {
    api.scrollTo(index); // Scroll to the corresponding testimonial
    handleImageChange(index); // Update central image and current index
  };

  return (
    <Container className="grid ">
      <Heading
        title="Student Testimonials"
        titleClassName="lg:font-extrabold lg:text-left text-yellow-950 "
        className=" sm:hidden block w-full pb-0 text-left sm:col-span-4 sm:pb-0 lg:pb-14"
      />
      <div className="grid grid-cols-1 gap-8 md:gap-20 md:grid-cols-2">
        <div className="hidden relative h-[600px] md:flex w-full flex-col items-center justify-center rounded-lg">
          {/* Central Image with Fade Effect */}
          <span
            className={`pointer-events-none overflow-hidden whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={centralImage}
              alt="Central"
              className="w-[220px] rounded-full border border-blue-900"
            />
          </span>

          {/* Orbiting Circles */}
          <div></div>
          {testimonials.map((testimonial, index) => (
            <OrbitingCircles
              key={testimonial.id}
              className="size-[100px] border-none overflow-hidden"
              radius={index % 2 === 0 ? 170 : 290} // Adjust radius for alternate circles
              duration={20}
              delay={index * 5} // Use index to stagger delays
              reverse={index % 2 === 1} // Reverse effect for alternate circles
            >
              <img
                src={testimonial.image}
                alt={`Person ${index + 1}`}
                className={`w-[100px] cursor-pointer transition-opacity border border-blue-900 rounded-full duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => handleOrbitingCircleClick(index)} // Update click handler
              />
            </OrbitingCircles>
          ))}
        </div>
        <div className="md:hidden relative h-[300px] flex w-full flex-col items-center justify-center rounded-lg">
          {/* Central Image with Fade Effect */}
          <span
            className={`pointer-events-none  overflow-hidden whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={centralImage}
              alt="Central"
              className="w-[100px] rounded-full border border-blue-900"
            />
          </span>

          {/* Orbiting Circles */}
          <div></div>
          {testimonials.map((testimonial, index) => (
            <OrbitingCircles
              key={testimonial.id}
              className="size-[50px] border-none overflow-hidden"
              radius={index % 2 === 0 ? 90 : 140} // Adjust radius for alternate circles
              duration={20}
              delay={index * 5} // Use index to stagger delays
              // Reverse effect for alternate circles
            >
              <img
                src={testimonial.image}
                alt={`Person ${index + 1}`}
                className={`w-[50px] cursor-pointer transition-opacity rounded-full border border-blue-900 duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => handleOrbitingCircleClick(index)} // Update click handler
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
                              {[...Array(4)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="sm:w-6 sm:h-6 text-yellow-400 fill-current"
                                />
                              ))}
                              <Star className="w-6 h-6 text-gray-300" />
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
                                  {/* <BorderBeam className="absolute inset-0 rounded-full" /> */}
                                <Link
                                  to={testimonial.videoLink}
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
}
