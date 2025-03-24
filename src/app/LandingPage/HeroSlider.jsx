import img from "../../assets/hero.jpg";

import Slider from "./Slider";

export default function HeroSlider() {
  const slides = [
    {slider: true,
      image:
        img,
      title: "Discover Amazing Places",
      heading1: "Human Centered.",
      heading2: "Future Focused.",
      description: "Infused with Artificial Intelligence and Machine Learning",
      buttons: [
        { text: "PGDM Program", link: "/programs/pgdm" },
        { text: "BBA Program", link: "/programs/bba" },
      ],
    },
    {slider: true,
      image:
        "https://www.immindia.edu.in/images_webp/home/banner/banner2.webp",
      title: "Unforgettable Adventures",
      heading1: "Innovation Driven.",
      heading2: "Industry Ready.",
      description: "Preparing tomorrow's leaders with cutting-edge education",
      buttons: [
        { text: "PGDM Program", link: "/programs/pgdm" },
        { text: "BBA Program", link: "/programs/bba" },
      ],
    },
    {slider: true,
      image:
        "https://www.immindia.edu.in/images_webp/home/banner/banner1.webp",
      title: "Luxury Accommodations",
      heading1: "Global Perspective.",
      heading2: "Local Impact.",
      description: "Creating change-makers for a better tomorrow",
      buttons: [
        { text: "PGDM Program", link: "/programs/pgdm" },
        { text: "BBA Program", link: "/programs/bba" },
      ],
    },
    {slider: true,
      image:
        "https://www.immindia.edu.in/images_webp/home/banner/banner10.webp",
      title: "Luxury Accommodations",
      heading1: "Global Perspective.",
      heading2: "Local Impact.",
    },
  ];

  return (
    <div className="w-screen h-[60vh] sm:h-[80vh] overflow-hidden">
      <Slider slides={slides} effect="fade" />
    </div>
  );
}
