// import img from "../../assets/hero.jpg";
import img from "../../assets/Hero/1.webp";
import img2 from "../../assets/Hero/2.webp";
import img3 from "../../assets/Hero/3.webp";
import img4 from "../../assets/Hero/4.webp";
import img5 from "../../assets/Hero/5.webp";

import { AccreditationLogoMobile } from "./AccreditationLogoMobile";
import Slider from "./Slider";

export default function HeroSlider() {
  const slides = [
    {
      slider: true,
      image: img,
      title: "Discover Amazing Places",
      heading1: "Human Centered.",
      heading2: "Future Focused.",
      description: "Infused with Artificial Intelligence and Machine Learning",
      buttons: [
        { text: "PGDM Program", link: "/programs/pgdm" },
        { text: "BBA Program", link: "/programs/bba" },
      ],
    },
    {
      slider: true,
      image: img2,
      title: "Unforgettable Adventures",
      heading1: "Innovation Driven.",
      heading2: "Industry Ready.",
      description: "Preparing tomorrow's leaders with cutting-edge education",
      buttons: [
        { text: "PGDM Program", link: "/programs/pgdm" },
        { text: "BBA Program", link: "/programs/bba" },
      ],
    },
    {
      slider: true,
      image: img3,
      title: "Luxury Accommodations",
      heading1: "Global Perspective.",
      heading2: "Local Impact.",
      description: "Creating change-makers for a better tomorrow",
      buttons: [
        { text: "PGDM Program", link: "/programs/pgdm" },
        { text: "BBA Program", link: "/programs/bba" },
      ],
    },
    {
      slider: true,
      image: img4,
      title: "Luxury Accommodations",
      heading1: "Global Perspective.",
      heading2: "Local Impact.",
    },
    {
      slider: true,
      image: img5,
      title: "Luxury Accommodations",
      heading1: "Global Perspective.",
      heading2: "Local Impact.",
    },
  ];

  return (
    <>
      <div className="w-screen bg-gradient-to-t from-primary-color via-pink-700 to-primary-color h-[70vh] sm:h-[80vh] overflow-hidden">
        <Slider slides={slides} effect="fade" arrowClassName="hidden sm:flex" />
      </div>
      {/* <div className="w-full relative" style={{ marginTop: '-125px' }}>
        <div className="container mx-auto">
          <div className="relative">
            <AccreditationLogoMobile />
            <div className="absolute bottom-0 left-0 w-full h-[calc(500px-25px)] bg-gradient-to-t from-primary-color via-pink-700 to-primary-color -z-[1]" />
          </div>
        </div>
      </div> */}
    </>
  );
}
