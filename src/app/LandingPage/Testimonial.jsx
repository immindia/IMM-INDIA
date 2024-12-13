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
import img from "../../assets/test0.png";
import img1 from "../../assets/test1.png";
import img2 from "../../assets/test2.png";
import img3 from "../../assets/test3.png";
import img4 from "../../assets/test4.png";
import Heading from "../../components/Heading";

export default function Testimonial() {
  // Testimonials data array
  const testimonials = [
    {
      id: 0,
      image: img,
      quote: "I can't thank enough for the incredible courses they offer.",
      name: "Devon Lane",
      position: "Scrum Master",
    },
    {
      id: 1,
      image: img1,
      quote: "This course changed my life and career trajectory.",
      name: "John Doe",
      position: "Software Engineer",
    },
    {
      id: 2,
      image: img2,
      quote: "Amazing content and great instructors!",
      name: "Jane Smith",
      position: "Project Manager",
    },
    {
      id: 3,
      image: img3,
      quote: "I learned so much, and I’m applying it daily!",
      name: "Alice Johnson",
      position: "UX Designer",
    },
    {
      id: 4,
      image: img4,
      quote: "The best investment I've made in my education.",
      name: "Bob Brown",
      position: "Data Analyst",
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
        titleClassName="lg:font-extrabold lg:text-left  text-secondary-color rem]"
        className=" sm:hidden block w-full pb-0 text-left sm:col-span-4 sm:pb-0 lg:pb-14"
      />
      <div className="grid grid-cols-1 gap-8 md:gap-20 md:grid-cols-2">
        <div className="hidden relative h-[600px] md:flex w-full flex-col items-center justify-center rounded-lg">
          {/* Central Image with Fade Effect */}
          <span
            className={`pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <img src={centralImage} alt="Central" className="w-[220px]" />
          </span>

          {/* Orbiting Circles */}
          <div></div>
          {testimonials.map((testimonial, index) => (
            <OrbitingCircles
              key={testimonial.id}
              className="size-[100px] border-none"
              radius={index % 2 === 0 ? 170 : 290} // Adjust radius for alternate circles
              duration={20}
              delay={index * 5} // Use index to stagger delays
              reverse={index % 2 === 1} // Reverse effect for alternate circles
            >
              <img
                src={testimonial.image}
                alt={`Person ${index + 1}`}
                className={`w-[100px] cursor-pointer transition-opacity duration-300 ${
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
            className={`pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black transition-opacity duration-300 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <img src={centralImage} alt="Central" className="w-[100px]" />
          </span>

          {/* Orbiting Circles */}
          <div></div>
          {testimonials.map((testimonial, index) => (
            <OrbitingCircles
              key={testimonial.id}
              className="size-[50px] border-none"
              radius={index % 2 === 0 ? 90 : 140} // Adjust radius for alternate circles
              duration={20}
              delay={index * 5} // Use index to stagger delays
              // Reverse effect for alternate circles
            >
              <img
                src={testimonial.image}
                alt={`Person ${index + 1}`}
                className={`w-[50px] cursor-pointer transition-opacity duration-300 ${
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
            titleClassName="lg:font-extrabold lg:text-left  text-secondary-color rem]"
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
                            <div className="flex mb-4 justify-center sm:justify-start">
                              {[...Array(4)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="sm:w-6 sm:h-6 text-yellow-400 fill-current"
                                />
                              ))}
                              <Star className="w-6 h-6 text-gray-300" />
                            </div>
                            <blockquote className="md:text-3xl text-center sm:text-left text-xl font-medium text-gray-700 mb-4 sm:leading-[3rem]">
                              {testimonial.quote}
                            </blockquote>
                            <div className="mt-6">
                              <p className="text-lg text-center sm:text-left font-semibold text-red-600 md:text-2xl">
                                {testimonial.name}
                              </p>
                              <p className="text-sm text-center sm:text-left text-gray-600 md:text-xl">
                                {testimonial.position}
                              </p>
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
              className="absolute sm:left-[0px] left-[20%] top-[90%] sm:top-[110%] bg-gray-300 hover:bg-red-600 h-10 w-20 active:bg-red-700 sm:w-24 rounded-none opacity-100"
            />
            <CarouselNext
              onClick={handleNext}
              iconStyle="text-white h-4 lg:h-8"
              className="absolute sm:left-[110px] left-[55%] top-[90%] sm:top-[110%] bg-slate-300 hover:bg-red-600 w-20 sm:w-24 h-10 rounded-none opacity-100 active:bg-red-700"
            />
          </Carousel>
        </div>
      </div>
    </Container>
  );
}
