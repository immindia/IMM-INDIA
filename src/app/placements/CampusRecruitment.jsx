import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/faculty/Banner.webp";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { companyLogos } from "./companyLogoData";
const CampusRecruitment = () => {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/placements/campus-recruitment", label: "Campus Recruitment" },
    { label: "Campus Recruitment" },
  ];

  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title="Campus Recruitment"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        <Heading
          title="Final Placement Companies"
          titleClassName="text-primary-color lg:text-5xl text-center"
          subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
          subtitle="Discover the industry leaders who trust our platform for their recruitment needs."
          className="pt-12 lg:pb-10 mx-auto"
        />
      <CompanyLogos />
      </Container>
      <div className="bg-slate-50"></div>
    </div>
  );
};

export default CampusRecruitment;

// Mock data for company logos


function CompanyLogos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredLogos = companyLogos.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleLogos = showAll ? filteredLogos : filteredLogos.slice(0, 25);

  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        {/* <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
          Our Trusted Partners
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto text-center mb-12">
          Discover the industry leaders who trust our platform for their
          recruitment needs.
        </p> */}

        <div className="flex justify-center mb-20">
          <div className="relative w-full max-w-5xl">
            <Input
              type="text"
              placeholder="Find a company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg border-pink-900 focus:ring-pink -900 focus:border-pink-900 rounded-full w-full"
              aria-label="Search companies"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {visibleLogos.map((company) => (
            <motion.div
              key={company.id}
              className="col-span-1 flex justify-center items-center"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <motion.div
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="max-h-12 w-full object-contain filter grayscale mix-blend-multiply group-hover:filter-none hover:scale-90 transition-all duration-300"
                  whileHover={{ rotate: 360, scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                  
                />
                <p className="mt-2 text-sm font-light group-hover:font-normal transition-all  text-gray-700 text-center group-hover:text-pink-900 duration-300">
                  {company.name}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {filteredLogos.length > 8 && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-white text-pink-900 hover:bg-pink-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-900 transition-colors duration-300"
            >
              <span>{showAll ? "Show Less" : "View All Partners"}</span>
              {showAll ? (
                <ChevronUp className="ml-2" size={20} />
              ) : (
                <ChevronDown className="ml-2" size={20} />
              )}
            </Button>
          </div>
        )}

        {filteredLogos.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No companies found. Try a different search term.
          </p>
        )}
      </div>
    </section>
  );
}
