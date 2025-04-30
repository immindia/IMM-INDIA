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
import { Star, StarHalf } from "lucide-react";
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
  // Replace the hardcoded testimonials array with state
  const [testimonials, setTestimonials] = useState([]);
  const [centralImage, setCentralImage] = useState(AkshiImg); // Set default image
  const [fade, setFade] = useState(false);
  const [api, setApi] = useState(null);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback testimonials data
  const fallbackTestimonials = [
    {
      id: 1,
      image: AkshiImg,
      quote: "Watch my testimonial video",
      name: "Akshi Agarwal",
      position: "IMM Student",
      rating: 4.5,
      videoLink: "https://www.youtube.com",
    },
    {
      id: 2,
      image: AmanImg,
      quote: "Watch my testimonial video",
      name: "Aman Goswami",
      position: "IMM Student",
      rating: 4.5,
      videoLink: "https://www.youtube.com",
    },
    // Add more fallback testimonials as needed
  ];

  // Add useEffect to fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexTestimonial.php"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`);
        }

        const data = await response.json();

        // Check if data is valid and not empty
        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error("No testimonials data received");
        }

        // Transform the API data to match our component's structure
        const transformedData = data.map((item) => ({
          id: parseInt(item.id || 0),
          image: item.url || AkshiImg, // Fallback to default image if url is missing
          quote: "Watch my testimonial video",
          name: item.name || "IMM Student",
          position: item.position || "Student",
          rating: 4.5,
          videoLink: item.link || "https://www.youtube.com",
        }));

        setTestimonials(transformedData);
        // Set initial central image once data is loaded (without fade effect on initial load)
        if (transformedData.length > 0) {
          setCentralImage(transformedData[0].image);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError(error.message);
        // Use fallback testimonials data
        setTestimonials(fallbackTestimonials);
        setCentralImage(fallbackTestimonials[0].image);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!api || testimonials.length === 0) {
      return;
    }

    // Force carousel to update after data is loaded
    setTimeout(() => {
      api.reInit();
      // Make sure the central image is visible
      setCentralImage(testimonials[0].image);
    }, 100);

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentIndex(selectedIndex);
      handleImageChange(selectedIndex); // Update central image on carousel select
    });
  }, [api, testimonials]);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = AkshiImg; // Default fallback image
    e.target.onerror = null; // Prevent infinite error loop
  };

  // Function to handle image swapping with fade effect
  const handleImageChange = (index) => {
    if (!testimonials.length || index >= testimonials.length) return;

    setFade(true); // Trigger fade-out effect

    // Wait for fade-out to complete before swapping the images
    setTimeout(() => {
      setCentralImage(testimonials[index]?.image || AkshiImg);
      setCurrentIndex(index); // Update current index
      setFade(false); // Trigger fade-in effect after swap
    }, 300); // Adjust the timeout to match the fade-out duration
  };

  // Functions for next and previous button handling
  const handleNext = () => {
    if (!api || !testimonials.length) return;
    const nextIndex = (currentIndex + 1) % testimonials.length;
    api.scrollTo(nextIndex); // Scroll to the next testimonial
    handleImageChange(nextIndex); // Update central image
  };

  const handlePrevious = () => {
    if (!api || !testimonials.length) return;
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    api.scrollTo(prevIndex); // Scroll to the previous testimonial
    handleImageChange(prevIndex); // Update central image
  };

  // Function to handle orbiting circle clicks
  const handleOrbitingCircleClick = (index) => {
    if (!api || !testimonials.length) return;
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

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-lg">Loading testimonials...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-[400px]">
          <p className="text-lg text-red-500">
            Failed to load testimonials. Using backup data.
          </p>
        </div>
      ) : (
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
                className="w-[200px] rounded-full border border-blue-900"
                onError={handleImageError}
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
                  onError={handleImageError}
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
                onError={handleImageError}
              />
            </span>

            {/* Orbiting Circles */}
            <div>
              {testimonials.map((testimonial, index) => (
                <OrbitingCircles
                  key={testimonial.id}
                  className="size-[50px] border-none overflow-hidden"
                  radius={index % 2 === 0 ? 90 : 140} // Adjust radius for alternate circles
                  duration={20}
                  delay={index * 5} // Use index to stagger delays
                  reverse={index % 2 === 1} // Reverse effect for alternate circles
                >
                  <img
                    src={testimonial.image}
                    alt={`Person ${index + 1}`}
                    className={`w-[50px] cursor-pointer transition-opacity rounded-full border border-blue-900 duration-300 ${
                      fade ? "opacity-0" : "opacity-100"
                    }`}
                    onClick={() => handleOrbitingCircleClick(index)} // Update click handler
                    onError={handleImageError}
                  />
                </OrbitingCircles>
              ))}
            </div>
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
                                {[...Array(Math.floor(testimonial.rating))].map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      className="sm:w-6 sm:h-6 text-yellow-400 fill-current"
                                    />
                                  )
                                )}
                                {testimonial.rating % 1 === 0.5 && (
                                  <StarHalf className="sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                                )}
                                {/* <Star className="w-6 h-6 text-gray-300" /> */}
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
      )}
    </Container>
  );
}
