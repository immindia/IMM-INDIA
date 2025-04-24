import Heading from "../../components/Heading";
import Container from "../../components/wrappers/Container";
import IconMarquee from "./IconMarquee";
import { useEffect, useState } from "react";

const Recruiters = () => {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexRecruiter.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recruiters");
        }
        const data = await response.json();

        // Filter recruiters where category is "Home Page Recruiter"
        const homePageRecruiters = data.filter(
          (recruiter) => recruiter.category === "Home Page Recruiter"
        );

        // Transform data to match the icons format
        const formattedIcons = homePageRecruiters.map((recruiter) => ({
          src: recruiter.url,
          alt: recruiter.title,
        }));

        setIcons(formattedIcons);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recruiters:", error);
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <div className="relative">
      <Container>
        <div>
          <Heading
            title="Our Prominent Recruiters"
            titleClassName="text-primary-color text-left text-center text-primary-color"
            subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full text-center"
            subtitle="Top companies across various industries now choose IMM as a preferred destination for on-campus recruitment."
            className="lg:pb-10"
          />

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
            </div>
          ) : (
            <IconMarquee icons={icons} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Recruiters;
