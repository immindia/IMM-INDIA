import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Heading from "../../components/Heading";
import img from "../../assets/pgdm.webp";
import VideoDialog from "@/components/VideoDialog";
import { Link } from "react-router-dom";

export default function ProgramsOffered() {
  const specializations = [
    "Marketing & Innovation Management",
    "Financial Management",
    "Human Resource Management",
    "Business Analytics & Research Management",
    "International Business Management",
    "Information Technology Management",
    "Operations Management",
    "Entrepreneurship Management",
  ];

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-gray-400 via-gray-100 to-gray-400 lg:py-20 md:py-12 sm:px-0">
      <Heading
        title="Programmes Offered with Dual Specializations"
        titleClassName="text-center text-2xl font-bold text-primary-color md:text-3xl lg:text-5xl"
      />

      <Tabs defaultValue="pgdm" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full h-12 grid-cols-2 shadow-lg">
          <TabsTrigger
            value="pgdm"
            className="text-xs sm:text-xl h-full font-bold  data-[state=active]:bg-primary-color data-[state=active]:text-white"
          >
            PGDM Programmes
          </TabsTrigger>
          <TabsTrigger
            value="bba"
            className="text-xs sm:text-xl h-full font-bold  data-[state=active]:bg-primary-color data-[state=active]:text-white"
          >
            BBA Programmes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pgdm">
          <ProgramContent
            title="PGDM"
            specializations={specializations}
            imageSrc={img}
            imageAlt="PGDM students studying"
            videoSrc="https://youtu.be/eOa-I0MSmUs?si=PgNnCNLBGcJRmer7"
            videoId="eOa-I0MSmUs"
            href="https://admissions.immindia.edu.in/"
            knowMorePath='/programs/pgdm'
            
          />
        </TabsContent>
        <TabsContent value="bba">
          <ProgramContent
            title="BBA"
            specializations={specializations.slice(0, 5)} // Assuming fewer specializations for BBA
            imageSrc={img}
            imageAlt="BBA students in classroom"
            videoSrc="https://youtu.be/eOa-I0MSmUs?si=PgNnCNLBGcJRmer7"
            videoId="eOa-I0MSmUs"
            path='/programs/bba'
            knowMorePath='/programs/bba'
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProgramContent({ title, specializations, imageSrc, imageAlt, videoSrc, videoId, path ,href,knowMorePath}) {
  return (
    <div className="grid gap-6 mt-6 md:grid-cols-2">
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:drop-shadow-xl">
        <VideoDialog  title={title} thumbnailUrl={imageSrc} videoSrc={videoSrc} videoId={videoId} className="w-full h-full"/>
        {/* <img
          src={imageSrc}
          alt={imageAlt}
          className="object-cover w-full h-full duration-300 hover:scale-125"
        /> */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-primary-color">
          <h2 className="text-xl font-bold">{title} Programmes</h2>
        </div>
      </div>

      <div className="relative p-6 text-white rounded-lg shadow-lg bg-gradient-to-bl hover:drop-shadow-xl from-blue-950 via-blue-900 to-blue-950">
        <h2 className="mb-4 text-xl font-bold">{title} Programmes</h2>
        <h3 className="mb-2 font-semibold text-p">{title}</h3>
        <ul className="mb-6 space-y-2">
          {specializations.map((spec, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-pink-800" />
              {spec}
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-4 sm:absolute sm:bottom-5 sm:right-5">
         
         {href ? (<a href={href} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            className="border-primary-color text-primary-color hover:bg-primary-color hover:text-white"
          >
            Apply Now
          </Button>
          </a>): (
            <Link to={path}>
              <Button
            variant="outline"
            className="border-primary-color text-primary-color hover:bg-primary-color hover:text-white"
          >
            Apply Now
          </Button>
            </Link>
          )
          }

          <Link to={knowMorePath}>
          <Button className="bg-primary-color hover:bg-primary-color/90">
            Know More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
