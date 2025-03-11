import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import Gallery from "../../components/Gallery";
import galleryData from "../../data/galleryData";
import img from "../../assets/research/reserchbanner.webp";




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
        imageSrc={img}
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

        {/* gallery start */}
        <div className="pb-12">
          <Gallery images={galleryData} />
        </div>
        {/* gallery end */}
      </Container>
    </div>
  );
};

export default Research;
