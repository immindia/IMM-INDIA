import { Card, CardContent } from "@/components/ui/card";
import img1 from "../../assets/landing/events/1.webp";
import img2 from "../../assets/landing/events/bse.webp";
import img3 from "../../assets/landing/events/women's-day.webp";
import img4 from "../../assets/landing/events/coca-cola.webp";
import { Calendar } from "lucide-react";
import Heading from "../../components/Heading";
import Container from "../../components/wrappers/Container";
import { AnimatedList } from "@/components/ui/animated-list";
export default function LatestBlogsAndEvents() {
  let events = [
    {
      id: 1,
      title: "Industry Visit to BSE for Class of 2026",
      date: "24 March 2025",
      image: img2,
    },
    {
      id: 2,
      title: "International Women's Day Celebration",
      date: "8 March 2025",
      image: img3,
    },
    {
      id: 3,
      title: "Industry Visit to Coca Cola for Class of 2026",
      date: "5 March 2025",
      image: img4,
    },
  ];

  events = Array.from({ length: 3 }, () => events).flat();

  return (
    <section className="bg-gradient-to-bl from-gray-200 via-gray-50 to-gray-300">
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
                <img
                  src={img1}
                  alt="Main event"
                  className="object-cover w-full sm:h-full  h-[262px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 sm:p-10 sm:space-y-4 bg-gradient-to-t from-black to-transparent">
                  <span className="top-0 px-4 py-1 mx-auto text-sm font-semibold tracking-wide text-white sm:text-lg w-fit sm:mx-0 bg-primary-color ">
                    Trending
                  </span>

                  <p className="flex items-center mr-2 text-base font-semibold text-white sm:text-lg">
                    <Calendar size={20} className="mr-2 text-white" />28
                    March 2025
                  </p>
                  <p className="font-semibold text-white md:text-xl lg:text-2xl sm:font-bold ">
                    Industry Visit to Liberty for Class of 2026
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-5 relative overflow-hidden rounded h-full">
            <AnimatedList>
              {events.map((item, idx) => (
                <EventCard {...item} key={idx} />
              ))}
            </AnimatedList>
          </div>
        </div>
      </Container>
    </section>
  );
}

const EventCard = ({ id, image, title, date }) => {
  return (
    <Card key={id} className="p-0 rounded ">
      <CardContent className="flex p-0 space-x-3 sm:space-x-4 h-32 sm:h-auto">
        <img
          src={image}
          alt={title}
          className="object-cover max-h-[154px] max-w-[154px] h-full aspect-square"
        />
        <div className="flex flex-col items-start justify-center flex-grow gap-2 sm:gap-3 ml-2">
          {/* <span className="top-0 px-4 py-1  text-xs sm:text-sm font-semibold tracking-wide text-white w-fit sm:mx-0 bg-primary-color ">
            Trending
          </span> */}
          <p className="flex items-center mr-2 text-xs sm:text-lg font-semibold text-red-600">
            <Calendar size="14" className="mr-2 text-red-600 " /> {date}
          </p>
          <p className="text-sm sm:text-lg font-semibold sm:font-bold text-gray-800 ">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
