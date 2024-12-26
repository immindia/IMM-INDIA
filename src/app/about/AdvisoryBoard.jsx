import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/about/AboutBanner.webp";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";

import { LinkedinIcon } from "lucide-react";
import DrGPrao from "../../assets/about/advisory/Dr-G-P-Rao.webp";
import DrMVenkatesan from "../../assets/about/advisory/Dr-M-Venkatesan.webp";
import DrSurabhiPandey from "../../assets/about/advisory/Dr-Surabhi-Pandey.webp";
import DrVeenaBhalla from "../../assets/about/advisory/Dr-Veena-Bhalla.webp";
import MrAbenLal from "../../assets/about/advisory/Mr-Aben-Lal.webp";
import MrRohitLamba from "../../assets/about/advisory/Mr-Rohit-Lamba.webp";
import MrSanjayPuri from "../../assets/about/advisory/Mr-Sanjay-Puri.webp";

const AdvisoryBoard = () => {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/about/advisory-board", label: "About" },
    { label: "Advisory Board" },
  ];
  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title="Advisory Board"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        <Heading
          title="Welcome to Our Advisory Board"
          titleClassName="text-primary-color  lg:text-5xl text-center"
          subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
          subtitle="Meet the visionaries guiding our institution towards excellence in education and empowerment."
          className="pt-12 mx-auto"
        />
        <AdvisoryBoardContent />
      </Container>
      <div className="bg-slate-50"></div>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default AdvisoryBoard;

const TeamMemberCard = ({ name, role, imageSrc }) => (
  <div className="col-span-4 md:col-span-2 lg:col-span-1 hover:-translate-y-2 transition-all duration-300">
    <div className="bg-white shadow-xl dark:bg-slate-800 rounded-xl h-full p-2">
        <div className="flex justify-center overflow-hidden rounded-lg relative">
            <img src={imageSrc} alt={name} className="w-full h-auto rounded-lg hover:scale-110 transition-all duration-300" />
           
        </div>
      <div className="px-4 py-6">
        <h4 className="text-2xl font-medium mb-1">{name}</h4>
        <p className="mb-4 text-sm">{role}</p>
        <div className="mt-6 flex justify-center">
          <LinkedinIcon size={20} />
        </div>
      </div>
    </div>
  </div>
);

const AdvisoryBoardContent = () => {
  const teamMembers = [
    {
      name: "Dr. G. P. Rao",
      role: "Founder\nGPR HR Consulting LLP",
      imageSrc: DrGPrao,
    },
    {
      name: "Dr. M. Venkatesan",
      role: "Professor in OB\n& HRM Head Incharge\nAssessment & Development Centre (IIFT)",
      imageSrc: DrMVenkatesan,
    },
    {
      name: "Dr. Surabhi Pandey",
      role: "Assistant Professor\n& Program Incharge\nIndian Institute of Public Administration (IIPA)",
      imageSrc: DrSurabhiPandey,
    },
    {
      name: "Dr. Veena Bhalla",
      role: "Consultant\nDr. D Y Patil Vidyapeeth",
      imageSrc: DrVeenaBhalla,
    },
    {
      name: "Mr. Aben Lal",
      role: "General Manager (Retd.)\nAir India\nExecutive Director (Retd.)\nAlliance Air",
      imageSrc: MrAbenLal,
    },
    {
      name: "Mr. Rohit Lamba",
      role: "Vice President\nSales & Marketing\nHead Branding\nJindal Steel & Power Limited",
      imageSrc: MrRohitLamba,
    },
    {
      name: "Mr. Sanjay Puri",
      role: "Vice President\nThe Indian Express (P) Ltd.",
      imageSrc: MrSanjayPuri,
    },
  ];

  return (
    <section className="ezy__team4 light bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
       
        <div className="grid grid-cols-4 gap-6 text-center">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};
