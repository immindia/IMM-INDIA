import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";

import Container from "../../components/wrappers/Container";
import Heading from "../../components/Heading";

import { useState, useMemo, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import { useFetch } from "../../hooks/useFetch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Search, BookOpen, BookOpenCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEventData } from "../../hooks/useEventData";
import { usePagination } from "../../hooks/usePagination";
import { API_ENDPOINTS } from "@/lib/api";

const breadcrumbItems = [
  { href: "/", label: "Home" },
  {
    href: "/corporate-connect/industry-lectures-and-webinars",
    label: "Corporate Connect",
  },
  { label: "Industry Lectures & Webinars" },
];

const IndustryLecturesAndWebinars = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM Corporate Connect - Industry Lectures and Webinars");
    setDescription(
      "Discover IMM Delhi's strong corporate connect through expert-led industry lectures and webinars. Gain real-world insights, network with professionals, and stay ahead in the business world."
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
        (item) => item.category === "Industry Lectures & Webinars Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Industry Lectures & Webinars"
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

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsPerPage = 12;
  const [showSearchButton, setShowSearchButton] = useState(false);

  // Use custom hook to fetch data with the "webinar" category
  const { events, loading } = useEventData("Industry Lectures");

  // Extract unique tags from all events
  const allTags = useMemo(() => {
    const tagSet = new Set();
    if (!events) return [];

    events.forEach((event) => {
      if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [events]);

  // Handle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Filter events based on search term and selected tags
  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.tags &&
          Array.isArray(event.tags) &&
          event.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )) ||
        (event.date &&
          event.date.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTags =
        selectedTags.length === 0 ||
        (event.tags &&
          Array.isArray(event.tags) &&
          selectedTags.every((tag) => event.tags.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }, [events, searchTerm, selectedTags]);

  // Use pagination hook
  const {
    currentItems: currentEvents,
    totalPages,
    pageRange,
  } = usePagination(filteredEvents, eventsPerPage, currentPage);

  const handleImageClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= 300) {
        setShowSearchButton(true);
      } else {
        setShowSearchButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen">
      <ImgAndBreadcrumb
        title=""
        imageSrc={
          window.innerWidth < 768
            ? "/banners/industryLecturesM.webp"
            : "/banners/industryLectures.webp"
        }
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid gap-14 relative">
        <div className="col-span-1 pt-12">
          <Heading
            title="Industry Lectures & Webinars"
            subtitle="Join us for insightful lectures and webinars that keep you informed about the latest trends and developments in various industries."
            titleClassName="text-primary-color text-left lg:text-5xl text-center"
            subtitleClassName="hidden text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full font-normal text-center sm:block"
            className="lg:pb-10"
          />

          {/* Mobile Search Section */}
          <div
            className="search-section mb-10 sm:mb-24 space-y-8 sm:hidden"
            id="top"
          >
            <div className="relative w-full max-w-6xl mx-auto">
              <Input
                id="search"
                type="text"
                placeholder="Search events by title, tags or date..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="placeholder:text-gray-400 py-6 pl-12 rounded-full border-primary-color border-2"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="tags-filter flex flex-wrap gap-2 max-w-6xl mx-auto">
              {allTags.length === 0 && (
                <p className="text-gray-500">No tags found</p>
              )}
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  className={`cursor-pointer hover:-translate-y-1 transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-secondary-color text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Desktop Search Button */}
          <div
            className={`hidden sm:block fixed right-8 top-1/2 -translate-y-1/2 z-[9999] transition-opacity duration-300 ${
              showSearchButton ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full w-12 h-12 bg-primary-color hover:bg-pink-900 text-white shadow-lg"
                >
                  <Search className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[400px] sm:w-[540px]  z-[99999]"
              >
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">
                    Search Events
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="relative">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search events by title, tags or date..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="placeholder:text-gray-400 py-6 pl-12 rounded-full border-primary-color border-2"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                  <div className="tags-filter flex flex-wrap gap-2">
                    <p className="w-full text-sm font-medium mb-2">
                      Filter by Tags:
                    </p>
                    {allTags.length === 0 && (
                      <p className="text-gray-500">No tags found</p>
                    )}
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`cursor-pointer hover:-translate-y-1 transition-all ${
                          selectedTags.includes(tag)
                            ? "bg-secondary-color text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
            </div>
          ) : (
            <div className="events grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
              {currentEvents.map((event) => (
                <Card
                  key={event.id}
                  className="p-0 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg shadow rounded-lg overflow-hidden"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto aspect-square p-3 object-center object-cover scale-110 hover:scale-[1.2] hover:brightness-75 transition-all duration-300"
                  />
                  <CardContent className="p-4 mt-4 space-y-3">
                    <h3 className="text-base font-bold sm:line-clamp-1 uppercase hover:line-clamp-none">
                      {event.title}
                    </h3>
                    {/* <p className="text-gray-500 text-xs">{event.date}</p> */}
                    <div className="flex flex-wrap gap-2 ">
                      {event.tags &&
                        Array.isArray(event.tags) &&
                        event.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className={
                              selectedTags.includes(tag)
                                ? "bg-primary-color"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                    <Button
                      className="!mt-5 w-full bg-primary-color hover:bg-pink-900 text-white group"
                      onClick={() => handleImageClick(event)}
                    >
                      View More{" "}
                      <BookOpen className="w-4 h-4 ml-2 mt-1 group-hover:hidden" />{" "}
                      <BookOpenCheck className="w-4 h-4 ml-2 mt-1 group-hover:block hidden" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && currentEvents.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No events found matching your criteria.
            </div>
          )}

          {!loading && filteredEvents.length > eventsPerPage && (
            <Pagination className="">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#top"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50 text-xs sm:text-base"
                        : ""
                    }
                  />
                </PaginationItem>

                {pageRange.map((page, index) =>
                  page === "..." ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#top"
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className={`
                      ${
                        currentPage === page
                          ? "active pointer-events-none"
                          : "inActive"
                      }
                      hover:bg-gray-100 transition-colors
                    `}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#top"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50 text-xs sm:text-base"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </Container>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={true}>
        <DialogContent className="w-[95%] max-w-[600px] rounded-lg overflow-y-auto max-h-[90vh] z-[999999]">
          {selectedEvent && (
            <>
              <DialogHeader className="px-1">
                <DialogTitle className="text-xl font-bold uppercase">
                  {selectedEvent.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-2 space-y-3">
                {selectedEvent.gallery && selectedEvent.gallery.length > 0 ? (
                  <Carousel
                    className="w-full"
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent className="ml-0">
                      {selectedEvent.gallery.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-0 basis-full flex justify-center items-center"
                        >
                          <div className="w-full max-h-[60vh] flex justify-center">
                            <img
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                              className="max-w-full max-h-full object-contain rounded-md"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "60vh",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                  </Carousel>
                ) : (
                  <div className="w-full max-h-[60vh] flex justify-center">
                    <img
                      src={selectedEvent.image}
                      alt={`Event ${selectedEvent.id}`}
                      className="max-w-full max-h-full object-contain rounded-md"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}

                <div className="mt-4 max-h-[20vh] sm:max-h-[60vh] overflow-y-auto">
                  {/* <p>
                    <strong>Date:</strong> {selectedEvent.date}
                  </p> */}
                  {selectedEvent.description
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className="mb-4 text-justify text-sm text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default IndustryLecturesAndWebinars;
