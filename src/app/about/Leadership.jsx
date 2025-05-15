import Heading from "../../components/Heading";
import ImgAndBreadcrumb from "../../components/ImgAndBreadcrumb";
import Container from "../../components/wrappers/Container";
import img from "../../assets/about/AboutBanner.webp";
// import Stats from "../../components/Stats";
// import Newsletter from "../../components/Newsletter";
// import AboutSidebar from "../../components/AboutSidebar";
import { useState, useEffect } from "react";
import { Mail, MailOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useFetch } from "../../hooks/useFetch";

import PropTypes from "prop-types";

const Leadership = () => {
  const { data } = useFetch("/api/indexBanner.php");
  const [banner, setBanner] = useState([]);
    useEffect(() => {
      if (data) {
        setBanner(data.filter((item) => item.category === "Leadership"));
      }
    }, [data]);

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/about/leadership", label: "About" },
    { label: "Leadership" },
  ];
  return (
    <div className="relative min-h-screen ">
      <ImgAndBreadcrumb
        title=""
        imageSrc={banner[0]?.url || "https://stealthlearn.in/imm-admin/api/uploads/680fd14484b0a.png"}
        imageAlt="Description of the image"
        breadcrumbItems={breadcrumbItems}
      />
      <Container className="container grid ">
        <Heading
          title="Welcome to Our Leadership Team"
          titleClassName="text-primary-color  lg:text-5xl text-center"
          subtitleClassName="text-gray-500 text-center m-0 lg:text-lg lg:font-normal lg:max-w-full"
          subtitle="Meet the visionaries guiding our institution towards excellence in education and empowerment."
          className="pt-12 mx-auto"
        />
        <LeadershipContent />
      </Container>
      <div className="bg-slate-50"></div>
      {/* <Stats />
      <Newsletter /> */}
    </div>
  );
};

export default Leadership;

const LeadershipContent = () => {
  const [leadershipMembers, setLeadershipMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexFaculty.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leadership data");
        }
        const data = await response.json();
        // Filter to only include leadership category
        const leadershipOnly = data.filter(
          (member) => member.category.toLowerCase() === "leadership"
        );
        setLeadershipMembers(leadershipOnly.reverse());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  const handleReadMore = (leader) => {
    setSelectedLeader(leader);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto">
      {loading && (
        <div className="text-center py-10">
          <p className="text-lg">Loading leadership information...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-10">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipMembers.map((leader, index) => (
            <LeaderCard
              key={leader.id}
              leader={{
                name: leader.title,
                position: leader.description,
                image: leader.url,
                linkedin: leader.link,
                message: leader.message || "No message available.",
              }}
              onReadMore={handleReadMore}
              index={index}
            />
          ))}
        </div>
      )}
      <ReadMoreDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        leader={selectedLeader}
      />
    </div>
  );
};

const LeaderCard = ({ leader, onReadMore, index }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-grow p-6">
        <div className="aspect-w-1 aspect-h-1 mb-4">
          <img
            src={leader.image}
            alt={leader.name}
            className="object-cover rounded-lg shadow border border-gray-50"
          />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
            <p className="text-gray-600 mb-4">{leader.position}</p>
          </div>

          
            <a
              href={leader.linkedin || "javascript:void(0)"}
              // target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-300"
              
            >
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/linkedin.png"
                alt="linkedin"
              />
            </a>
     
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={() => onReadMore(leader)}
          className="w-full flex items-center justify-center group"
        >
          {index === 0 || index === 1 ? "View Legacy" : "View Message"}
          <Mail
            size={20}
            className="mt-1 ml-2 group-hover:hidden transition-all duration-300"
          />
          <MailOpen
            size={20}
            className="mt- ml-2 hidden group-hover:block transition-all duration-300"
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

const ReadMoreDialog = ({ isOpen, onClose, leader }) => {
  if (!leader) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className=" rounded-lg">
      <DialogContent className="sm:max-w-3xl rounded-lg w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl text-left">{leader.name}</DialogTitle>
          <DialogDescription className="text-left">
            {leader.position}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {leader.message.split(/\n+/).map((paragraph, index) => (
            <p key={index} className="mb-4 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add PropTypes for components
LeaderCard.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    linkedin: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  onReadMore: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

ReadMoreDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
};
