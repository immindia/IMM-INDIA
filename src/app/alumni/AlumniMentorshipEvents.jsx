import { useState } from "react";
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
import { BookOpen, BookOpenCheck } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useEventData } from "../../hooks/useEventData";
import { usePagination } from "../../hooks/usePagination";

const AlumniMentorshipEvents = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;

  const { events = [] } = useEventData("Alumni Mentorship Program");

  const {
    currentItems: currentEvents,
    totalPages,
    pageRange,
  } = usePagination(events, eventsPerPage, currentPage);

  const handleImageClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  return (
    <section className="relative container sm:max-w-6xl md:max-w-6xl lg:max-w-7xl xl:max-w-7xl mx-auto pt-6 px-4 sm:pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
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
              <div className="flex flex-wrap gap-2 ">
                {Array.isArray(event.tags) &&
                  event.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
              <Button
                className="!mt-5 w-full bg-primary-color hover:bg-pink-900 text-white group"
                onClick={() => handleImageClick(event)}
              >
                View More
                <BookOpen className="w-4 h-4 ml-2 mt-1 group-hover:hidden" />
                <BookOpenCheck className="w-4 h-4 ml-2 mt-1 group-hover:block hidden" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length > eventsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                    href="#"
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className={
                      currentPage === page
                        ? "active pointer-events-none"
                        : "inActive"
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
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

export default AlumniMentorshipEvents;
