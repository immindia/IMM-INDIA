import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/about/AboutBanner.webp";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";

import { Calendar, ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { useState } from "react";

const EventsAndActivities = () => {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/life-at-iim/events-and-activities", label: "Life at IIM" },
    { label: "Events & Activities" },
  ];
  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="Events & Activities"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        {/* <Heading
          title="IMM Legacy & Vision"
          titleClassName="text-primary-color text-left lg:text-5xl"
          subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full lg:"
          subtitle=" "
          className="pt-12"
        /> */}
        <EventGallery />
      </Container>
      <div className="bg-slate-50"></div>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default EventsAndActivities;

const years = ["2024", "2023", "2022", "2021", "2020"];

const events = {
  2024: [
    {
      id: "yoga-day",
      title: "International Yoga Day!",
      description: "IMM's Vibrant Celebration of International Yoga Day!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "June 21, 2024",
      photoCount: 10,
      href: "#",
    },
    {
      id: "ciao-2024",
      title: "CIAO 2024",
      description: "Saying CIAO to the unforgettable journey of Batch 2022-24!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "May 4, 2024",
      photoCount: 15,
      href: "#",
    },
    {
      id: "holi-fiesta",
      title: "HOLI FIESTA @IMM CAMPUS",
      description:
        "Vibrant splashes of joy! Staff and Students at IMM Business School come together to celebrate the festival of colors.",
      imageUrl: "http://v0.dev/placeholder.svg",
      date: "March 25, 2024",
      photoCount: 17,
      href: "#",
    },
    {
      id: "yoga-day",
      title: "International Yoga Day!",
      description: "IMM's Vibrant Celebration of International Yoga Day!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "June 21, 2024",
      photoCount: 10,
      href: "#",
    },
    {
      id: "ciao-2024",
      title: "CIAO 2024",
      description: "Saying CIAO to the unforgettable journey of Batch 2022-24!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "May 4, 2024",
      photoCount: 15,
      href: "#",
    },
    {
      id: "holi-fiesta",
      title: "HOLI FIESTA @IMM CAMPUS",
      description:
        "Vibrant splashes of joy! Staff and Students at IMM Business School come together to celebrate the festival of colors.",
      imageUrl: "http://v0.dev/placeholder.svg",
      date: "March 25, 2024",
      photoCount: 17,
      href: "#",
    },
    {
      id: "yoga-day",
      title: "International Yoga Day!",
      description: "IMM's Vibrant Celebration of International Yoga Day!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "June 21, 2024",
      photoCount: 10,
      href: "#",
    },
    {
      id: "ciao-2024",
      title: "CIAO 2024",
      description: "Saying CIAO to the unforgettable journey of Batch 2022-24!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "May 4, 2024",
      photoCount: 15,
      href: "#",
    },
    {
      id: "holi-fiesta",
      title: "HOLI FIESTA @IMM CAMPUS",
      description:
        "Vibrant splashes of joy! Staff and Students at IMM Business School come together to celebrate the festival of colors.",
      imageUrl: "http://v0.dev/placeholder.svg",
      date: "March 25, 2024",
      photoCount: 17,
      href: "#",
    },
    {
      id: "yoga-day",
      title: "International Yoga Day!",
      description: "IMM's Vibrant Celebration of International Yoga Day!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "June 21, 2024",
      photoCount: 10,
      href: "#",
    },
    {
      id: "ciao-2024",
      title: "CIAO 2024",
      description: "Saying CIAO to the unforgettable journey of Batch 2022-24!",
      imageUrl: "https://v0.dev/placeholder.svg",
      date: "May 4, 2024",
      photoCount: 15,
      href: "#",
    },
    {
      id: "holi-fiesta",
      title: "HOLI FIESTA @IMM CAMPUS",
      description:
        "Vibrant splashes of joy! Staff and Students at IMM Business School come together to celebrate the festival of colors.",
      imageUrl: "http://v0.dev/placeholder.svg",
      date: "March 25, 2024",
      photoCount: 17,
      href: "#",
    },
  ],
  2023: [],
  2022: [],
  2021: [],
  2020: [],
};
function EventGallery() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedEvent, setSelectedEvent] = useState(0);

  return (
    <div className="relative sm:min-h-[calc(100vh-200px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-4 mt-12 gap-y-8">
      <div className="col-span-1 sm:h-[600px]">
        <div className="flex flex-col gap-4 border border-slate-50 bg-pink-800 hover:bg-pink-900 shadow-sm hover:shadow-md duration-150 transition-all rounded-xl p-4 h-full sticky top-0 ">
          <h3 className="text-xl font-bold mb-2 text-white border-b border-slate-200 pb-2">
            Events by Year
          </h3>

          {years.map((year, index) => (
            <div
              key={year}
              onClick={() => {
                setSelectedYear(year);
                setSelectedEvent(index);
              }}
              className={`w-full flex items-center gap-2 text-left text-sm cursor-pointer hover:text-primary-color hover:bg-slate-50 duration-300 transition-all rounded-md p-2 ${
                index === selectedEvent
                  ? "bg-slate-50 text-primary-color font-bold"
                  : " text-white font-medium"
              }`}
            >
             <Calendar className="w-4 h-4" /> Event {year}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events[selectedYear].map((event) => (
          <Card key={event.id} className="group overflow-hidden h-min">
            <CardHeader className="p-0">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={event.imageUrl}
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={event.date}>{event.date}</time>
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {event.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {event.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full bg-primary-color">
                <Link href={event.href}>View Gallery</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {events[selectedYear].length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No events found for {selectedYear}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// {events[selectedYear].map((event) => (
//   <Card key={event.id} className="group overflow-hidden">
//     <CardHeader className="p-0">
//       <div className="relative aspect-[16/9] overflow-hidden">
//         <img
//           src={event.imageUrl}
//           alt={event.title}

//           className="object-cover h-full w-full transition-transform group-hover:scale-105"
//         />
//         <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
//           <ImageIcon className="w-4 h-4" />
//           <span>{event.photoCount} Photos</span>
//         </div>
//       </div>
//     </CardHeader>
//     <CardContent className="p-4">
//       <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
//         <Calendar className="w-4 h-4" />
//         <time dateTime={event.date}>{event.date}</time>
//       </div>
//       <h3 className="text-xl font-bold mb-2 line-clamp-2">
//         {event.title}
//       </h3>
//       <p className="text-muted-foreground line-clamp-2 text-sm">
//         {event.description}
//       </p>
//     </CardContent>
//     <CardFooter className="p-4 pt-0">
//       <Button asChild className="w-full bg-primary-color">
//         <Link href={event.href}>
//           View Gallery
//         </Link>
//       </Button>
//     </CardFooter>
//   </Card>
// ))}
// {events[selectedYear].length === 0 && (
//   <div className="col-span-full text-center py-12">
//     <p className="text-muted-foreground">No events found for {selectedYear}</p>
//   </div>
// )}
