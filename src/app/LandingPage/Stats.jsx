import React from "react";
import bg from "../../assets/IMMLEGACYBG.jpg";
import Heading from "../../components/Heading";
import WordPullUp from "../../components/ui/word-pull-up";
import NumberTicker from "../../components/ui/number-ticker";

const Stats = () => {
  const stats = [
    { data: "20000", title: "Alumni Base" },
    { data: "56", title: "Years of Academic Excellence" },
    { data: "31+", title: "Awards and Recognitions" },
    { data: "35", title: "International Collaboration" },
    { data: "18000", title: "Books/News Journals" },
    { data: "30", title: "Remarkable Intellectual Capital" },
  ];

  return (
    <section className=" relative px-0 py-10 lg:py-28 md:py-12 sm:px-0">
      <img
        src={bg}
        alt="stats"
        className="absolute top-0 left-0 object-cover w-full h-full -z-10 opacity-95"
      />
      <div className="absolute inset-0 z-20 bg-black opacity-20" />
      <div className="relative z-30 max-w-screen-xl px-4 mx-auto md:px-8">
      
        <Heading
          title="IMM LEGACY" 
          subtitle="Over five decades of shaping global leaders with 20,000+ successful alumni, hundreds of accolades, and partnerships worldwide."
          titleClassName="text-4xl md:text-6xl font-bold text-yellow-400"
          subtitleClassName="text-gray-300 text-base md:text-lg"
        />

        {/* Example of Heading without subtitle */}

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 divide-x-2 divide-yellow-500  md:gap-0  md:divide-yellow-500">
          {stats.slice(0, 3).map((item, index) => (
            <div key={index} className="flex flex-col items-center md:p-4">
              <div className="text-5xl font-bold text-white font sm:text-6xl">
                {/* {item.data} */}
                <NumberTicker
                  value={item.data}
                  className="text-4xl font-bold text-yellow-500 font sm:text-6xl"
                />{" "}
                
                  <span className="-ml-3 text-4xl font-bold text-yellow-500 font sm:text-6xl">
                    +
                  </span>
             
              </div>
              <div className="mt-3 text-sm font-medium text-gray-400 sm:text-xl text-center max-w-32 sm:max-w-none">
                {item.title}
                {}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 mt-8 divide-x-2 divide-yellow-500  md:gap-0  md:divide-yellow-500">
          {stats.slice(3, 6).map((item, index) => (
            <div key={index} className="flex flex-col items-center md:p-4">
              <div className="text-5xl font-bold text-white font sm:text-6xl">
                {/* {item.data} */}
                <NumberTicker
                  value={item.data}
                  className="text-4xl font-bold text-yellow-500 font sm:text-6xl"
                />{" "}
                
                  <span className="-ml-3 text-4xl font-bold text-yellow-500 font sm:text-6xl">
                    +
                  </span>
             
              </div>
              <div className="mt-3 text-sm font-medium text-gray-400 sm:text-xl text-center max-w-32 sm:max-w-none">
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

export default Stats;
