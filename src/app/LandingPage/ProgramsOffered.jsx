/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Heading from "../../components/Heading";
// import img from "../../assets/pgdm.webp";
import img from "../../assets/landing/programs/bba.webp";
import img2 from "../../assets/programsoffered.webp";
import VideoDialog from "@/components/VideoDialog";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ProgramsOffered() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const specializations = [
    "Marketing & Innovation Management",
    "Financial Management", 
    "Human Resource Management",
    "Business Analytics & Research Management",
    "International Business Management",
    "Operations & Supply Chain Management",
    "Entrepreneurship Management",
  ];

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-gray-400 via-gray-100 to-gray-400 lg:py-20 md:py-12 sm:px-0">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Heading
            title="AICTE Approved Programs Offered @IMM"
            titleClassName="text-center text-2xl font-bold text-primary-color md:text-3xl lg:text-5xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Tabs defaultValue="pgdm" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full h-12 grid-cols-2 shadow-lg">
              <TabsTrigger
                value="pgdm"
                className="text-xs sm:text-xl h-full font-bold  data-[state=active]:bg-primary-color data-[state=active]:text-white"
              >
                PGDM Program
              </TabsTrigger>
              <TabsTrigger
                value="bba"
                className="text-xs sm:text-xl h-full font-bold  data-[state=active]:bg-primary-color data-[state=active]:text-white"
              >
                BBA Program
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pgdm">
              <ProgramContent
                title="PGDM Program with Dual Specializations"
                specializations={specializations}
                imageSrc={img2}
                imageAlt="PGDM students studying"
                videoSrc="https://youtu.be/eOa-I0MSmUs?si=PgNnCNLBGcJRmer7"
                videoId="eOa-I0MSmUs"
                href="https://admissions.immindia.edu.in/"
                knowMorePath="/programs/pgdm"
              />
            </TabsContent>
            <TabsContent value="bba">
              <ProgramContent
                title="Bachelor of Business Administration"
                specializations={specializations.slice(0, 6)}
                imageSrc={img}
                imageAlt="BBA students in classroom"
                videoSrc="https://youtu.be/eOa-I0MSmUs?si=PgNnCNLBGcJRmer7"
                videoId="eOa-I0MSmUs"
                path="/programs/bba"
                knowMorePath="/programs/bba"
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProgramContent({
  title,
  specializations,
  imageSrc,
  videoSrc,
  videoId,
  path,
  href,
  knowMorePath,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1, ease: "easeOut", delay: 1 }}
      className="grid gap-6 mt-6 md:grid-cols-2"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative overflow-hidden rounded-lg shadow-lg hover:drop-shadow-xl"
      >
        <VideoDialog
          title={title}
          thumbnailUrl={imageSrc}
          videoSrc={videoSrc}
          videoId={videoId}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 100 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative p-6 text-white rounded-lg shadow-lg bg-gradient-to-bl hover:drop-shadow-xl from-blue-950 via-blue-900 to-blue-950"
      >
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        {/* <h3 className="mb-2 font-semibold text-p">{title}</h3> */}
        <ul className="mb-6 space-y-2">
          {specializations.map((spec, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 2.5 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-pink-800" />
              {spec}
            </motion.li>
          ))}
        </ul>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="flex justify-end gap-4 sm:absolute sm:bottom-5 sm:right-5"
        >
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-primary-color text-primary-color hover:bg-primary-color hover:text-white"
              >
                Apply Now
              </Button>
            </a>
          ) : (
            <Link to={path}>
              <Button
                variant="outline"
                className="border-primary-color text-primary-color hover:bg-primary-color hover:text-white"
              >
                Apply Now
              </Button>
            </Link>
          )}

          <Link to={knowMorePath}>
            <Button className="bg-primary-color hover:bg-primary-color/90">
              Know More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
