import img1 from "../../assets/ge1.jpg";
import img2 from "../../assets/ge2.jpg";
import Heading from "../../components/Heading";
export default function GlobalExcursion() {
  return (
    <section className="px-6 py-10  bg-pink-950 sm:p-14">
      <div className="container mx-auto max-w-6xl">
        <Heading
          title="Global Excursion at IMM"
          titleClassName="lg:font-extrabold text-center  text-white "
          className="block pb-0 mx-auto w-full text-left  sm:col-span-4 sm:pb-0 lg:pb-14"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Section */}
          <div className="p-4 bg-white">
            <h2 className="mb-4 text-2xl font-bold text-center text-pink-950">
              Few Global Excursion Glimpses
            </h2>
            <div className="overflow-hidden">
              <img
                src={img1}
                alt="Global Excursion group"
                className="object-cover w-full h-auto"
                width={600}
                height={400}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="p-4 bg-white">
            <h2 className="mb-4 text-2xl font-bold text-center text-pink-950">
              VISION VOYAGE AAGAMAN 2024
            </h2>
            <div className="overflow-hidden">
              <img
                src={img2}
                alt="Vision Voyage event"
                className="object-cover w-full h-auto"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
