import img1 from "../../assets/ge1.jpg";
import img2 from "../../assets/ge2.jpg";
import Heading from "../../components/Heading";

export default function GlobalExcursion() {
  const excursionItems = [
    {
      title: "Few Global Excursion Glimpses",
      image: img1,
      alt: "Global Excursion group"
    },
    {
      title: "VISION VOYAGE AAGAMAN 2024", 
      image: img2,
      alt: "Vision Voyage event"
    }
  ];

  const ExcursionCard = ({ title, image, alt }) => (
    <div className="p-4 bg-white">
      <h2 className="mb-4 text-2xl font-bold text-center text-pink-950">
        {title}
      </h2>
      <div className="overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="object-cover w-full h-auto hover:scale-125 duration-300"
          width={600}
          height={400}
        />
      </div>
    </div>
  );

  return (
    <section className="bg-pink-950 lg:py-20 md:py-12 py-8 sm:px-0 px-6">
      <div className="container mx-auto max-w-6xl">
        <Heading
          title="Global Excursion at IMM"
          titleClassName="lg:font-extrabold text-center text-white"
          className="block pb-0 mx-auto w-full text-left sm:col-span-4 sm:pb-0 lg:pb-14"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {excursionItems.map((item, index) => (
            <ExcursionCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
