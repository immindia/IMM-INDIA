import TopBar from "./TopBar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
// If you have these resources, uncomment these imports:
// import logo from "../../assets/logo.png"
// import Drawer from "./Drawer"

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Add delay using setTimeout
      setTimeout(() => {
        setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
        setPrevScrollPos(currentScrollPos);
      }, 150); // 100ms delay
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`shadow-sm z-[9999]  transition-all duration-500 ${
        isVisible ? "sticky top-0 translate-y-0" : "relative -translate-y-full"
      }`}
    >
      <TopBar />

      <Navbar />
    </header>
  );
};

export default Header;
