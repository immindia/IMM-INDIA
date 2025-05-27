import bg from "@/assets/landing/Placement-Banner.jpg";
import Container from "@/components/wrappers/Container";
import Heading from "@/components/Heading";
import ThreeDPlacementCard from "@/components/ThreeDPlacementCard";
import PlacementCardMarquee from "@/components/PlacementCardMarquee";
import { useEffect, memo, useState } from "react";

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await fetch(
          "https://stealthlearn.in/imm-admin/api/indexPlacement.php"
        );
        const data = await response.json();
        // Filter for Summer Placement category
        const summerPlacements = data.filter(
          (item) => item.category === "Summer Placement"
        );
        setPlacements(summerPlacements.reverse().slice(0, 14));
      } catch (error) {
        console.error("Error fetching placements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, []);

  // Preload images
  useEffect(() => {
    if (placements.length > 0) {
      placements.forEach((card) => {
        const img = new Image();
        img.src = card.url;
        const logo = new Image();
        logo.src = card.logo_url;
      });
    }
  }, [placements]);

  if (loading) {
    return (
      <div
        className="relative bg-cover bg-center transform-gpu"
        style={{ backgroundImage: `url(${bg})`, willChange: "transform" }}
      >
        <Container>
          <div className="text-center py-10">
            <p>Loading placements...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="relative bg-cover bg-center transform-gpu"
      style={{
        backgroundImage: `url(${bg})`,
        willChange: "transform",
      }}
    >
      <Container>
        <div>
          <Heading
            title="Campus to Corporate"
            titleClassName="text-primary-color text-left text-center text-primary-color"
            subtitleClassName="text-gray-500 text-justify m-0 lg:text-lg lg:font-normal lg:max-w-full text-center"
            subtitle="100+ top companies recruit our graduates for premium career opportunities"
            className="lg:pb-10"
          />

          <PlacementCardMarquee>
            {placements.map((card) => (
              <ThreeDPlacementCard
                key={card.id}
                id={card.id}
                name={card.title}
                image={card.url}
                logo={card.logo_url}
                company={card.description}
              />
            ))}
          </PlacementCardMarquee>
        </div>
      </Container>
    </div>
  );
};

export default memo(Placements);
