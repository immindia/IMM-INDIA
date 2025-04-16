import { useState, useEffect } from "react";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/faculty/Banner.webp";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";

import { LinkedinIcon } from "lucide-react";
import PropTypes from "prop-types";

const Faculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/faculty-and-research/faculty", label: "Faculty and Research" },
    { label: "Faculty" },
  ];

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexFaculty.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch faculty data");
        }
        const data = await response.json();
        // Filter to only include faculty category
        const facultyOnly = data.filter(
          (member) => member.category.toLowerCase() === "faculty"
        );
        setFacultyMembers(facultyOnly.reverse());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="Faculty"
        imageSrc={img}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid">
        <FacultyHeading />
        {loading && (
          <div className="text-center py-10">
            <p className="text-lg">Loading faculty information...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-10">
            <p className="text-lg text-red-500">Error: {error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-6 mx-auto justify-center items-center text-center">
            {facultyMembers.map((member) => (
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
      </Container>
      <div className="bg-slate-50"></div>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default Faculty;

const TeamMemberCard = ({ name, role, imageSrc, linkedinLink }) => (
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

const FacultyHeading = () => {
  return (
    <section className="py-14 mx-auto">
      <div className="max-w-screen-xl mx-auto ">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="flex-1 sm:hidden lg:block">
            <img
              src={img}
              className="md:max-w-lg rounded-lg h-80 w-full object-cover"
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
              Visiting Faculty from prestigious institutions like IIM Ahmedabad,
              IIM Lucknow, IIT Kanpur, IIT Roorkee, Jamnalal Bajaj, FMS, IIFT
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
