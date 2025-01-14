import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/faculty/Banner.webp";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

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
          title="Our Trusted Partners"
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
const companyLogos = [
  {
    id: 1,
    name: "PayU",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "upGrad",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Grofers",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "HDB Financial Services",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Genpact",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "HomeFirst",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Entab",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Naukri.com",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "JK Group",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 10,
    name: "S&P Global",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 11,
    name: "Puma",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 12,
    name: "Regalo Kitchens",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 13,
    name: "Jaro Education",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 14,
    name: "Shineroad",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 15,
    name: "Capgemini",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 16,
    name: "India Infrastructure",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 17,
    name: "DHL",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 18,
    name: "FinEdge",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 19,
    name: "PhonePe",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 20,
    name: "Ameriprise Financial",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 21,
    name: "VI",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 22,
    name: "IDFC First Bank",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 23,
    name: "Ather",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 24,
    name: "Intellipaat",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 25,
    name: "ICICI Bank",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 26,
    name: "TRB Group",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 27,
    name: "Blackstone",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 28,
    name: "JK Cement",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 29,
    name: "Chegg",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 30,
    name: "Solarman",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 31,
    name: "Vouchagram",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 32,
    name: "Anand Rathi",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 33,
    name: "RGF Professional Recruitment",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 34,
    name: "Archer & Bull",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 35,
    name: "Kotak Life",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 36,
    name: "Ceasefire",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 37,
    name: "Kirana Bazaar",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 38,
    name: "Sendinblue",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 39,
    name: "Hike Education",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 40,
    name: "EduKyu",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 41,
    name: "Rungta Irrigation Limited",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 42,
    name: "MarketsandMarkets",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 43,
    name: "PlanetSpark",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 44,
    name: "Digital Jalebi",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 45,
    name: "Acuité Ratings & Research",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 46,
    name: "AllCargo",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 47,
    name: "N-Squared eCommerce",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 48,
    name: "GirnarSoft",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 49,
    name: "To The New",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 50,
    name: "IDP",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 51,
    name: "Coffee Mug",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 52,
    name: "Antle Information Technologies",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 53,
    name: "Maison D’Auraine",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 54,
    name: "Pinnacle",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 55,
    name: "Corner Office Advisors",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
  {
    id: 56,
    name: "Jumbo Group",
    logo: "https://v0.dev/placeholder.svg?height=100&width=100",
  },
];

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
                  className="max-h-12 w-full object-contain filter grayscale group-hover:filter-none transition-all duration-300"
                  whileHover={{ rotate: 360 }}
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
