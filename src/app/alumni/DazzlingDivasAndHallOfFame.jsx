"use client";

import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import { Button } from "@/components/ui/button";

import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import { useFetch } from "../../hooks/useFetch";
import ProfileCard from "./ProfileCard";
import divas from "../../assets/alumni/divas.webp";
import { API_ENDPOINTS } from "@/lib/api";
const breadcrumbItems = [
  { href: "/", label: "Home" },
  { href: "/alumni/dazzling-divas-and-hall-of-fame", label: "Alumni" },
  { label: "Dazzling Divas & Hall of Fame" },
];
export default function DazzlingDivasAndHallOfFame() {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM Alumni - Hall of Fame");
    setDescription(
      "Discover the inspiring success stories of IMM alumni featured in the Hall of Fame. See how graduates of the Institute of Marketing and Management (IMM) have made their mark across industries worldwide."
    );
  }, [setTitle, setDescription]);

  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
        (item) => item.category === "Hall of Fame Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Hall of Fame"
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

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.HALL_OF_FAME);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Filter for "Hall of Fame" category only
        const hallOfFameData = data;

        // Transform data to match component format
        const transformedData = hallOfFameData.map((item) => ({
          id: item.id,
          name: item.title,
          class: item.year,
          company: item.description,
          img: item.url,
        }));

        setAlumniData(transformedData.reverse().slice(0, 12));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(alumniData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlumni = alumniData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700 mx-auto mb-4"></div>
          <p className="text-pink-700">Loading alumni data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-pink-600 hover:bg-pink-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />

      <section className="pt-12 sm:pt-20 bg-gradient-to-b relative">
        <div className="absolute inset-0 opacity-5 -z-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(gray 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
        <div className="container sm:max-w-6xl md:max-w-6xl lg:max-w-7xl xl:max-w-7xl mx-auto py-6 px-4 sm:py-8">
          <Heading
            title="IMM Dazzling Divas"
            titleClassName="text-primary-color text-center lg:text-5xl"
            subtitleClassName="text-gray-500 m-0 lg:text-lg lg:font-normal lg:max-w-full"
            subtitle="Connect with our global network of alumni"
            className=""
          />

          <div className="hover:scale-105 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg  rounded-xl">
            <img
              src={divas}
              alt="IMM DAZZLING DIVAS"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="container sm:max-w-6xl md:max-w-6xl lg:max-w-7xl xl:max-w-7xl mx-auto py-6 px-4 sm:py-8">
          <Heading
            title="IMM Alumni Hall of Fame"
            titleClassName="text-primary-color text-center lg:text-5xl"
            subtitleClassName="text-gray-500 m-0 lg:text-lg lg:font-normal lg:max-w-full"
            subtitle="Connect with our global network of alumni"
            className=""
          />

          <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16">
              {paginatedAlumni.length > 0 ? (
                paginatedAlumni.map((alumni) => (
                  <ProfileCard
                    key={alumni.id}
                    name={alumni.name}
                    position="Alumni"
                    company={alumni.company}
                    batch={alumni.class}
                    image={alumni.img}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No results found.
                </div>
              )}
            </div>

            {/* Pagination - only show when there are more than 12 cards */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-2 py-4 mt-6">
                <div className="text-xs mt-3 sm:text-sm text-muted-foreground order-2 sm:order-1">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, alumniData.length)} of{" "}
                  {alumniData.length} entries
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                      let pageNum = i + 1;

                      // Adjust page numbers for when current page is near the end
                      if (totalPages > 3 && currentPage > 2) {
                        pageNum = currentPage - 2 + i;
                        if (pageNum > totalPages) {
                          return null;
                        }
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          className={`w-8 h-8 sm:w-9 ${
                            currentPage === pageNum
                              ? "bg-pink-600 hover:bg-pink-700"
                              : "border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                          }`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    {totalPages > 3 && currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && (
                          <span className="mx-1">...</span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 sm:w-9 border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="border-pink-200 hover:bg-pink-50 hover:text-pink-700"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container sm:max-w-6xl md:max-w-6xl lg:max-w-7xl xl:max-w-7xl mx-auto py-6 px-4 sm:py-8 flex justify-center">
          <a
            href="https://alumni.immindia.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-primary-color mx-auto hover:bg-primary-color/90 sm:text-lg hover:scale-105 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group">
              {/* <Link href="/alumni/mentorship-program"> */}
              View More
              {/* </Link> */}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
