import bg from "@/assets/landing/Placement-Banner.jpg";
import Container from "@/components/wrappers/Container";
import Heading from "@/components/Heading";
import ThreeDPlacementCard from "@/components/ThreeDPlacementCard";
import PlacementCardMarquee from "@/components/PlacementCardMarquee";
import { memo } from "react";
import { usePlacementsData } from "../../hooks/useApiData";
import LazySection from "../../components/LazySection";

// Loading skeleton component
const PlacementsSkeleton = () => (
  <div
    className="relative bg-cover bg-center transform-gpu"
    style={{ backgroundImage: `url(${bg})`, willChange: "transform" }}
  >
    <Container>
      <div className="text-center py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
          <div className="flex space-x-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 w-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </div>
);

const PlacementsContent = () => {
  const { data: placements = [], isLoading, error } = usePlacementsData();

  if (isLoading) {
    return <PlacementsSkeleton />;
  }

  if (error) {
    return (
      <div
        className="relative bg-cover bg-center transform-gpu"
        style={{ backgroundImage: `url(${bg})`, willChange: "transform" }}
      >
        <Container>
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load placements data</p>
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

const Placements = () => {
  return (
    <LazySection fallback={<PlacementsSkeleton />} rootMargin="50px">
      <PlacementsContent />
    </LazySection>
  );
};

export default memo(Placements);
