import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/faculty/Banner.webp";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

function CompanyLogos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexRecruiter.php"
        );
        const data = await response.json();
        setRecruiters(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recruiters:", error);
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  // Process recruiters data to match our component structure
  const recruitersData = recruiters.map((recruiter) => ({
    id: recruiter.id,
    name: recruiter.title,
    logo: recruiter.url,
    category:
      recruiter.category === "Final Placement Recruiter"
        ? "final"
        : "internship",
  }));

  // Filter logos based on search term
  const filteredBySearch = recruitersData.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get companies by category for each tab
  const finalPlacements = filteredBySearch.filter(
    (company) => company.category === "final"
  );
  const internshipPlacements = filteredBySearch.filter(
    (company) => company.category === "internship"
  );

  // Function to get visible logos based on active tab
  const getVisibleLogos = (companies) => {
    return showAll ? companies : companies.slice(0, window.innerWidth < 768 ? 24 : 25);
  };

  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-6xl">
            <Input
              type="text"
              placeholder="Find a company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg border-pink-900 focus:ring-pink-900 focus:border-pink-900 rounded-full w-full"
              aria-label="Search companies"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 my-10">
            Loading recruiters...
          </p>
        ) : (
          <Tabs defaultValue="final" className="max-w-6xl mx-auto mb-10">
            <TabsList className="grid sm:w-full sm:grid-cols-2 h-max gap-2 sm:h-14 w-fit mx-auto bg-slate-100">
              <TabsTrigger
                value="final"
                className="text-base  data-[state=active]:bg-pink-900 data-[state=active]:text-white sm:font-bold"
              >
                Final Placement Companies
              </TabsTrigger>
              <TabsTrigger
                value="internship"
                className="text-base data-[state=active]:bg-pink-900 data-[state=active]:text-white sm:font-bold"
              >
                Summer Internship Companies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="final" className="mt-8">
              <FinalPlacementCompanies
                finalPlacements={finalPlacements}
                getVisibleLogos={getVisibleLogos}
                showAll={showAll}
                setShowAll={setShowAll}
              />
            </TabsContent>

            <TabsContent value="internship" className="mt-8">
              <InternshipPlacementCompanies
                internshipPlacements={internshipPlacements}
                getVisibleLogos={getVisibleLogos}
                showAll={showAll}
                setShowAll={setShowAll}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
}

const FinalPlacementCompanies = ({
  finalPlacements,
  getVisibleLogos,
  showAll,
  setShowAll,
}) => {
  return (
    <>
      <motion.div
        className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5"
        initial="hidden"
        animate="visible"
        key="final-tab"
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
        {getVisibleLogos(finalPlacements).map((company) => (
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
                className="max-h-12 w-full object-contain filter sm:grayscale mix-blend-multiply group-hover:filter-none hover:scale-90 transition-all duration-300"
                whileHover={{ rotate: 360, scale: 1.5 }}
                transition={{ duration: 0.5 }}
              />
              <p className="mt-2 text-sm font-light group-hover:font-normal transition-all text-gray-700 text-center group-hover:text-pink-900 duration-300">
                {company.name}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {finalPlacements.length > 8 && (
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

      {finalPlacements.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No companies found. Try a different search term.
        </p>
      )}
    </>
  );
};

const InternshipPlacementCompanies = ({
  internshipPlacements,
  getVisibleLogos,
  showAll,
  setShowAll,
}) => {
  return (
    <>
      <motion.div
                className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5"
                initial="hidden"
                animate="visible"
                key="internship-tab"
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
                {getVisibleLogos(internshipPlacements).map((company) => (
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
                        className="max-h-12 w-full object-contain filter sm:grayscale mix-blend-multiply group-hover:filter-none hover:scale-90 transition-all duration-300"
                        whileHover={{ rotate: 360, scale: 1.5 }}
                        transition={{ duration: 0.5 }}
                      />
                      <p className="mt-2 text-sm font-light group-hover:font-normal transition-all text-gray-700 text-center group-hover:text-pink-900 duration-300">
                        {company.name}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {internshipPlacements.length > 8 && (
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

              {internshipPlacements.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                  No companies found. Try a different search term.
                </p>
              )}
    </>
  );
};
