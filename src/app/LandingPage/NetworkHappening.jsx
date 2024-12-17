import { Fragment, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import Heading from "../../components/Heading";
import club from "../../assets/network-happenings/club-imm.webp";
import corporate from "../../assets/network-happenings/corporate-connect.webp";
import corporate2 from "../../assets/network-happenings/corporate-events.webp";
import industry from "../../assets/network-happenings/industry-visit-pic.webp";
import student from "../../assets/network-happenings/student-event.webp";

const testimonialList = [
  {
    author: {
      fullName: "Industry Visit",
      picture: industry,
    },

    description:
      "Experience firsthand exposure to leading companies through IIM India's industry visits, where students gain practical insights into business operations and corporate culture.",
  },
  {
    author: {
      fullName: "Corporate Connect",
      picture: corporate,
    },

    description:
      "Engage with industry leaders and alumni through IIM India's Corporate Connect programs, fostering valuable networking opportunities and real-world business perspectives.",
  },
  {
    author: {
      fullName: "Club Immersion",
      picture: club,
    },

    description:
      "Join our vibrant student clubs at IIM India where you can develop leadership skills, network with peers, and pursue your passions through various extracurricular activities.",
  },
  {
    author: {
      fullName: "Corporate Events",
      picture: corporate2,
    },

    description:
      "Participate in IIM India's corporate events including seminars, workshops, and conferences that bring together business leaders and academia for knowledge exchange.",
  },
  {
    author: {
      fullName: "Student Event",
      picture: student,
    },

    description:
      "Be part of IIM India's dynamic student events that combine learning with fun through cultural festivals, business competitions, and leadership summits.",
  },
];

const Rating = ({ rating, showLabel, className, ...rest }) => {
  const renderStars = () => {
    return [...Array(5)].map((_, i) => {
      const index = i + 1;
      if (index <= Math.floor(rating))
        return <Star key={i} className="text-yellow-500" />;
      if (rating > i && rating < index + 1)
        return <StarHalf key={i} className="text-yellow-500" />;
      return <Star key={i} className="text-yellow-200 dark:text-opacity-20" />;
    });
  };

  return (
    <p className={cn("mb-6", className)} {...rest}>
      <span>{renderStars()}</span>
      {showLabel && <span>{rating.toFixed(1)}</span>}
    </p>
  );
};

const NavigationButton = ({ direction, onClick }) => (
  <button
    className="w-10 h-10 text-[12px] bg-transparent border border-slate-400 dark:border-slate-600 rounded-full inline-flex items-center justify-center duration-150 hover:bg-slate-400 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200"
    onClick={onClick}
  >
    {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
  </button>
);

const NetworkHappening = () => {
  const [index, setIndex] = useState(0);
  const { author, description, rating } = testimonialList[index];

  const handleControl = (type) => {
    setIndex((prevIndex) => {
      if (type === "prev") {
        return prevIndex <= 0 ? testimonialList.length - 1 : prevIndex - 1;
      } else {
        return prevIndex >= testimonialList.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleControl("next");
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="ezy__testimonial12 light relative py-14 md:py-24 bg-slate-50 dark:bg-[#0b1727] text-zinc-900 dark:text-white z-[1]">
      <div className="container px-4 mx-auto">
        <Heading
          title="Network & Happenings"
          subtitle="Discover the latest updates, events, and news from the community."
          subtitleClassName="text-center"
          titleClassName="text-center"
          className="text-center"
        />

        <div className="flex justify-center mt-6">
          <div className="w-full">
            <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-6">
              <div className="md:w-1/2 md:py-12">
                <div
                  className="object-cover h-full bg-center bg-no-repeat bg-cover rounded-xl min-h-80"
                  style={{
                    backgroundImage: `url(${author.picture})`,
                  }}
                ></div>
              </div>
              <div className="relative md:w-1/2">
                <div className="absolute -top-[10%] md:top-0 right-0 left-0 md:-left-[20%] bottom-0 bg-gray-200 dark:bg-slate-800 -z-[1] rounded-xl"></div>
                <div className="flex flex-col justify-center h-full mb-10 md:mb-0">
                  <div className="p-6 mb-6 lg:py-16">
                    <h4 className="mb-4 text-4xl font-bold">
                      {author.fullName}
                    </h4>

                    <p className="opacity-50">{description}</p>
                  </div>
                  <div className="px-6 space-x-2 lg:px-12 text-end">
                    <NavigationButton
                      direction="prev"
                      onClick={() => handleControl("prev")}
                    />
                    <NavigationButton
                      direction="next"
                      onClick={() => handleControl("next")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkHappening;
