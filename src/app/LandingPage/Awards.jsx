import Heading from "../../components/Heading";

const cards = [
  {
    title: "AIMS Innovation Award",
  },
  {
    title: "Best B-School Of the Year 2023",
  },
  {
    title:
      "Best Business School with Excellent Placement Record of the Year 2022",
  },
  {
    title:
      "Best Business School with Excellent Placement Record of the Year 2022",
  },
  {
    title: "Centre of Academic Excellence (B School) from Delhi NCR",
  },
];
const Awards = () => {
  return (
    <section className="relative px-0 py-10 lg:py-28 md:py-12 sm:px-0 bg-black/90">
      <div className="relative z-30 px-4 mx-auto max-w-screen-xl md:px-8">
        <Heading
          title="Awards and Recognitions"
          titleClassName="text-4xl md:text-6xl font-bold text-yellow-400"
          subtitle="We are proud to have received numerous awards and recognitions for our academic excellence and innovation."
          subtitleClassName="text-gray-300 text-base md:text-lg"
          className="text-center"
        />
        <PlacementHighlights />
      </div>
    </section>
  );
};

export default Awards;

const CardItem = ({ item }) => (
  <div className="">
    <div className="">
      <img
        src="https://cdn.easyfrontend.com/pictures/logos/award-logo.png"
        alt=""
        className="max-w-[220px] text-blue-600 mx-auto hover:rotate-[360deg] duration-300"
      />
    </div>
    <h5 className="text-[17px] text-white font-medium leading-relaxed mb-0 text-center ">
      {item.title}
    </h5>
  </div>
);
const PlacementHighlights = () => {
  return (
    <section className="rounded-lg dark-gray dark:bg-[#0b1727] text-slate-800 dark:text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map((item, i) => (
            <div
              className="col-span-3 duration-300 md:col-span-1 hover:scale-105"
              key={i}
            >
              <CardItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
