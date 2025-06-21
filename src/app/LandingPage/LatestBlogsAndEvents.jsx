import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Heading from "../../components/Heading";
import Container from "../../components/wrappers/Container";
import { AnimatedList } from "@/components/ui/animated-list";
import { memo, useEffect, useState } from "react";
import LazySection from "@/components/LazySection";
import { Skeleton } from "@/components/ui/skeleton";
import { API_ENDPOINTS } from "@/lib/api";

import img1 from "../../assets/landing/events/1.webp";
import img2 from "../../assets/landing/events/bse.webp";
import img3 from "../../assets/landing/events/women's-day.webp";
import img4 from "../../assets/landing/events/coca-cola.webp";

const placeholderEvents = {
  mainEvent: {
    id: "main-placeholder",
    title: "Industry Visit to Liberty for Class of 2026",
    date: "2025-03-28",
    image: img1,
  },
  otherEvents: [
    {
      id: "p1",
      title: "Industry Visit to BSE for Class of 2026",
      date: "2025-03-24",
      image: img2,
    },
    {
      id: "p2",
      title: "International Women's Day Celebration",
      date: "2025-03-08",
      image: img3,
    },
    {
      id: "p3",
      title: "Industry Visit to Coca Cola for Class of 2026",
      date: "2025-03-05",
      image: img4,
    },
  ],
};

const LatestBlogsAndEventsContent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams({
          resource: "events",
          categories: "Events",
          count: "5",
        });
        const response = await fetch(
          `${API_ENDPOINTS.API}/index2.php?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        const processedEvents = data
          .map((event) => ({
            ...event,
            id: event.id || Math.random().toString(36).substr(2, 9),
            photoCount: event.gallery ? event.gallery.length : 0,
            image: event.image.startsWith("http")
              ? event.image
              : `${API_ENDPOINTS.API}/${event.image}`,
            gallery: event.gallery
              ? event.gallery.map((img) =>
                  img.startsWith("http") ? img : `${API_ENDPOINTS.API}/${img}`
                )
              : [],
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setEvents(processedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const mainEvent = loading ? placeholderEvents.mainEvent : events[0];
  const otherEvents = loading
    ? Array.from({ length: 3 }, () => placeholderEvents.otherEvents).flat()
    : events.slice(1);

  if (error) {
    return (
      <Container>
        <div className="text-center py-10">
          <p className="text-red-500">Failed to load events data.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="">
      <Heading
        title="Upcoming Events"
        titleClassName="lg:font-extrabold font-bold text-primary-color"
        subtitle="Stay updated with the latest events, news, and insights from IMM India. Discover thought leadership, industry updates, student success stories at our institution."
        subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal  text-center mx-auto"
        className="w-full text-center sm:col-span-4 "
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2  h-[720px] sm:max-h-[500px]">
        <Card className="relative rounded overflow-hidden sm:h-full  h-[262px]">
          <CardContent className="p-0 rounded sm:h-full  h-[262px]">
            <div className="h-full ">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <img
                  src={mainEvent?.image}
                  alt={mainEvent?.title}
                  className="object-cover w-full sm:h-full  h-[262px]"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 sm:p-10 sm:space-y-4 bg-gradient-to-t from-black to-transparent">
                <span className="top-0 px-4 py-1 mx-auto text-sm font-semibold tracking-wide text-white sm:text-lg w-fit sm:mx-0 bg-primary-color ">
                  Trending
                </span>

                <p className="flex items-center mr-2 text-base font-semibold text-white sm:text-lg">
                  <Calendar size={20} className="mr-2 text-white" />
                  {new Date(mainEvent?.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="font-semibold text-white md:text-xl lg:text-2xl sm:font-bold ">
                  {mainEvent?.title}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 gap-5 relative overflow-hidden rounded h-full">
          <AnimatedList>
            {otherEvents.map((item, idx) => (
              <EventCard {...item} key={item.id || idx} isLoading={loading} />
            ))}
          </AnimatedList>
        </div>
      </div>
    </Container>
  );
};

export default function LatestBlogsAndEvents() {
  return (
    <LazySection
      as="section"
      className="bg-gradient-to-bl from-gray-200 via-gray-50 to-gray-300"
    >
      <LatestBlogsAndEventsContent />
    </LazySection>
  );
}

const EventCard = ({ id, image, title, date, isLoading }) => {
  return (
    <Card key={id} className="p-0 rounded ">
      <CardContent className="flex p-0 space-x-3 sm:space-x-4 h-32 sm:h-auto">
        {isLoading ? (
          <Skeleton className="object-cover max-h-[154px] max-w-[154px] h-full aspect-square" />
        ) : (
          <img
            src={image}
            alt={title}
            className="object-cover max-h-[154px] max-w-[154px] h-full aspect-square"
          />
        )}
        <div className="flex flex-col items-start justify-center flex-grow gap-2 sm:gap-3 ml-2">
          <p className="flex items-center mr-2 text-xs sm:text-lg font-semibold text-red-600">
            <Calendar size="14" className="mr-2 text-red-600 " />{" "}
            {new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-sm sm:text-lg font-semibold sm:font-bold text-gray-800 ">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
