import { useState, useEffect } from "react";
import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/banner/GalleryBanner.jpg";
import PropTypes from "prop-types";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/life-at-imm/gallery", label: "Life at IMM" },
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

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/index.php"
        );
        const data = await response.json();

        // Filter out unwanted categories
        const filteredImages = data.filter(
          (image) =>
            !["Award", "International", "National", "Uncategorized Research"].includes(
              image.category
            )
        );

        // Define the desired category order
        const desiredCategories = ["Campus", "Infrastructure", "Classroom", "Library", "Canteen", "Other"];
        
        // Get unique categories from filtered images
        const uniqueCategories = new Set(filteredImages.map((image) => image.category));
        
        // Sort categories according to desired order, keeping only existing ones
        const sortedCategories = desiredCategories.filter(category => uniqueCategories.has(category));
        
        // Add "All" at the beginning
        const finalCategories = ["All", ...sortedCategories];
        
        setCategories(finalCategories);

        // Store the filtered data
        setFilteredData(filteredImages.reverse());

        // Set gallery images with all filtered images
        setGalleryImages(filteredImages.map((image) => image.url));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Filter images when category changes
  useEffect(() => {
    if (filteredData.length > 0) {
      if (selectedCategory === "All") {
        setGalleryImages(filteredData.map((image) => image.url));
      } else {
        const categoryImages = filteredData
          .filter((image) => image.category === selectedCategory)
          .map((image) => image.url);
        setGalleryImages(categoryImages);
      }
    }
  }, [selectedCategory, filteredData]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="State-of-the Art Campus"
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
            className="mb-"
          />

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full  text-xs sm:text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-pink-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-10">Loading gallery images...</div>
        ) : galleryImages.length > 0 ? (
          <GalleryImage
            galleryImages={galleryImages}
            setSelectedImage={setSelectedImage}
          />
        ) : (
          <div className="text-center py-10">
            No gallery images found for the selected category.
          </div>
        )}
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
  // Check if we have enough images
  if (galleryImages.length < 2) {
    // If less than 2 images, show them in a simple grid
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {galleryImages.map((image, index) => (
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
    );
  }

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
      {galleryImages.length > 2 && (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {galleryImages.slice(2).map((image, index) => (
            <div
              key={index}
              className="h-[277px] overflow-hidden w-full rounded"
            >
              <img
                src={image}
                alt="Gallery image"
                className="gallery-image object-cover rounded hover:scale-110 transition-all duration-700 ease-in-out mx-auto w-full h-full cursor-pointer"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

GalleryImage.propTypes = {
  galleryImages: PropTypes.array.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
};
