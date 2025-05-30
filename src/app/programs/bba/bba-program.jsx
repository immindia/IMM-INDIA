/* eslint-disable no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMeta } from "@/context/MetaContext";

import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Waves from "../../../../yes/Waves/Waves";

import EnquiryForm from "./enquiry-form";
import StatCard from "./stat-card";
import ImageAccordion from "./image-accordion";
import { useInView } from "react-intersection-observer";
import ProgramHighlightsGrid from "./program-highlights-grid";
import BentoGrid from "./bento-grid";
import ProgramCarousel from "./program-carousel";
import SpecializationCard from "./specialization-card";
import { useTheme } from "@/context/ThemeContext";
import { useMarquee } from "../../../context/MarqueeContext.jsx";
// Data arrays
import {
  specializations,
  features,
  stats,
  faqItems,
  programHighlights,
  semesterFees,
  programCarouselItems,
} from "../data/bba-program-data";
import { useFetch } from "../../../hooks/useFetch";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import pgdm from "../../../assets/pdfs/BBA Brochure 2025-2028.pdf";
const BBAProgram = () => {
  const { setTitle, setDescription } = useMeta();
  const { updateColors } = useTheme();
  const { setMarqueeText, setIsBBAPage } = useMarquee();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [isSuccess, setIsSuccess] = useState(false);

  // Set meta tags, custom colors, and marquee text when component mounts
  useEffect(() => {
    setTitle("BBA Program - IMM Business School");
    setDescription(
      "Explore the BBA program at IMM Business School—one of the best BBA colleges in Delhi NCR."
    );
    updateColors("bg-blue-900", "bg-blue-900");
    setMarqueeText("Admission Open 2025-28 Session");
    setIsBBAPage(true);

    // Reset colors and marquee when component unmounts
    return () => {
      updateColors("bg-primary-color", "bg-primary-color");
      setMarqueeText("Phase 3 Applications Closed for PGDM 2025-2027");
      setIsBBAPage(false);
    };
  }, [setTitle, setDescription, updateColors, setMarqueeText, setIsBBAPage]);

  const { data } = useFetch("/api/indexBanner.php");
  const [bannerImage, setBannerImage] = useState(
    "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
  ); // Default image
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data) {
      const mobileImage = data.find(
        (item) => item.category === "BBA Mobile"
      )?.url;
      const desktopImage = data.find((item) => item.category === "BBA")?.url;

      if (isMobile && mobileImage) {
        setBannerImage(mobileImage);
      } else if (!isMobile && desktopImage) {
        setBannerImage(desktopImage);
      } else if (desktopImage) {
        setBannerImage(desktopImage);
      } else if (mobileImage) {
        setBannerImage(mobileImage);
      }
    }
  }, [data, isMobile]);
  // Refs for scroll animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    window.scrollTo({
      top: window.innerWidth > 768 ? 10 : 400,
      behavior: "smooth",
    });
  };

  // Success notification handler
  const handleFormSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  // Intersection observer hooks for animations
  const [welcomeRef, welcomeInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [highlightsRef, highlightsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="min-h-screen overflow-x-hidden  ">
      {/* Enquiry Form Toggle Button - Sticky */}
      <div className="fixed right-0 sm:right-0 top-[35vh] z-[999] transform -translate-y-1/3">
        <button
          onClick={toggleForm}
          className={`flex items-center bg-amber-500 hover:bg-amber-600 text-white px-2 py-3 rounded-r  -lg shadow-lg transition-all duration-300 animate-[fadeIn_1s_ease-in-out_1_normal_backwards_running] ${
            isFormVisible ? "opacity-100" : "opacity-100"
          }`}
          style={{
            writingMode: "vertical-rl",
            transform: isFormVisible
              ? "translateX(0) rotate(0deg)"
              : "translateX(0) rotate(180deg)",
          }}
        >
          {isFormVisible ? <X className="h-5 w-5 mb-2" /> : "Enquire Now"}
        </button>
      </div>
      <div className="fixed -right-[4.5rem] sm:-right-[4.5rem] top-[65vh] z-50 transform -translate-y-1/2">
        {/* <Magnet
          padding={150}
          disabled={window.innerWidth < 768 ? true : false}
          magnetStrength={20}
          className=""
        > */}
        <a
          href={pgdm}
          target="_blank"
          className={`flex items-center rotate-[270deg] bg-amber-500 hover:bg-amber-600 text-white px-4 pt-2 pb-5 rounded-lg drop-shadow-lg transition-all duration-300 animate-pulse `}
        >
          Download Brochure
        </a>
        {/* </Magnet> */}
      </div>

      {/* Hero Banner Section with Parallax Effect */}
      <section
        ref={heroRef}
        id="overview"
        className="relative py-5 sm:py-10 sm:h-[80vh] flex items-center justify-center text-white overflow-hidden"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img
            src={bannerImage}
            alt="IMM Business School Campus"
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 "></div>
        </motion.div>

        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4 relative z-10 min-h-[70vh]   grid justify-end items-end sm:items-center sm:justify-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-6"
              >
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-2 sm:px-4 py-1 text-xs   sm:text-sm font-medium">
                  1st Time in India
                </Badge>
                <h1 className="hidden sm:block text-4xl max-w-lg md:text-5xl lg:text-6xl font-bold tracking-wide  drop-shadow-md">
                  AI & ML Infused{" "}
                  <span className="text-amber-400">BBA Program</span> in New
                  Delhi
                </h1>
                <h1 className="block sm:hidden text-4xl max-w-lg md:text-5xl lg:text-6xl font-bold tracking-wide  drop-shadow-md">
                  AI & ML infused <br />
                  <span className="text-amber-400">BBA</span>
                </h1>
                <p className="hidden sm:block text-lg md:text-xl text-slate-100 max-w-2xl drop-shadow-sm">
                  Prepare for the future of business with our innovative program
                  that combines traditional business education with cutting-edge
                  technology.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-1 sm:px-4 sm:py-1.5 py-1">
                    AICTE Approved
                  </Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-1 sm:px-4 sm:py-1.5 py-1">
                    NEP 2020 Aligned
                  </Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-1 sm:px-4 sm:py-1.5 py-1">
                    Industry Immersion
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Form Section - Collapsible */}
            <div className="form-section lg:col-span-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: isFormVisible ? 1 : 0,
                  x: isFormVisible ? 0 : 100,
                  width: isFormVisible ? "auto" : 0,
                }}
                transition={{ duration: 0.5 }}
                className={`${isFormVisible ? "block" : "hidden"}`}
              >
                <EnquiryForm
                  toggleForm={toggleForm}
                  onSuccess={handleFormSuccess}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Animated number counters */}
      <section
        ref={statsRef}
        className="py-12 bg-gradient-to-r from-blue-800 to-blue-600"
      >
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section with Image Accordion */}
      <section ref={welcomeRef} className="py-10 sm:py-16 bg-white">
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 sm:items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={welcomeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <ImageAccordion />
            </motion.div>
            <motion.div
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={welcomeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Badge className="bg-blue-100  text-blue-900 px-4 py-1.5 drop-shadow-sm">
                Established in 1969
              </Badge>
              <h2 className="text-4xl font-bold text-blue-900">
                Welcome to your Future at <br /> IMM Business School
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We&apos;re excited to introduce you to our Bachelor of Business
                Administration (BBA) program—a perfect blend of tradition and
                innovation that has been shaping future business leaders for 56
                years.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our program is designed to equip you with the skills, knowledge,
                and mindset needed to thrive in today&apos;s rapidly evolving
                business landscape. With a focus on practical learning, industry
                exposure, and cutting-edge technology, we prepare you to be the
                leaders of tomorrow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Highlights - 3-column image grid */}
      <section
        ref={highlightsRef}
        className="py-16 bg-gradient-to-r from-blue-900 to-blue-700"
      >
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <motion.div
            className="text-center max-w-7xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Program Highlights
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Choose Our BBA Program?
            </h2>
            <p className="text-white/90 text-lg">
              Our program stands out with its unique blend of traditional
              business education and modern technological integration.
            </p>
          </motion.div>

          <ProgramHighlightsGrid highlights={programHighlights} />
        </div>
      </section>

      {/* Specializations Section with Creative Cards */}
      <section id="specializations" className="py-16 relative">
        <DotPattern
          glow={true}
          className={cn(
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent, top-50 left-50 right-50 bottom-50,)]"
          )}
        />
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-16 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4 drop-shadow-md">
              Specializations
            </Badge>
            <h2 className="text-3xl font-bold text-blue-900 mb-6 drop-shadow-md">
              Specializations Offered in BBA @IMM
            </h2>
            <p className="text-gray-700 text-lg drop-shadow-sm">
              Choose from a variety of specializations designed to align with
              your career goals and industry demands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                <SpecializationCard
                  title={spec.title}
                  description={spec.description}
                  icon={spec.icon}
                  imageUrl={spec.imageUrl}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section - Bento Grid */}
      <section
        id="features"
        className="py-16 bg-gradient-to-r from-blue-900 to-blue-700"
      >
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <motion.div
            className="text-center max-w-7xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Key Features
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              What Makes Our BBA Program Special
            </h2>
            <p className="text-white/90 text-lg">
              Our program is designed with the future in mind, combining
              traditional business education with modern technological
              advancements.
            </p>
          </motion.div>

          <BentoGrid features={features} />
        </div>
      </section>

      {/* Program Details Section - Carousel */}
      <section className="py-16 bg-white">
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4 drop-shadow-sm">
              Program Details
            </Badge>
            <h2 className="text-3xl font-bold text-blue-900 mb-6 drop-shadow">
              Explore Our BBA Program
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <ProgramCarousel items={programCarouselItems} />
          </motion.div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <motion.div
            className="text-center max-w-7xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-6">
              We assure you the finest & quality business education
            </h2>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="bg-white mb-4 rounded-lg shadow-sm"
                >
                  <AccordionTrigger className="text-base sm:text-lg font-semibold text-blue-900 px-6 py-4 hover:no-underline text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-6 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section id="fees" className="py-16 relative">
        <Waves
          lineColor="#ccc"
          backgroundColor="rgba(255, 255, 255, 0.5)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.1}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />

        <div className=" mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12 z-10 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4">
              Fee Structure
            </Badge>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Investment in Your Future
            </h2>
            <p className="text-gray-700 text-lg">
              Our fee structure is designed to provide quality education at a
              competitive price.
            </p>
          </motion.div>

          <motion.div
            className="w-full max-w-4xl mx-auto space-y-6 z-10 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Card className="border-2 shadow-md rounded-lg overflow-hidden">
              <CardHeader className="bg-blue-700 border-b">
                <CardTitle className="text-center text-2xl font-bold text-white">
                  Registration Fee : ₹50,000
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-100">
                      <TableHead className="font-bold text-black border w-1/4 text-center">
                        SEMESTER
                      </TableHead>
                      <TableHead className="font-bold text-black border text-center w-1/4">
                        1<sup>st</sup> YEAR
                      </TableHead>
                      <TableHead className="font-bold text-black border text-center w-1/4">
                        2<sup>nd</sup> YEAR
                      </TableHead>
                      <TableHead className="font-bold text-black border text-center w-1/4">
                        3<sup>rd</sup> YEAR
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {semesterFees.map((semester, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold border text-center">
                          {semester.name}
                        </TableCell>
                        <TableCell className="border text-center">
                          {semester.year1}
                        </TableCell>
                        <TableCell className="border text-center">
                          {semester.year2}
                        </TableCell>
                        <TableCell className="border text-center">
                          {semester.year3}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              <CardFooter className="bg-blue-700 border-t justify-center p-4">
                <p className="text-2xl font-bold text-white">
                  Total Fee : ₹6,00,000
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container sm:max-w-5xl md:max-w-6xl lg:max-w-7xl  mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join Us Today</h2>
            <p className="mb-6 text-lg leading-relaxed">
              At IMM Business School, we believe our BBA program is more than
              just a degree—it&apos;s a journey of growth and transformation.
              Join our vibrant community and be part of an institution that has
              been pioneering business education for 56 years.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Enrol today and start your exciting journey into the world of
              business with us! <br /> We can&apos;t wait to welcome you to IMM
              Business School, where your future begins.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                className="bg-white text-blue-900 hover:bg-gray-100"
                onClick={toggleForm}
              >
                Apply Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Toast */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed z-50 bottom-4 right-4 bg-white border border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3"
        >
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>
            Application submitted successfully! We&apos;ll contact you soon.
          </span>
          <button
            onClick={() => setIsSuccess(false)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BBAProgram;
