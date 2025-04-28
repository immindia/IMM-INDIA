/* eslint-disable react/prop-types */
import Heading from "../../components/Heading";
import img1 from "../../assets/awards/Aims.webp";
import img2 from "../../assets/awards/Best B-School.webp";
import img3 from "../../assets/awards/Best Business School.webp";
import img4 from "../../assets/awards/Economic Times.webp";
import img5 from "../../assets/awards/Centre of Academic.webp";
import ShimmerButton from "@/components/ui/shimmer-button";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const cards = [
  {
    title: "AIMS Innovation Award",
    image: img1,
  },
  {
    title: "Best B-School Of the Year",
    image: img2,
  },
  {
    title: "Best Business School with Excellent",
    image: img3,
  },
  {
    title: "Economic Times Most Promising Brand",
    image: img4,
  },
  {
    title: "Centre of Academic Excellence (B School) from Delhi NCR",
    image: img5,
  },
];

const AwardsThreeD = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const buttonRef = useRef(null);

  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const areCardsInView = useInView(cardsRef, { once: true, amount: 0.1 });
  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      className="relative px-0 py-10 lg:py-20 md:py-12 sm:px-0 bg-gradient-to-bl  from-blue-950 via-blue-900 to-blue-950"
    >
      <div className="relative z-30 px-4 mx-auto max-w-screen-xl md:px-8">
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
            subtitle="We are proud to have received numerous Awards and Recognitions for our Academic Excellence and Innovation."
            subtitleClassName="text-gray-300 text-base md:text-lg"
            className="text-center"
          />
        </motion.div>
        <PlacementHighlights
          cardsRef={cardsRef}
          areCardsInView={areCardsInView}
        />
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
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black/60 dark:from-white dark:to-slate-900/10 lg:text-base flex items-center hover:text-gray-500 duration-300 ease-in-out ">
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

export default AwardsThreeD;

const CardItems = ({ item, index, areCardsInView }) => (
  <motion.div
    className="shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3),inset_0px_-2px_6px_0px_rgba(10,37,64,0.35)] flex flex-col items-center justify-center h-full p-2"
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{
      opacity: areCardsInView ? 1 : 0,
      y: areCardsInView ? 0 : 50,
      scale: areCardsInView ? 1 : 0.9,
    }}
    transition={{
      duration: 0.7,
      delay: 0.4 + index * 0.4,
      ease: "easeOut",
    }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="w-fit mx-auto relative">
      <img
        src="https://cdn.easyfrontend.com/pictures/logos/award-logo.png"
        alt=""
        className="max-w-[160px] sm:max-w-[220px] text-blue-600 mx-auto duration-500"
      />
      <Dialog>
        <DialogTrigger asChild>
          <img
            src={item.image}
            alt={item.title}
            className="w-24 sm:w-36 h-24 sm:h-36 object-cover rounded-full z-40 absolute top-4 border-2 sm:border-4 border-yellow-400 left-8 sm:left-10 cursor-pointer hover:border-yellow-300 transition-colors"
          />
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[600px] w-[98vw] rounded-md bg-transparent border-none"
          crossIcon="text-white sm:h-8 sm:w-8  rounded bg-slate-600 p-1"
        >
          <div className="w-full h-full flex justify-center items-center sm:p-8 p-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-contain rounded-lg"
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
      className="text-[17px] text-white font-medium leading-relaxed mb-0 text-center"
    >
      {item.title}
    </motion.h5>
  </motion.div>
);

function ThreeDCardDemo({ item, index, areCardsInView }) {
  return (
    <CardContainer className="inter-var w-fit mx-auto relative sm:h-[320px]">
      <CardBody className="group w-fit bg-transparent mx-auto relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] rounded-xl border p-6 sm:pl-0 shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3),inset_0px_-2px_6px_0px_rgba(10,37,64,0.35)] flex flex-col items-center justify-center h-full">
        <CardItem translateZ="100" className="w-fit mx-auto relative">
          <img
            src="https://cdn.easyfrontend.com/pictures/logos/award-logo.png"
            alt=""
            className="max-w-[160px] sm:max-w-[220px] text-blue-500 mx-auto duration-500"
          />
          <Dialog>
            <DialogTrigger asChild>
              <img
                src={item.image}
                alt={item.title}
                className="w-24 sm:w-36 h-24 sm:h-36 object-cover rounded-full z-40 absolute top-4 border-2 sm:border-4 border-yellow-400 left-8 sm:left-10 cursor-pointer hover:border-yellow-300 transition-colors"
              />
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[600px] w-[98vw] rounded-md bg-transparent border-none"
              crossIcon="text-white sm:h-8 sm:w-8  rounded bg-slate-600 p-1"
            >
              <div className="w-full h-full flex justify-center items-center sm:p-8 p-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-[17px] text-white font-medium leading-relaxed sm:pl-6 mb-0 text-center"
        >
          {item.title}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

const PlacementHighlights = ({ cardsRef, areCardsInView }) => {
  return (
    <section className="rounded-lg dark-gray dark:bg-[#0b1727] text-slate-800 dark:text-white">
      <div className="container mx-auto">
        <div
          ref={cardsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {cards.map((item, i) => (
            <div
              className={`${
                i === cards.length - 1 ? "col-span-2" : "sm:col-span-3"
              } duration-300 md:col-span-1 hover:scale-105`}
              key={i}
            >
              <CardItems
                item={item}
                index={i}
                areCardsInView={areCardsInView}
              />
            </div>
          ))}
          {cards.map((item, i) => (
            <div
              className={`duration-300 md:col-span-1 hover:scale-105`}
              key={i}
            >
              <ThreeDCardDemo
                item={item}
                index={i}
                areCardsInView={areCardsInView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
