import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/lifeAtIIM/eventsAndActivities/eventBanner.webp";
import { useMemo, useState, useEffect } from "react";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";
import { Calendar, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useMeta } from "@/context/MetaContext";
import { API_ENDPOINTS } from "@/lib/api";

const EventsAndActivities = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("Life at IMM - Events and Activities");
    setDescription(
      "Discover vibrant life at IMM with exciting events, workshops, cultural activities, and industry interactions that enrich student experience and foster holistic development."
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
        (item) => item.category === "Events & Activities Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Events & Activities"
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
    { href: "/life-at-imm/events-and-activities", label: "Life at IMM" },
    { label: "Events & Activities" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title={window.innerWidth < 768 ? "" : "Events & Activities"}
        imageSrc={
          window.innerWidth < 768
            ? "/banners/eventsM.webp"
            : "/banners/events.webp"
        }
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        <Heading
          title="Events & Activities"
          titleClassName="text-primary-color  lg:text-5xl"
          subtitleClassName="text-gray-500  m-0 lg:text-lg lg:font-normal lg:max-w-full lg:"
          subtitle="Dive into the exciting and diverse events and activities that unite the IMM community, highlighting our spirit of collaboration and celebration."
          className="pt-12"
        />
        <EventGallery />
      </Container>
      <div className="bg-slate-50"></div>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default EventsAndActivities;

function EventGallery() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.EVENTS}&categories=Events`
        );
        const data = await response.json();

        // Process events and extract unique years
        const processedEvents = data
          // .filter((event) => event.category === "Events")
          .map((event) => ({
            ...event,
            photoCount: event.gallery ? event.gallery.length : 0,
            href: `#${event.id}`,
          }));

        // Extract unique years from events
        const uniqueYears = [
          ...new Set(
            processedEvents.map((event) =>
              new Date(event.date).getFullYear().toString()
            )
          ),
        ].sort((a, b) => b - a);

        setEvents(processedEvents);
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0] || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events
      .filter(
        (event) =>
          new Date(event.date).getFullYear().toString() === selectedYear
      )
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const createdAtA = new Date(a.created_at);
        const createdAtB = new Date(b.created_at);

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        if (createdAtA > createdAtB) return -1;
        if (createdAtA < createdAtB) return 1;
        return 0;
      });
  }, [events, selectedYear]);

  const handleImageClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
      </div>
    );
  }

  return (
    <div className="relative sm:min-h-[calc(100vh-200px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-4 gap-y-8">
      <div className="sidebar col-span-1 sm:h-[600px] self-start md:sticky md:top-12">
        <div className="flex flex-col gap-4 border border-slate-50 bg-pink-800 hover:bg-pink-900 shadow-sm hover:shadow-md duration-150 transition-all rounded-xl p-4 h-full sticky top-0 ">
          <h3 className="text-xl font-bold mb-2 text-white border-b border-slate-200 pb-2">
            Events by Year
          </h3>

          {years.map((year) => (
            <div
              key={year}
              onClick={() => {
                setSelectedYear(year);
                setSelectedEvent(null);
              }}
              className={`w-full flex items-center gap-2 text-left text-sm cursor-pointer hover:text-primary-color hover:bg-slate-50 duration-300 transition-all rounded-md p-2 ${
                year === selectedYear
                  ? "bg-slate-50 text-primary-color font-bold"
                  : " text-white font-medium"
              }`}
            >
              <Calendar className="w-4 h-4" /> Event {year}
            </div>
          ))}
        </div>
      </div>
      <div className="events col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center  place-content-stretch gap-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="group overflow-hidden h-max  sm:h-[336px] shadow-sm hover:shadow-md duration-150 transition-all rounded-xl hover:-translate-y-2"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-video overflow-hidden ">
                <img
                  src={`${API_ENDPOINTS.API}/${event.image}`}
                  alt={event.title}
                  className="object-cover h-full w-full transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  <span>{event.photoCount} Photos</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {/* <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={event.date}>
                  {new Date(event.date).toLocaleDateString()}
                </time>
              </div> */}
              <h3 className="text-xl font-bold mb-2 line-clamp-1 hover:text-primary-color duration-300 transition-all hover:line-clamp-none">
                {event.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {event.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                asChild
                className="w-full bg-primary-color"
                onClick={() => handleImageClick(event)}
              >
                <Link href={event.href}>View Gallery</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No events found for {selectedYear}
            </p>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={true}>
        <DialogContent className="p-0 w-[95vw] sm:max-w-[60vw] max-h-[95vh] rounded-xl overflow-hidden border-none shadow-lg z-[99999] ">
          {selectedEvent && (
            <div className="relative flex flex-col h-full">
              {/* Image/Carousel Section */}
              <div className="relative w-full bg-muted">
                {selectedEvent.gallery && selectedEvent.gallery.length > 0 ? (
                  <Carousel
                    className="w-full"
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {selectedEvent.gallery.map((image, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={`${API_ENDPOINTS.API}/${image}`}
                            alt={`Event image ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                ) : (
                  <img
                    src={`${API_ENDPOINTS.API}/${selectedEvent.image}`}
                    alt={selectedEvent.title}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute z-50 top-2 right-2 rounded-full bg-white/10 backdrop-blur-sm text-black border"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 space-y-4 bg-white dark:bg-gray-950 flex-1 overflow-hidden flex flex-col">
                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time dateTime={selectedEvent.date}>
                      {new Intl.DateTimeFormat("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(selectedEvent.date))}
                    </time>
                  </div>
                </div>

                <div className="pt-3 border-t border-border max-h-[100px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                  <p className="text-muted-foreground font-sans leading-relaxed whitespace-pre-wrap break-words w-full">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
