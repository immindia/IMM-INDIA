import bg from "../../assets/Building.webp";
import Heading from "../../components/Heading";
import NumberTicker from "../../components/ui/number-ticker";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { data: "20000", title: "Alumni Base" },
    { data: "56", title: "Years of Academic Excellence" },
    { data: "315+", title: "Awards and Recognitions" },
    { data: "35", title: "International Collaboration" },
    { data: "18000", title: "Books/News Journals" },
    { data: "30", title: "Remarkable Intellectual Capital" },
  ];

  return (
    <section className="relative px-0 py-10 lg:py-20 md:py-12 sm:px-0">
      <img
        src={bg}
        alt="stats"
        className="absolute top-0 left-0 object-cover w-full h-full -z-10 opacity-95"
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-primary-color via-pink-900 to-primary-color opacity-80" />
      <div className="relative z-30 max-w-screen-xl px-4 mx-auto md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heading
              title="IMM LEGACY"
              subtitle="Over five decades of shaping global leaders with 20,000+ successful alumni, hundreds of accolades, and partnerships worldwide."
              titleClassName="text-4xl md:text-6xl font-bold text-yellow-400"
              subtitleClassName="text-white text-base md:text-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden sm:grid grid-cols-2 gap-8 md:grid-cols-3 divide-x-2 divide-yellow-500 md:gap-0 md:divide-yellow-500"
          >
            {stats.slice(0, 3).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center md:p-4"
              >
                <div className="text-5xl font-bold text-white font sm:text-6xl">
                  <NumberTicker
                    value={item.data}
                    className="text-4xl font-bold text-yellow-500 font sm:text-6xl"
                  />{" "}
                  <span className="-ml-3 text-4xl font-bold text-yellow-500 font sm:text-6xl">
                    +
                  </span>
                </div>
                <div className="mt-3 text-sm font-medium text-white sm:text-xl text-center max-w-32 sm:max-w-none">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden sm:grid grid-cols-2 gap-8 md:grid-cols-3 mt-8 divide-x-2 divide-yellow-500 md:gap-0 md:divide-yellow-500"
          >
            {stats.slice(3, 6).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center md:p-4"
              >
                <div className="text-5xl font-bold text-white font sm:text-6xl">
                  <NumberTicker
                    value={item.data}
                    className="text-4xl font-bold text-yellow-500 font sm:text-6xl"
                  />{" "}
                  <span className="-ml-3 text-4xl font-bold text-yellow-500 font sm:text-6xl">
                    +
                  </span>
                </div>
                <div className="mt-3 text-sm font-medium text-white sm:text-xl text-center max-w-32 sm:max-w-none">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="sm:hidden grid grid-cols-2 gap-2 md:grid-cols-3 mt-0 sm:mt-8 sm:divide-x-2 divide-yellow-500 md:gap-0 md:divide-yellow-500"
          >
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  x: isInView ? 0 : index % 2 === 0 ? -50 : 50,
                }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center md:p-4"
              >
                <div className="text-5xl font-bold text-white font sm:text-6xl">
                  <NumberTicker
                    value={item.data}
                    className="text-4xl font-bold text-yellow-500 font sm:text-6xl"
                  />{" "}
                  <span className="-ml-3 text-4xl font-bold text-yellow-500 font sm:text-6xl">
                    +
                  </span>
                </div>
                <div className="mt-3 text-sm font-medium text-white sm:text-xl text-center max-w-32 sm:max-w-none">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
