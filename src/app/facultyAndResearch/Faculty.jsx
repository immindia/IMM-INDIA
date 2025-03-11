import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/faculty/Banner.webp";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";

import { LinkedinIcon } from "lucide-react";
import Anupam from "../../assets/faculty/Anupam.jpg";
import Anurag from "../../assets/faculty/Anurag.jpg";
import Castelino from "../../assets/faculty/Castelino.png";
import Dhruv from "../../assets/faculty/Dhruv.png";
import Dilip from "../../assets/faculty/Dilip.png";
import Harish from "../../assets/faculty/Harish.jpg";
import Kamil from "../../assets/faculty/Kamil.jpeg";
import Kamlesh from "../../assets/faculty/Kamlesh.png";
import Madan from "../../assets/faculty/Madan.png";
import Manoj from "../../assets/faculty/Manoj.jpg";
import Megha from "../../assets/faculty/Megha.webp";
import Mukul from "../../assets/faculty/Mukul.webp";
import Nisha from "../../assets/faculty/Nisha.webp";
import Preshni from "../../assets/faculty/Preshni.png";
import Rituparna from "../../assets/faculty/Rituparna.webp";
import Ruchi from "../../assets/faculty/Ruchi.webp";
import Ruchika from "../../assets/faculty/Ruchika.png";
import Sakshi from "../../assets/faculty/Sakshi.png";
import Smita from "../../assets/faculty/Samita.webp";
import SanjayB from "../../assets/faculty/Sanjay B.png";
import Satinder from "../../assets/faculty/Satinder.jpg";
import Singhal from "../../assets/faculty/Singhal.jpg";
import Sonalika from "../../assets/faculty/Sonalika.png";
import Suket from "../../assets/faculty/Suket.jpg";
import Swati from "../../assets/faculty/Swati.webp";
import Tanu from "../../assets/faculty/Tanu.webp";
import Varun from "../../assets/faculty/Varun.png";

const Faculty = () => {
  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/faculty-and-research/faculty", label: "Faculty and Research" },
    { label: "Faculty" },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Prof. Dr. Dilip Nandkeolyar",
      role: "Ph.D (Business Management)",
      imageSrc: Dilip,
    },
    {
      id: 2,
      name: "Prof. Smita Lal",
      role: "Dean\nMBA (Mktg.& Fin), B.Com.",
      imageSrc: Smita,
    },
    {
      id: 3,
      name: "Dr. Ruchi Sharma",
      role: "Controller of Examination\nPh.D.(Mktg.), M.Com. (NET),\nMBA, PGDCA, PGDSRD",
      imageSrc: Ruchi,
    },
    {
      id: 4,
      name: "Prof. Megha Mathur",
      role: "Head-Academics\nUGC NET, M.Phil, MBA,\nPursuing Ph.D.",
      imageSrc: Megha,
    },
    {
      id: 5,
      name: "Dr. Preshni Shrivastava",
      role: "Ph.D. (Mngmt), MBA (IT), PGDM (OM), DEEE, PMP",
      imageSrc: Preshni,
    },
    {
      id: 6,
      name: "Prof. Rituparna Prasoon",
      role: "MBA (HR & Mktg.),\nMA., LLB",
      imageSrc: Rituparna,
    },
    {
      id: 7,
      name: "Dr. Swati Jha",
      role: "Ph.D. (Mngmt), MBA (Finance and HR)\nUGC NET JRF\nNLP practitioner",
      imageSrc: Swati,
    },
    {
      id: 8,
      name: "Dr. Tanu Manocha",
      role: "Ph.D.(OM), MBA (OM),\nB.Tech (ECE)",
      imageSrc: Tanu,
    },
    {
      id: 9,
      name: "Dr. Sakshi Sharma",
      role: "Ph.D(HR), MBA(Fin. & HR), UGC NET, B.Ed., B.Com.",
      imageSrc: Sakshi,
    },
    {
      id: 10,
      name: "Dr. Satinder Bhatia",
      role: "M.Com, M.Phil (Organisation Behaviour), Ph.D (Financial Management), Project Management Professional (PMP)",
      imageSrc: Satinder,
    },
    {
      id: 11,
      name: "Prof. Castelino Aldrin Santosh",
      role: "B.A.(Economics), Masters in Marketing Management (MMM), Pursuing Phd.",
      imageSrc: Castelino,
    },
    {
      id: 12,
      name: "Prof. Sanjay Verma",
      role: "PGDSM, B.A.",
      imageSrc: SanjayB,
    },
    {
      id: 13,
      name: "Prof. Nisha Anand",
      role: "PGDBM, MA(Public Adm.),\nB.Sc",
      imageSrc: Nisha,
    },
    {
      id: 14,
      name: "Prof. Sonalika Singh",
      role: "Assistant Professor\nHead Global Alliances PGDM, BA English (Hons), DU",
      imageSrc: Sonalika,
    },
    {
      id: 15,
      name: "Prof. Mukul Kumar",
      role: "MBA (Mktg), M. Com,\nB.Com,",
      imageSrc: Mukul,
    },
    {
      id: 16,
      name: "Prof. Suket Chauhan",
      role: "Mechanical Engineer, B.Com, MBA - HR & Marketing",
      imageSrc: Suket,
    },
    {
      id: 17,
      name: "Prof. Kapil Kumar Bali",
      role: "M.Com., FCS, LL.B, MBA",
      imageSrc: Kamil,
    },
    {
      id: 18,
      name: "Prof. Kamlesh Kumar Verma",
      role: "MBA (HR) (FMS)\nB E (Industrial Engg )\nIIT Roorkee",
      imageSrc: Kamlesh,
    },
    {
      id: 19,
      name: "Prof. Manoj Sharma",
      role: "MBA(Fin.), MA(Economics),\nB.Sc (PCM)",
      imageSrc: Manoj,
    },
    {
      id: 20,
      name: "Prof. Ruchika Dugal",
      role: "MBA ( Mktg & Adtvg.)\nCorporate Trainer",
      imageSrc: Ruchika,
    },
    {
      id: 21,
      name: "Prof. Varun Jaggi",
      role: "Soft Skill Trainer, Spoken\nEnglish Coach Public Speaker",
      imageSrc: Varun,
    },
    {
      id: 22,
      name: "Prof. Dhruv Sood",
      role: "MBA (IB)\nIIFT",
      imageSrc: Dhruv,
    },
    {
      id: 23,
      name: "Prof. Harish Jain",
      role: "B.Tech. (Mech. Honors) - IIT Kharagpur\nIndustry Domain: Big Data Analytics, Strategy Management, Agile Project Management and Marketing",
      imageSrc: Harish,
    },
    {
      id: 24,
      name: "Dr. K.L. Chawla",
      role: "Ph.D. (Economics), LLB\nIndustry Domain: Economics, International Business, Business Law",
      imageSrc: Kamlesh,
    },
    {
      id: 25,
      name: "Prof. D.C.Singhal",
      role: "B.Tech. (Mech.) – IIT, Kharagpur\nIndustry Domain: Procurement & Supply Chain Management, International Business, Operation Strategy & Management",
      imageSrc: Singhal,
    },
    {
      id: 26,
      name: "Prof. Anupam Bhasin",
      role: "MBA – FMS, Delhi\nIndustry Domain: Consultancy, Project Management, Trainer",
      imageSrc: Anupam,
    },
    {
      id: 27,
      name: "Prof. Sanjay Blaggan",
      role: "M.Tech (CS), B.Sc\nIndustry Domain: IT, Programming and Statistical Analysis",
      imageSrc: SanjayB,
    },
    {
      id: 28,
      name: "Prof. Anurag Arora",
      role: "MBA, PG (International Business) – IIFT, Delhi\nIndustry Domain: P&L Management, Product/ Brand Management",
      imageSrc: Anurag,
    },
    {
      id: 29,
      name: "Prof. Madan Lal",
      role: "M.A. (Economics)\nIndustry Domain: International Marketing, Foreign Trade Policy, International Trade Operations",
      imageSrc: Madan,
    },
  ];

  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title="Faculty"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        {/* <Heading
          title="Introducing Our Esteemed Faculty"
          titleClassName="text-primary-color lg:text-5xl text-center"
          subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
          subtitle="Discover the leaders who are steering our institution towards excellence in education and empowerment."
          className="pt-12 mx-auto"
        /> */}
        <FacultyHeading />
        <div className="grid grid-cols-4 gap-6 text-center">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </Container>
      <div className="bg-slate-50"></div>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default Faculty;

const TeamMemberCard = ({ name, role, imageSrc }) => (
  <div className="col-span-4 md:col-span-2 lg:col-span-1 hover:-translate-y-2 transition-all duration-300">
    <div className="bg-white shadow-xl dark:bg-slate-800 rounded-xl h-full p-2 group">
      <div className="flex justify-center overflow-hidden rounded-lg relative">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-auto rounded-lg hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="px-4 py-6">
        <h4 className="text-2xl font-medium mb-1">{name}</h4>
        <p className="mb-4 text-sm sm:line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {role}
        </p>
        <div className="mt-6 flex justify-center">
          <LinkedinIcon size={20} />
        </div>
      </div>
    </div>
  </div>
);

const FacultyHeading = () => {
  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto ">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="flex-1 sm:hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              className="md:max-w-lg rounded-lg "
              alt=""
            />
          </div>
          <div className="max-w-xl  space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
            <h3 className="text-primary-color text-2xl font-semibold">
              Our Faculty
            </h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Excellence in Teaching & Research
            </p>
            <p className="mt-3 text-gray-600 text-justify ">
              The IMM Business School has Faculty members who have earned PhDs
              or are Fellows from top schools in India. We attract Adjunct and
              Visiting Faculty from prestigious institutions like IMM Ahmedabad,
              IMM Lucknow, IIT Kanpur, IIT Roorkee, Jamanalal Bajaj, FMS, IIFT
              and other prominent business schools globally. Top industry
              executives serve as Visiting Faculty, bringing real-world
              experience to the classroom.
            </p>
            <p className="mt-3 text-gray-600 text-justify">
              Our Faculty regularly publish research papers in renowned
              international and national journals, engage in consultancy work,
              and employ analytical tools in their teaching pedagogy. Students
              benefit from complete access to journals and publications,
              enhancing their subject knowledge through research-based lectures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
