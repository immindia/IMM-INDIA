import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
// import Gallery from "../../components/Gallery";
// import galleryData from "../../data/galleryData";
import national from "../../assets/research/reserchbanner.webp";
import international from "../../assets/research/internantionalBanner.webp";
import { Link } from "react-router-dom";




const Research = () => {
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

        <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              title: "International Conference", 
              image: international,
              path: "/faculty-and-research/international-conference"
            },
            { 
              title: "National Conference", 
              image: national,
              path: "/faculty-and-research/national-conference"  
            }
          ].map((conference, index) => (
            <Link 
              key={index} 
              to={conference.path}
              className="relative h-[300px] group cursor-pointer overflow-hidden rounded"
            >
              <img
                src={conference.image}
                alt={conference.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center"
              >
                <h3 className="text-white text-2xl md:text-4xl font-semibold text-center rounded bg-black/50 p-4 hover:bg-black/40 transition-all duration-300 sm:hover:scale-105 sm:hover:animate-bounce">
                  {conference.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Research;
