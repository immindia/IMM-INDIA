import bg from "@/assets/landing/Placement-Banner.jpg";
import Container from "@/components/wrappers/Container";
import Heading from "@/components/Heading";
import ThreeDPlacementCard from "@/components/ThreeDPlacementCard";
import PlacementCardMarquee from "@/components/PlacementCardMarquee";
import { memo, useEffect } from "react";
import { usePlacementsData } from "../../hooks/useApiData";
import LazySection from "../../components/LazySection";

const placeholderPlacements = [
  {
    id: "p1",
    title: "Vipin Yadav",
    url: "/placement/placement (1).webp",
    logo_url: "/placeholder.svg",
    description: "Leading MNC",
  },
  {
    id: "p2",
    title: "Divya Bansal",
    url: "/placement/placement (2).webp",
    logo_url: "/placeholder.svg",
    description: "Fortune 500 Company",
  },
  {
    id: "p3",
    title: "Dheeraj Satija",
    url: "/placement/placement (3).webp",
    logo_url: "/placeholder.svg",
    description: "Top Recruiter",
  },
  {
    id: "p4",
    title: "Abhay Bhadouria",
    url: "/placement/placement (4).webp",
    logo_url: "/placeholder.svg",
    description: "Global Innovator",
  },
  {
    id: "p5",
    title: "Muskan Garg",
    url: "/placement/placement (5).webp",
    logo_url: "/placeholder.svg",
    description: "Industry Leader",
  },
  {
    id: "p6",
    title: "Milind K Yadav",
    url: "/placement/placement (6).webp",
    logo_url: "/placeholder.svg",
    description: "Creative Agency",
  },
];

const PlacementsContent = () => {
  const { data: placements = [], isLoading, error } = usePlacementsData();

  useEffect(() => {
    const placeholderImages = placeholderPlacements.map(
      (placement) => placement.url
    );
    const imagesToPreload = [bg, ...placeholderImages];
    imagesToPreload.forEach((imageUrl) => {
      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
      }
    });
  }, []);

  useEffect(() => {
    if (placements.length > 0) {
      const placementImages = placements.map((p) => [p.url, p.logo_url]).flat();
      const imagesToPreload = [...new Set(placementImages.filter(Boolean))]; // get unique urls
      imagesToPreload.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
      });
    }
  }, [placements]);

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

  const displayPlacements = isLoading ? placeholderPlacements : placements;

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
            {displayPlacements.map((card) => (
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
    <LazySection rootMargin="50px">
      <PlacementsContent />
    </LazySection>
  );
};

export default memo(Placements);
