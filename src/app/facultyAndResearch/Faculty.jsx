import { useState, useEffect, useCallback, memo, useMemo } from "react";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import { useFetch } from "../../hooks/useFetch";
import { LinkedinIcon } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import PropTypes from "prop-types";

// Memoized TeamMemberCard component to prevent unnecessary re-renders
const TeamMemberCard = memo(({ name, role, imageSrc, linkedinLink }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (

    <div className="hover:-translate-y-2 transition-all duration-300 ">
       

      <div className="bg-white shadow-xl dark:bg-slate-800 rounded-xl h-full p-2 group relative">


      <BorderBeam
        duration={6}
        size={600}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={600}
        className="from-transparent via-blue-500 to-transparent"
      />
        <div className="flex justify-center overflow-hidden rounded-lg relative">
          {/* Show placeholder until image loads */}
          {!imageLoaded && !imageError && (
            <div className="w-full h-60 bg-slate-200 animate-pulse rounded-lg"></div>
          )}

          {/* Show fallback image on error */}
          {imageError && (
            <div className="w-full h-60 bg-slate-100 flex items-center justify-center rounded-lg">
              <span className="text-sm text-slate-400">Image unavailable</span>
            </div>
          )}

          <img
            src={imageSrc}
            alt={name}
            className={`w-full h-auto sm:h-80 object-cover rounded-lg hover:scale-110 transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy" // Native lazy loading
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>
        <div className="px-4 py-6">
          <h4 className="text-xl font-medium mb-1 line-clamp-1 hover:line-clamp-none transition-all duration-300">
            {name}
          </h4>
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
});

TeamMemberCard.displayName = "TeamMemberCard";

TeamMemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  linkedinLink: PropTypes.string,
};

const FacultyHeading = memo(() => {
  return (
    <section className="py-10 sm:py-14 mx-auto">
      <div className="max-w-screen-xl mx-auto">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="max-w-xl space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-7xl">
            <h3 className="text-primary-color text-center text-2xl font-semibold">
              Our Faculty
            </h3>
            <p className="text-gray-800 text-3xl font-semibold text-center sm:text-4xl">
              Excellence in Teaching & Research
            </p>
            <p className="sm:!mt-8 text-gray-600 text-justify sm:text-center">
              At IMM Business School, the foundation of academic distinction
              lies in our exceptional faculty. Our core team includes
              accomplished scholars—PhDs and Fellows—from India's most esteemed
              institutions. Their academic rigor is complemented by an elite
              roster of Adjunct and Visiting Faculty from globally recognized
              and prestigious institutions.
              <br />
              <br />
              Beyond academia, senior corporate leaders and industry veterans
              enrich the classroom as Visiting Faculty, offering students a
              dynamic blend of theoretical depth and real-world relevance. Our
              faculty are active thought leaders, consistently publishing in
              top-tier national and international journals, driving cutting-edge
              research, and engaging in high-impact consulting projects.
              <br />
              <br />
              The pedagogy at IMM is rooted in analytical thinking and research
              orientation. Faculty members leverage data-driven tools and
              case-based learning to challenge conventional perspectives and
              build critical insight. Students benefit from unfettered access to
              leading academic journals and knowledge repositories, nurturing an
              environment where inquiry is encouraged and innovation thrives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

FacultyHeading.displayName = "FacultyHeading";

const Faculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [visibleFaculty, setVisibleFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const membersPerPage = 10; // Load 10 members at a time

  const { data } = useFetch("/api/indexBanner.php");
  const [banner, setBanner] = useState([]);

  // Track if component is mounted to avoid state updates after unmount
  const [isMounted, setIsMounted] = useState(true);

  const orderedNames = useMemo(
    () => [
      "Prof. Smita Lal",
      "Dr. Ruchi Sharma",
      "Prof. Megha Mathur",
      "Dr. Preshni Shrivastava",
      "Prof. Rituparna Prasoon",
      "Dr. Swati Jha",
      "Dr. Tanu Manocha",
      "Dr. Shivangi",
      "Dr. Sakshi Sharma",
      "Prof. Sanjay Verma",
      "Prof. Nisha Anand",
      "Prof. Sonalika Singh",
      "Prof. Mukul Kumar",
      "Prof. Suket Chauhan",
      "Prof. Kapil Kumar Bali",
      "Prof. Kamlesh Kumar Verma",
      "Prof. Manoj Sharma",
      "Prof. Ruchika Dugal",
      "Prof. Varun Jaggi",
      "Prof. Dhruv Sood",
      "Prof. Harish Jain",
      "Dr. K.L. Chawla",
      "Prof. D.C.Singhal",
      "Prof. Anupam Bhasin",
      "Prof. Sanjay Blaggan",
      "Prof. Anurag Arora",
      "Prof. Madan Lal",
    ],
    []
  );

  useEffect(() => {
    return () => setIsMounted(false); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (data) {
      setBanner(data.filter((item) => item.category === "Faculty"));
    }
  }, [data]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/faculty-and-research/faculty", label: "Faculty and Research" },
    { label: "Faculty" },
  ];

  // Memoized fetch function to avoid recreation on renders
  const fetchFaculty = useCallback(async () => {
    if (!isMounted) return;

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

      // Create ordered faculty list based on predefined sequence
      const orderedFaculty = [];

      // First add faculty members in the specified order
      orderedNames.forEach((nameFragment) => {
        const matchingMember = facultyOnly.find(
          (member) =>
            member.title.toLowerCase().trim() === nameFragment.toLowerCase()
        );

        if (matchingMember) {
          orderedFaculty.push(matchingMember);
        }
      });

      // Add any remaining faculty members that weren't matched
      facultyOnly.forEach((member) => {
        if (
          !orderedFaculty.some(
            (orderedMember) => orderedMember.id === member.id
          )
        ) {
          orderedFaculty.push(member);
        }
      });

      if (isMounted) {
        setFacultyMembers(orderedFaculty);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
        setLoading(false);
      }
    }
  }, [isMounted, orderedNames]);

  // Fetch faculty data on component mount
  useEffect(() => {
    fetchFaculty();
  }, [fetchFaculty]);

  // Update visible faculty when page changes or all faculty data loads
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * membersPerPage;
    setVisibleFaculty(facultyMembers.slice(startIndex, endIndex));
  }, [facultyMembers, page, membersPerPage]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading || facultyMembers.length <= visibleFaculty.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    const loadMoreTrigger = document.getElementById("load-more-trigger");
    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger);
    }

    return () => {
      if (loadMoreTrigger) {
        observer.unobserve(loadMoreTrigger);
      }
    };
  }, [loading, facultyMembers.length, visibleFaculty.length]);

  return (
    <div className="relative min-h-screen">
      <ImgAndBreadcrumb
        title="Faculty"
        imageSrc={
          banner[0]?.url ||
          "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"
        }
        imageAlt="Faculty Banner"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid">
        <FacultyHeading />
        {loading && (
          <div className="text-center py-10">
            <p className="text-lg">Loading faculty information...</p>
            {/* Show skeleton placeholders while loading */}
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-6 mt-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="bg-white shadow-xl rounded-xl p-2 w-full">
                  <div className="w-full aspect-square h-60 bg-slate-200 animate-pulse rounded-lg"></div>
                  <div className="px-4 py-6">
                    <div className="h-6 bg-slate-200 animate-pulse rounded mb-2"></div>
                    <div className="h-12 bg-slate-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-lg text-red-500">Error: {error}</p>
            <button
              onClick={fetchFaculty}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto justify-center items-stretch text-center">
              {visibleFaculty.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  name={member.title}
                  role={member.description}
                  imageSrc={member.url}
                  linkedinLink={member.link}
                />
              ))}
            </div>

            {/* Load more trigger element for infinite scroll */}
            {visibleFaculty.length < facultyMembers.length && (
              <div id="load-more-trigger" className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        )}
      </Container>
      {/* <div className="bg-slate-50"></div> */}
    </div>
  );
};

export default Faculty;
