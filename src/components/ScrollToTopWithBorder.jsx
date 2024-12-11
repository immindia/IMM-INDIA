import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using Shadcn's Button component
import { ArrowUpIcon } from "lucide-react"
const ScrollToTopWithBorder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Progress Tracker */}
      <div
        className="fixed z-50 top-0 left-0 h-1 bg-red-500 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Scroll-to-Top Button */}
      {isVisible && (
        <>
          <Button
            onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50  bg-slate-800 text-white shadow-md hover:bg-blue-600 transition drop-shadow-lg animate-bounce"
        >
          <ArrowUpIcon className="w-4 h-4" />
          </Button>
        
        </>
      )}
    </div>
  );
};

export default ScrollToTopWithBorder;
