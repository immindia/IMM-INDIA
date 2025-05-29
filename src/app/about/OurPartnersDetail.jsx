"use client";

import { useEffect, useState } from "react";

import EU from "../../assets/partners/EU.png";
import IIT from "../../assets/partners/iit.png";
import JIT from "../../assets/partners/jit.webp";
import Kladio from "../../assets/partners/kladio.webp";
// import Vitti from "../../assets/partners/vitti.png";
import Wasme from "../../assets/partners/wasme.png";
import Young from "../../assets/partners/young.png";
import img from "../../assets/banner/partnerBanner.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import { useFetch } from "../../hooks/useFetch";
// import bg from "../../assets/partners/partnerBG.jpg";
import bg from "../../assets/partners/partnerBG.png";
export default function OurPartnersDetail() {
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
        (item) => item.category === "IMM Partners Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "IMM Partners"
      )?.url;

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

  const [isLoaded, setIsLoaded] = useState(true);
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/about/imm-partners", label: "About" },
    { label: "IMM Partners" },
  ];
  // All partners data
  const partners = [
    {
      id: 0,
      name: "European Global Institute of Innovation & Technology (EU Global)",
      logo: EU,
      category: "Education",
      description:
        "The European Global Institute of Innovation & Technology, also known as European Global Varsity (EU Global), is a prestigious institution based in Malta, Europe.",
      longDescription:
        "The European Global Institute of Innovation & Technology, also known as European Global Varsity (EU Global), is a prestigious institution based in Malta, Europe. EU Global specialises in study-abroad initiatives, university partnerships across the globe, and preparing students for admissions to Ivy League institutions, all while enhancing their global employability skills. Their standout offering is a Competency Lab featuring modules on entrepreneurship, research, sustainability, and professional development, accompanied by prestigious European certifications.",
    },
    {
      id: 1,
      name: "IIT Ropar",
      logo: IIT,
      category: "Education",
      description:
        "The Indian Institute of Technology Ropar (IIT Ropar) is a premier engineering institution in Punjab.",
      longDescription:
        "The Government of India has officially designated IIT Ropar as a Centre of Excellence in AI, recognizing it as one of the top four institutes leading India's AI revolution. This landmark initiative, reported by the Economic Times, cements IIT Ropar's position at the forefront of AI and innovation, and IMM students will be direct beneficiaries of this elite status. Spread over a 525-acre campus, it boasts state-of-the-art infrastructure, including advanced research centers, modern laboratories, and extensive digital resources. IIT Ropar is recognized for its interdisciplinary research in fields like renewable energy, artificial intelligence, and bio-imaging. Committed to academic excellence and innovation, the institute has achieved significant national and international recognition.",
    },
    {
      id: 2,
      name: "KLADIO",
      logo: Kladio,
      category: "Education",
      description:
        "Kladio is an innovative educational platform that emphasizes experiential and global learning.",
      longDescription:
        "Their programs, such as the Bachelor's in Entrepreneurship and Family Business Management, offer immersive experiences across multiple countries, providing students with diverse business insights and cultural exposure. Kladio's commitment to mentorship connects learners with global influencers and industry leaders, ensuring guidance from the best minds across various sectors.",
    },
    {
      id: 3,
      name: "JJF Education Pvt. Ltd.",
      logo: JIT,
      category: "Education",
      description:
        "JJF Education Private Limited operates in the education sector with a focus on disseminating knowledge.",
      longDescription:
        "The company aims to provide a common forum for various education professionals to organize training courses and special programs in both online and offline formats. JJF Education intends to collaborate with Indian and foreign entities to further its objective of educating, enabling, and empowering individuals globally.",
    },
    // {
    //   id: 4,
    //   name: "VITTI Research Foundation",
    //   logo: Vitti,
    //   category: "Research",
    //   description:
    //     "Vitti Research Foundation focuses on fundamental AI research.",
    //   longDescription:
    //     "They collaborate with academia, global foundations, industries, and government initiatives to publish papers and generate intellectual property.",
    // },
    {
      id: 5,
      name: "Young Skilled India",
      logo: Young,
      category: "Training",
      description:
        "Young Skilled India is a Government of India-certified startup.",
      longDescription:
        "The organization offers AI-driven training and certificate courses aimed at enhancing professional and management skills across various demographics. They provide productivity and leadership courses for employees, with programs in public speaking, presentation skills, and management.",
    },
    {
      id: 6,
      name: "WASME",
      logo: Wasme,
      category: "SME Development",
      description:
        "The World Association for Small and Medium Enterprises (WASME) is a global organization.",
      longDescription:
        "WASME is dedicated to promoting the growth and development of small and medium enterprises (SMEs) worldwide. They foster collaboration among governments, industry bodies, and SMEs through policy advocacy, capacity building, and knowledge sharing. Their initiatives include training programs, international conferences, and awards to recognize SME excellence.",
    },
  ];

  return (
    <div className="relative">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <section className="relative">
        <img
          src={bg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover "
        />
        <Container className="container  gap-14">
          <Heading
            title="IMM Partners"
            titleClassName="text-primary-color text-center lg:text-5xl"
            subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
            subtitle="As a leading service provider, we are committed to collaborating with industry experts to deliver exceptional solutions that drive business success."
            className="pt-12 mx-auto"
          />

          <div className="space-y-12 md:space-y-16 -mt-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`flex flex-col overflow-hidden rounded-lg bg-gray-100 drop-shadow-md shadow-lg md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative flex  w-full items-center justify-center overflow-hidden bg-white p-8 md:h-auto md:w-1/2 h-auto sm:h-96 ">
                  <motion.div
                    className="relative h-full w-full flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="object-contain rounded max-h-96 w-full"
                    />
                  </motion.div>
                </div>

                <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
                  <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                    {partner.category}
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                    {partner.name}
                  </h2>
                  <p className="mb-6 text-gray-600 line-clamp-5 hover:line-clamp-none sm:line-clamp-none text-justify">
                    {partner.longDescription || partner.description}
                  </p>
                  {/* <Link
                  href="#"
                  className="inline-flex w-fit items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  READ MORE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link> */}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
