import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";
import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/about/AboutBanner.webp";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";
import { useFetch } from "../../hooks/useFetch";
import { LinkedinIcon } from "lucide-react";
import PropTypes from "prop-types";

const AdvisoryBoard = () => {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("About Us - advisory-board");
    setDescription(
      "Meet the distinguished Advisory Board of IMM Delhi—industry leaders and academic experts guiding the Institute of Marketing and Management with strategic insights and visionary leadership."
    );
  }, [setTitle, setDescription]);

  const { data } = useFetch("/api/indexBanner.php");
  const [bannerImage, setBannerImage] = useState(
    "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
  ); // Default image
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data) {
      const mobileImage = data.find(
        (item) => item.category === "Advisory Board Mobile"
      )?.url;
      const desktopImage = data.find(
        (item) => item.category === "Advisory Board"
      )?.url;

      if (isMobile && mobileImage) {
        setBannerImage(mobileImage);
      } else if (!isMobile && desktopImage) {
        setBannerImage(desktopImage);
      } else if (desktopImage) {
        setBannerImage(desktopImage);
      } else if (mobileImage) {
        setBannerImage(mobileImage);
      }
    }
  }, [data, isMobile]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/about/advisory-board", label: "About" },
    { label: "Advisory Board" },
  ];
  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title=""
        imageSrc={bannerImage}
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

const TeamMemberCard = ({ name, role, imageSrc, linkedinLink }) => (
  <div className=" hover:-translate-y-2 transition-all duration-300">
    <div className="bg-white shadow-xl dark:bg-slate-800 rounded-xl h-full p-2 group">
      <div className="flex justify-center overflow-hidden rounded-lg relative">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-auto rounded-lg hover:scale-110 transition-all duration-300"
        />
      </div>
      <div className="px-4 py-6">
        <h4 className="text-xl font-medium mb-1 line-clamp-1">{name}</h4>
        <p className="mb-4 text-sm line-clamp-none sm:line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {role}
        </p>
        <div className="mt-6 flex justify-center">
          <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

TeamMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  linkedinLink: PropTypes.string,
};

const AdvisoryBoardContent = () => {
  const [advisoryMembers, setAdvisoryMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvisoryBoard = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexFaculty.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch advisory board data");
        }
        const data = await response.json();
        // Filter to only include advisory board category
        const advisoryOnly = data.filter(
          (member) => member.category.toLowerCase() === "advisory board"
        );
        setAdvisoryMembers(advisoryOnly);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdvisoryBoard();
  }, []);

  return (
    <section className="ezy__team4 light bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
        {loading && (
          <div className="text-center py-10">
            <p className="text-lg">Loading advisory board information...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-10">
            <p className="text-lg text-red-500">Error: {error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
            {advisoryMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                name={member.title}
                role={member.description}
                imageSrc={member.url}
                linkedinLink={member.link}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
