import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/banner/GalleryBanner.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { label: "Gallery" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 450) {
        window.scrollTo(0, 600);
      }
    };

    const timeoutId = setTimeout(handleScroll, 2000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const galleryImages = [
    "https://pagedone.io/asset/uploads/1713942989.png",
    "https://pagedone.io/asset/uploads/1713943004.png",
    "https://pagedone.io/asset/uploads/1713943024.png",
    "https://pagedone.io/asset/uploads/1713943039.png",
    "https://pagedone.io/asset/uploads/1713943054.png",
  ];

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="Gallery"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container">
        <div className="col-span-1 pt-12 md:col-span-3">
          <Heading
            title="Our Gallery"
            titleClassName="text-4xl font-bold text-center text-gray-900"
            subtitleClassName="text-gray-600 text-lg text-center leading-8"
            subtitle="Explore our vibrant campus life through these moments."
            className="mb-10"
          />
        </div>

        {/* Gallery Grid */}
        <GalleryImage
          galleryImages={galleryImages}
          setSelectedImage={setSelectedImage}
        />
      </Container>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <span
            className="absolute top-5 right-8 text-white text-5xl cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </span>
          <img
            src={selectedImage}
            alt=""
            className="max-w-[90%] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;

const GalleryImage = ({ galleryImages, setSelectedImage }) => {
  return (
    <div className="flex flex-col mb-10">
      <div className="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
        <div className="md:col-span-4 md:h-[404px] h-[277px] overflow-hidden w-full rounded">
          <img
            src={galleryImages[0]}
            alt="Gallery image"
            className="gallery-image object-cover rounded hover:scale-110 transition-all duration-700 ease-in-out mx-auto w-full h-full cursor-pointer"
            onClick={() => setSelectedImage(galleryImages[0])}
          />
        </div>
        <div className="md:col-span-8 md:h-[404px] h-[277px] overflow-hidden w-full rounded">
          <img
            src={galleryImages[1]}
            alt="Gallery image"
            className="gallery-image object-cover rounded hover:scale-110 transition-all duration-700 ease-in-out mx-auto w-full h-full cursor-pointer"
            onClick={() => setSelectedImage(galleryImages[1])}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        {galleryImages.slice(2).map((image, index) => (
          <div key={index} className="h-[277px] overflow-hidden w-full rounded">
            <img
              src={image}
              alt="Gallery image"
              className="gallery-image object-cover rounded hover:scale-110 transition-all duration-700 ease-in-out mx-auto w-full h-full cursor-pointer"
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
