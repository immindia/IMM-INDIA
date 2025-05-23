import React from "react";
import bg from "../../assets/IMMLEGACYBG.jpg";
import Heading from "../../components/Heading";
import WordPullUp from "../../components/ui/word-pull-up";
import NumberTicker from "../../components/ui/number-ticker";
import { Building2, Building, BarChart } from "lucide-react";

const PlacementStats = () => {
  const stats = [
    {
      data: "21",
      title: "International Package",
      icon: (
        <Building2 className="w-12 h-12 text-yellow-500 mb-2 group-hover:text-white" />
      ),
    },
    {
      data: "19.35",
      title: "Domestic Package",
      icon: (
        <Building className="w-12 h-12 text-yellow-500 mb-2 group-hover:text-white" />
      ),
    },
    {
      data: "9.95",
      title: "Average Package",
      icon: (
        <BarChart className="w-12 h-12 text-yellow-500 mb-2 group-hover:text-white" />
      ),
    },
  ];

  return (
    <section className=" relative px-0 pb-12 pt-16  lg:py-20 md:py-12 sm:px-0">
      <img
        src={bg}
        alt="stats"
        className="absolute top-0 left-0 object-cover w-full h-full -z-10 "
      />
      <div className="absolute inset-0 z-20 bg-black opacity-20" />
      <div className="relative z-30 max-w-screen-xl px-4 mx-auto md:px-8">
        <Heading
          title={"Placement\u00A0\u00A0Metrics"}
          subtitle=""
          titleClassName="text-4xl md:text-6xl font-bold text-yellow-400"
          subtitleClassName="text-gray-300 text-base md:text-lg"
        />

        {/* Example of Heading without subtitle */}

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-5 md:divide-yellow-500">
          {stats.map((item, index) => (
            <div
              key={index}
              className={
                "flex flex-col hover:bg-yellow-500 group rounded-xl  items-center p-4 border border-yellow-500 transition-all duration-300 group-hover:border-white hover:ring-2 hover:-translate-y-2  hover:ring-yellow-500" +
                (index === stats.length - 1
                  ? " col-span-2 sm:col-span-1"
                  : "  ")
              }
            >
              {item.icon}
              <div className="text-5xl font-bold text-white font sm:text-6xl">
                <NumberTicker
                  value={item.data}
                  
                  className="text-4xl font-bold text-yellow-500 group-hover:text-white font sm:text-6xl"
                  decimalPlaces={item.data === "21" ? 0 : 2}
                />{" "}
                <span className="-ml-3 text-4xl font-bold group-hover:text-white text-yellow-500 font sm:text-6xl">
                  L
                </span>
              </div>
              <div className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white sm:text-xl text-center max-w-32 sm:max-w-none">
                {item.title}
                {}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementStats;
