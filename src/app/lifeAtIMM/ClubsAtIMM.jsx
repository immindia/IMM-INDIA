import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/lifeAtIIM/clubs/clubBanner.webp";
import { useEffect, useMemo, useState } from "react";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";
import {
  Calendar,
  ImageIcon,
  Laptop,
  Music,
  Coins,
  Users,
  Box,
  Lightbulb,
  MessageCircle,
  Globe,
  BookOpen,
  Trophy,
} from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const ClubsAtIMM = () => {
  const { data } = useFetch("/api/indexBanner.php");
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    if (data) {
      setBanner(data.filter((item) => item.category === "Clubs at IMM"));
    }
  }, [data]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/life-at-imm/clubs-at-imm", label: "Life at IMM" },
    { label: "Clubs at IMM" },
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
        <Heading
          title="Clubs at IMM"
          titleClassName="text-primary-color  lg:text-5xl"
          subtitleClassName="text-gray-500  m-0 lg:text-lg lg:font-normal lg:max-w-full lg:"
          subtitle="Discover the vibrant clubs at IMM, where students can explore their interests, develop new skills, and connect with peers."
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

export default ClubsAtIMM;
const clubs = [
  "All Clubs",
  "IT Club",
  "Maestros Club",
  "Finance Club",
  "HR Club",
  "Operations Club",
  "E-Cell Club",
  "Soft Skills Club",
  "Global Voices Club",
  "Research Club",
  "Sports Club",
];

const clubIcons = {
  "All Clubs": Calendar,
  "IT Club": Laptop,
  "Maestros Club": Music,
  "Finance Club": Coins,
  "HR Club": Users,
  "Operations Club": Box,
  "E-Cell Club": Lightbulb,
  "Soft Skills Club": MessageCircle,
  "Global Voices Club": Globe,
  "Research Club": BookOpen,
  "Sports Club": Trophy,
};

const API_URL =
  "https://stealthlearn.in/imm-admin/api/index3.php?resource=clubs";
const BASE_IMAGE_URL = "https://stealthlearn.in/imm-admin/api/";

function EventGallery() {
  const [selectedClub, setSelectedClub] = useState("All Clubs");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clubsData, setClubsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubsData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClubsData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClubsData();
  }, []);

  const events = useMemo(() => {
    if (!clubsData.length) return { "All Clubs": [] };

    // Group events by category
    const groupedEvents = {
      "All Clubs": clubsData
        .filter((event) => event.category === "All Clubs")
        .map((event) => ({
          ...event,
          image: BASE_IMAGE_URL + event.image,
          gallery: event.gallery.map((img) => BASE_IMAGE_URL + img),
          href: "#",
          photoCount: event.gallery?.length || 0,
        })),
    };

    // Create filtered lists for each club category
    clubs.forEach((club) => {
      if (club === "All Clubs") return;

      groupedEvents[club] = clubsData
        .filter((event) => event.category === club)
        .map((event) => ({
          ...event,
          image: BASE_IMAGE_URL + event.image,
          gallery: event.gallery.map((img) => BASE_IMAGE_URL + img),
          href: "#",
          photoCount: event.gallery?.length || 0,
        }));
    });

    return groupedEvents;
  }, [clubsData]);

  const handleImageClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-10">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading events: {error}
      </div>
    );
  }

  return (
    <div className="relative sm:min-h-[calc(100vh-200px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-4  gap-y-8">
      <div className="sidebar col-span-1 sm:h-max self-start md:sticky md:top-12">
        <div className="flex flex-col gap-4 border border-slate-50 bg-pink-800 hover:bg-pink-900 shadow-sm hover:shadow-md duration-150 transition-all rounded-xl p-4 h-full sticky top-0 ">
          <h3 className="text-xl font-bold mb-2 text-white border-b border-slate-200 pb-2">
            Clubs at IMM
          </h3>

          {clubs.map((club) => {
            const Icon = clubIcons[club];
            return (
              <div
                key={club}
                onClick={() => {
                  if (club === "Research Club") {
                    navigate("/faculty-and-research/research");
                  } else {
                    setSelectedClub(club);
                    setSelectedEvent(null);
                  }
                }}
                className={`w-full flex items-center gap-2 text-left text-sm cursor-pointer hover:text-primary-color hover:bg-slate-50 duration-300 transition-all rounded-md p-2 ${
                  club === selectedClub
                    ? "bg-slate-50 text-primary-color font-bold"
                    : " text-white font-medium"
                }`}
              >
                <Icon className="w-4 h-4" /> {club}
              </div>
            );
          })}
        </div>
      </div>
      <div className="events col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events[selectedClub]?.map((event) => (
          <Card
            key={event.id}
            className="group overflow-hidden h-max shadow-sm hover:shadow-md duration-150 transition-all rounded-xl hover:-translate-y-2"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-square overflow-hidden ">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover h-full w-full transition-transform group-hover:scale-105"
                />

                {event.photoCount > 0 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    <span>{event.photoCount} Photos</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={event.date}>{event.date}</time>
              </div>
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
        {(!events[selectedClub] || events[selectedClub].length === 0) && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No events found for {selectedClub}
            </p>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={true}>
        <DialogContent className="w-[95%] max-w-[600px] rounded-lg overflow-y-auto max-h-[90vh]">
          {selectedEvent && (
            <>
              <DialogHeader className="px-1">
                <DialogTitle className="text-xl font-bold">
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
                    <CarouselContent className="flex">
                      {selectedEvent.gallery.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-full flex justify-center items-center"
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
                    .split("\n")
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
    </div>
  );
}
