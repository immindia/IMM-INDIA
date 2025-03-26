import bg from "@/assets/landing/Placement-Banner.jpg";
import Container from "@/components/wrappers/Container";
import Heading from "@/components/Heading";
import ThreeDPlacementCard from "@/components/ThreeDPlacementCard";
import PlacementCardMarquee from "@/components/PlacementCardMarquee";
import Abhay from "@/assets/placements/students/Abhay Bhadouria23_1_11zon.webp";
import Akshay from "@/assets/placements/students/Akshay Kumar_2_11zon.webp";
import Ankur from "@/assets/placements/students/Ankur Sharma_3_11zon.webp";
import Dheeraj from "@/assets/placements/students/Dheeraj Satija_4_11zon.webp";
import Diksha from "@/assets/placements/students/Diksha Joshi_5_11zon.webp";
import Gaurav from "@/assets/placements/students/Gaurav Saho_6_11zon.webp";
import Gunraj from "@/assets/placements/students/Gunraj Chawla_7_11zon.webp";
import Jyotsana from "@/assets/placements/students/Jyotsana Singh_8_11zon.webp";
import Milind from "@/assets/placements/students/Milind  K Yadav_9_11zon.webp";
import Muskan from "@/assets/placements/students/Muskan Garg_10_11zon.webp";
import Ritam from "@/assets/placements/students/Ritam Kalkhandey_12_11zon.webp";
import Shambhavi from "@/assets/placements/students/Shambhavi Mishra23_13_11zon.webp";
import Shweta from "@/assets/placements/students/Shweta Singh_14_11zon.webp";
import Tamanna from "@/assets/placements/students/TAMANNA BHARDWAJ_15_11zon.webp";
import Vipin from "@/assets/placements/students/Vipin Yadav_16_11zon.webp";
import { useEffect, memo } from "react";

const placementCards = [
  {
    id: 1,
    image: Jyotsana,
    name: "Jyotsana Singh",
    company: "Lattice",
  },
  {
    id: 2,
    image: Gunraj,
    name: "Gunraj Chawla",
    company: "Ameriprise",
  },
  {
    id: 3,
    image: Shambhavi,
    name: "Shambhavi Mishra",
    company: "Archer & Bull",
  },
  {
    id: 4,
    image: Shweta,
    name: "Shweta Singh",
    company: "EasyCom",
  },
  {
    id: 5,
    image: Gaurav,
    name: "Gaurav Sahu",
    company: "HDFC Life",
  },
  {
    id: 6,
    image: Akshay,
    name: "Akshay Kumar",
    company: "HDFC Life",
  },
  {
    id: 7,
    image: Tamanna,
    name: "Tamanna Bhardwaj",
    company: "ICICI Bank",
  },
  {
    id: 8,
    image: Abhay,
    name: "Abhay Bhadouria",
    company: "ICICI Bank",
  },
  {
    id: 9,
    image: Ankur,
    name: "Ankur Sharma",
    company: "Info Edge",
  },
  {
    id: 10,
    image: Muskan,
    name: "Muskan Garg",
    company: "Info Edge",
  },
  {
    id: 11,
    image: Ritam,
    name: "Ritam Kalkhandey",
    company: "JK Cement",
  },
  {
    id: 12,
    image: Diksha,
    name: "Diksha Joshi",
    company: "Kladio",
  },
  {
    id: 13,
    image: Milind,
    name: "Milind K Yadav",
    company: "Oyo Room",
  },
  {
    id: 14,
    image: Vipin,
    name: "Vipin Yadav",
    company: "Regalo Kitchens",
  },
  {
    id: 15,
    image: Dheeraj,
    name: "Dheeraj Satija",
    company: "Yangpoo",
  },
];

const Placements = () => {
  // Preload images
  useEffect(() => {
    placementCards.forEach((card) => {
      const img = new Image();
      img.src = card.image;
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
