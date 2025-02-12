import Heading from "../../components/Heading";
import img1 from "../../assets/escp.png";
import img2 from "../../assets/fu.png";
import img3 from "../../assets/mages.png";
import img4 from "../../assets/nsic.png";
import img5 from "../../assets/longman.png";
import img6 from "../../assets/process.png";

export default function AcademicPartners() {
  const partners = [
    {
      name: "ESCP Business School",
      location: "LONDON",
      accreditation: "AACSB Accredited",
      logo: img1,
    },
    {
      name: "Fordham University",
      location: "EXECUTIVE EDUCATION, NEW YORK",
      accreditation: "AACSB Accredited",
      logo: img2,
    },
    {
      name: "MAGES Institute of Excellence",
      location: "SINGAPORE",
      accreditation: "",
      logo: img3,
    },
    {
      name: "NSIC",
      location: "GOVERNMENT OF INDIA CERTIFICATION",
      accreditation: "COURSES",
      logo: img4,
    },
    {
      name: "ProcessBee",
      location: "BUSINESS SIMULATION CERTIFICATION",
      accreditation: "",
      logo: img5,
    },
    {
      name: "Pearson Longman",
      location: "PEARSON CERTIFICATION FOR ENGL.",
      accreditation: "LANGUAGE",
      logo: img6,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-t from-primary-color via-pink-700 to-primary-color lg:py-20 md:py-12 py-8 sm:px-0 px-6">
      <div className="container mx-auto max-w-7xl">
        <Heading
          title="Academic Partners"
          titleClassName="text-center text-2xl font-bold text-white md:text-3xl"
          className="block pb-0 mx-auto w-full text-left sm:col-span-4 sm:pb-0 lg:pb-14"
          subtitle="Our academic partners are some of the best in the world, and we are proud to have them on board."
          subtitleClassName="text-center text-white/80 text-sm md:text-base"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 text-center rounded-sm shadow-md hover:translate-y-[-10px] duration-300"
            >
              <div className="mb-4 h-24 w-full">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="mx-auto h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">
                  {partner.location}
                </p>
                {partner.accreditation && (
                  <p className="text-sm text-gray-600">
                    {partner.accreditation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
