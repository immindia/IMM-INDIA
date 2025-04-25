/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import Heading from "../../components/Heading";
import ShimmerButton from "@/components/ui/shimmer-button";
import leaf from "../../assets/awards/leaf.png";

// Fallback image in case API image fails to load
import fallbackImg from "../../assets/awards/Best B-School.webp";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const areCardsInView = useInView(cardsRef, { once: true, amount: 0.1 });
  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("https://stealthlearn.in/imm-admin/api/index.php");
        if (!response.ok) {
          throw new Error("Failed to fetch awards");
        }
        const data = await response.json();
        
        // Filter only items with category "Award"
        const filteredAwards = data.filter(item => item.category === "Award");
        
        // If no awards found, use hardcoded data as fallback
        if (filteredAwards.length === 0) {
          setAwards(getFallbackAwards());
        } else {
          setAwards(filteredAwards);
        }
      } catch (err) {
        console.error("Error fetching awards:", err);
        setError(err.message);
        // Use fallback data in case of error
        setAwards(getFallbackAwards());
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  // Fallback data in case API fails
  const getFallbackAwards = () => {
    return [
      {
        id: "1",
        title: "AIMS Innovation Award",
        url: fallbackImg
      },
      {
        id: "2",
        title: "Best B-School Of the Year",
        url: fallbackImg
      },
      {
        id: "3",
        title: "Best Business School with Excellence",
        url: fallbackImg
      },
      {
        id: "4",
        title: "Economic Times Most Promising Brand",
        url: fallbackImg
      },
      {
        id: "5",
        title: "Centre of Academic Excellence (B School) from Delhi NCR",
        url: fallbackImg
      }
    ];
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-0 py-10 lg:py-20 md:py-12 sm:px-0 bg-gradient-to-bl from-blue-950 via-blue-900 to-blue-950"
    >
      <div className="relative z-30 px-4 mx-auto max-w-screen-xl md:px-0">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isHeadingInView ? 1 : 0,
            y: isHeadingInView ? 0 : 50,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Heading
            title="Awards and Recognitions"
            titleClassName="text-4xl md:text-6xl font-bold text-white"
            subtitle="We are proud to have received numerous awards and recognitions for our academic excellence and innovation."
            subtitleClassName="text-gray-300 text-base md:text-lg"
            className="text-center"
          />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error && awards.length === 0 ? (
          <div className="text-center text-red-400 mt-8">
            Error loading awards: {error}
          </div>
        ) : (
          <AwardsCards 
            awards={awards} 
            cardsRef={cardsRef} 
            areCardsInView={areCardsInView} 
          />
        )}

        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isButtonInView ? 1 : 0,
            y: isButtonInView ? 0 : 20,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <Link to="/about/accreditations-awards">
            <ShimmerButton
              className="shadow-2xl mt-12 mx-auto hover:-translate-y-2 duration-300 ease-in-out"
              background="#FFF"
              shimmerSize="0.1em"
              shimmerColor="#000"
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black/60 dark:from-white dark:to-slate-900/10 lg:text-base flex items-center hover:text-gray-500 duration-300 ease-in-out">
                View more
                <ChevronRight
                  size={20}
                  className="text-black/60 mt-1 group-hover:translate-x-1 duration-300 ease-in-out"
                />
              </span>
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;

const CardItem = ({ item, index, areCardsInView }) => {
  const tiltRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const tiltNode = tiltRef.current;

    // Only initialize tilt if node exists and user is not on a mobile device
    if (tiltNode && window.innerWidth > 768) {
      VanillaTilt.init(tiltNode, {
        max: 15, // Reduced from 25 to make it more subtle
        perspective: 1000,
        scale: 1.03, // Reduced from 1.05
        speed: 800,
        glare: true,
        "max-glare": 0.3, // Reduced from 0.5
        gyroscope: false, // Disabled to reduce complexity
        reverse: true,
      });
    }

    return () => {
      if (tiltNode && tiltNode.vanillaTilt) {
        tiltNode.vanillaTilt.destroy();
      }
    };
  }, []);

  // Handle image error
  const handleImgError = () => {
    console.error("Failed to load image for award:", item.title);
    setImgError(true);
  };

  // Handle image load
  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  // Determine image source
  const imgSrc = imgError ? fallbackImg : item.url;

  return (
    <motion.div
      ref={tiltRef}
      className="shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3),inset_0px_-2px_6px_0px_rgba(10,37,64,0.35)] flex flex-col items-center justify-start h-full py-2 rounded-xl bg-gradient-to-br from-blue-900/50 to-blue-950/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: areCardsInView ? 1 : 0,
        y: areCardsInView ? 0 : 50,
        scale: areCardsInView ? 1 : 0.9,
      }}
      transition={{
        duration: 0.5, // Reduced from 0.7
        delay: 0.2 + index * 0.2, // Reduced from 0.4
        ease: "easeOut",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="w-fit mx-auto relative"
        style={{
          transform: "translateZ(20px)", // Reduced from 50px
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={leaf}
          alt=""
          className="max-w-[160px] sm:max-w-[230px] text-blue-600 mx-auto duration-500"
          style={{
            transform: "translateZ(10px)", // Reduced from 20px
          }}
        />
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-24 sm:w-36 h-24 sm:h-36 rounded-full z-40 absolute top-4 sm:top-5 border-2 sm:border-4 border-yellow-400 left-8 sm:left-11 cursor-pointer hover:border-yellow-300 transition-colors overflow-hidden bg-gray-800">
              {!imgLoaded && !imgError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={imgSrc}
                alt={item.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transform: "translateZ(30px)", // Reduced from 75px
                }}
                onError={handleImgError}
                onLoad={handleImgLoad}
              />
            </div>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[600px] w-[98vw] rounded-md bg-transparent border-none"
            crossIcon="text-white sm:h-8 sm:w-8 rounded bg-slate-600 p-1"
          >
            <div className="w-full h-full flex justify-center items-center sm:p-8 p-3 bg-slate-900/80 rounded-lg">
              <img
                src={imgSrc}
                alt={item.title}
                className="w-full h-auto object-contain rounded-lg"
                onError={handleImgError}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <motion.h5
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: areCardsInView ? 1 : 0,
          y: areCardsInView ? 0 : 20,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.1,
        }}
        className="text-[17px] text-white font-medium leading-relaxed mb-0 text-center mt-4 px-2"
        style={{
          transform: "translateZ(20px)", // Reduced from 30px
          transformStyle: "preserve-3d",
        }}
      >
        {item.title}
      </motion.h5>
    </motion.div>
  );
};

const AwardsCards = ({ awards, cardsRef, areCardsInView }) => {
  // Show only first 5 awards if more are available
  const displayAwards = awards.slice(0, 5);
  
  return (
    <section className="rounded-lg dark-gray dark:bg-[#0b1727] text-slate-800 dark:text-white">
      <div className="container mx-auto">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {displayAwards.map((item, i) => (
            <div
              className={`${
                i === displayAwards.length - 1 && displayAwards.length === 5 ? "lg:col-span-1" : ""
              } duration-300 hover:scale-105`}
              key={i}
            >
              <CardItem item={item} index={i} areCardsInView={areCardsInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};