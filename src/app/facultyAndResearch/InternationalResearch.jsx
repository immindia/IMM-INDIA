import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import Gallery from "../../components/Gallery";
import international from "../../assets/research/internantionalBanner.webp";
import { Button } from "../../components/ui/button";
import { FileIcon, DownloadIcon } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api";
// import { Link } from "react-router-dom";

const InternationalResearch = () => {
  const [internationalImages, setInternationalImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternationalData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.INTERNATIONAL_RESEARCH);
        const data = await response.json();
        const filtered = data
          // .filter((item) => item.category === "International")
          .map((item) => ({
            id: item.id,
            src: item.url,
            alt: item.title,
            title: item.title,
          }));
        setInternationalImages(filtered);
      } catch (error) {
        console.error("Error fetching international data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternationalData();
  }, []);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/faculty-and-research/research", label: "Research" },
    { label: "IMMRC - 2025" },
  ];

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="International Research"
        imageSrc={international}
        imageAlt="International Research"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid">
        <div className="pt-12">
          <Heading
            title="International Research Conference"
            titleClassName="text-primary-color lg:text-5xl"
            subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
            subtitle="Fostering academic excellence through international research conferences that bring together scholars, industry experts, and students to share groundbreaking insights and drive innovation in management education."
            className="mx-auto max-w-5xl"
          />
        </div>

        <div className="pb-12">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Gallery images={internationalImages} />
          )}
        </div>
        {/* 
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
          <Button
            asChild
            variant="default"
            className="bg-primary-color hover:bg-primary-color/90 sm:text-lg hover:scale-105 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
          >
            <a href="#" className="inline-flex items-center">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-drive--v2.png"
                alt="google-drive--v2"
                className="mr-2 group-hover:rotate-[360deg] transition-all duration-300"
              />
              IMMRC Day 1
            </a>
          </Button>

          <Button
            asChild
            variant="default"
            className="bg-primary-color hover:bg-primary-color/90 sm:text-lg hover:scale-105 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
          >
            <a href="#" className="inline-flex items-center">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-drive--v2.png"
                alt="google-drive--v2"
                className="mr-2 group-hover:rotate-[360deg] transition-all duration-300"
              />
              IMMRC Day 2
            </a>
          </Button>
        </div> */}
      </Container>
    </div>
  );
};

export default InternationalResearch;
