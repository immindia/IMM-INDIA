import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Search } from "lucide-react";

const Gallery = ({ images = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filter images based on search term
    const filtered = images.filter((image) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        image.title?.toLowerCase().includes(searchLower) ||
        image.year?.toString().includes(searchTerm)
      );
    });
    setFilteredImages(filtered);
    console.log(images);
  }, [searchTerm, images]);

  useEffect(() => {
    // Simulate loading state
    if (images.length > 0) {
      setIsLoading(false);
    }
  }, [images]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  // Fallback UI when no images are available or during loading
  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="rounded-lg overflow-hidden">
              <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <h3 className="text-xl font-medium text-gray-700">
          No images available
        </h3>
        <p className="text-gray-500 mt-2">
          Check back later for updates to our gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-">
      {/* Search bar */}
      {/* <div className="flex justify-center mb-20">
        <div className="relative w-full max-w-5xl">
          <Input
            type="text"
            placeholder="Search by title or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-6 text-lg border-pink-900 focus:ring-pink -900 focus:border-pink-900 rounded-full w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div> */}

      {/* Gallery grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=Image+Not+Found";
                  }}
                />
              </div>
              {/* <div className="p-4">
                <h3 className="font-medium text-primary-color/80 text-lg text-center">{image.title}</h3>
                <p className="text-muted-foreground  text-center">{image.year}</p>
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-xl font-medium text-gray-700">
            No results found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search criteria.
          </p>
        </div>
      )}

      {/* Full-screen image dialog */}
      <Dialog open={!!selectedImage} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-6xl w-[90vw] h-[90vh] p-0 bg-transparent border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>

            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="relative max-h-[80vh] max-w-full overflow-hidden rounded-lg">
                <img
                  src={selectedImage?.src}
                  alt={selectedImage?.title}
                  className="max-h-[80vh] max-w-full object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=Image+Not+Found";
                  }}
                />
              </div>
              {/* <div className="mt-4 text-center text-white">
                <h2 className="text-xl font-medium">{selectedImage?.title}</h2>
                <p className="text-gray-300">{selectedImage?.year}</p>
              </div> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
