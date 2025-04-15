import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import Gallery from "../../components/Gallery";
import international from "../../assets/research/internantionalBanner.webp";
// import { Link } from "react-router-dom";

const InternationalResearch = () => {
  const [internationalImages, setInternationalImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternationalData = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/index.php"
        );
        const data = await response.json();
        const filtered = data
          .filter((item) => item.category === "International")
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
    { href: "/research", label: "Research" },
    { label: "International Research" },
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
      </Container>
    </div>
  );
};

export default InternationalResearch;
