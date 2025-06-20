import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
// import Gallery from "../../components/Gallery";
// import galleryData from "../../data/galleryData";
import national from "../../assets/research/reserchbanner.webp";
import international from "../../assets/research/internantionalBanner.webp";
import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_ENDPOINTS } from "@/lib/api";

const Research = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM Faculty and Research - Research");
    setDescription(
      "Explore the expert faculty and cutting-edge research initiatives at IMM. Discover how the Institute of Marketing and Management fosters innovation and academic excellence through impactful research."
    );
  }, [setTitle, setDescription]);

  const { data } = useFetch("/api/indexBanner.php");
  const [bannerImage, setBannerImage] = useState(
    `${API_ENDPOINTS.UPLOADS}/680fd14484b0a.png`
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
        (item) => item.category === "Research Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Research"
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
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/faculty-and-research/research", label: "Faculty & Research" },
    { label: "IMMRC" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
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

        <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "IMMRC - 2025",
              description:
                "Emerging Trends & Technological Advancements Towards Innovation & Sustainability for Societal & Business Progress",
              image: international,
              path: "/faculty-and-research/international-conference",
            },
            {
              title: "IMMRC - 2024",
              description: "Evolving World of Business",
              image: national,
              path: "/faculty-and-research/national-conference",
            },
          ].map((conference, index) => (
            <Link
              key={index}
              to={conference.path}
              className="relative   border-2 border-pink-900/50 group cursor-pointer overflow-hidden rounded shadow"
            >
              <div className="rounded  h-full">
                <img
                  src={conference.image}
                  alt={conference.title}
                  className=" inset-0 w-full h-80 object-cover"
                />
                <div className=" inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300 " />

                <div className="text-white/90 text-2xl mb-5 md:text-3xl font-bold text-center p-4 hover:bg-pink-950 transition-all duration-300 h-full  rounded-b bg-pink-800">
                  {conference.title}
                  <p className="mt-4 italic bg-white p-6 text-lg font-normal text-blue-500/90">
                    &quot;{conference.description}&quot;
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Research;
