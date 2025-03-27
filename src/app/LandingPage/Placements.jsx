import bg from "@/assets/landing/Placement-Banner.jpg";
import Container from "@/components/wrappers/Container";
import Heading from "@/components/Heading";
import ThreeDPlacementCard from "@/components/ThreeDPlacementCard";
import PlacementCardMarquee from "@/components/PlacementCardMarquee";
import { placementCards } from "@/data/placementData";

import { useEffect, memo } from "react";

const Placements = () => {
  // Preload images
  useEffect(() => {
    placementCards.forEach((card) => {
      const img = new Image();
      img.src = card.image;
      const logo = new Image();
      logo.src = card.logo;
    });
  }, []);

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
            {placementCards.map((card) => (
              <ThreeDPlacementCard key={card.id} {...card} />
            ))}
          </PlacementCardMarquee>
        </div>
      </Container>
    </div>
  );
};

export default memo(Placements);
