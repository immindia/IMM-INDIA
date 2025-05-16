import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
// import Gallery from "../../components/Gallery";
// import galleryData from "../../data/galleryData";
import national from "../../assets/research/reserchbanner.webp";
import international from "../../assets/research/internantionalBanner.webp";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const Research = () => {
  const { data } = useFetch("/api/indexBanner.php");
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    if (data) {
      setBanner(data.filter((item) => item.category === "Research"));
    }
  }, [data]);
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/research", label: "Faculty & Research" },
    { label: "Research" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={
          banner[0]?.url ||
          "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
        }
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
              title: "International Conference",
              description:
                "Emerging Trends & Technological Advancements Towards Innovation & Sustainability for Societal & Business Progress",
              image: international,
              path: "/faculty-and-research/international-conference",
            },
            {
              title: "National Conference",
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
