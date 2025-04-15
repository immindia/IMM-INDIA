import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import Gallery from "../../components/Gallery";
import galleryData from "../../data/galleryData";
// import national from "../../assets/research/reserchbanner.webp";
import international from "../../assets/research/internantionalBanner.webp";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";




const Research = () => {

  const [nationalImages, setNationalImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternationalData = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/index.php"
        );
        const data = await response.json();
        const filtered = data
          .filter((item) => item.category === "National")
          .map((item) => ({
            id: item.id,
            src: item.url,
            alt: item.title,
            title: item.title,
          }));
        setNationalImages(filtered);
      } catch (error) {
        console.error("Error fetching national data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternationalData();
  }, []);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/research", label: "Research" },
    { label: "Research" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="Research"
        imageSrc={international}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        <div className="pt-12">
          <Heading
            title="Research Conference"
            titleClassName="text-primary-color lg:text-5xl"
            subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
            subtitle="Fostering academic excellence through research conferences that bring together scholars, industry experts, and students to share groundbreaking insights and drive innovation in management education."
            className="mx-auto max-w-5xl"
          />
        </div>

        <div className="pb-12">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Gallery images={nationalImages} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Research;
