import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import img from "../assets/breadcrumb.png";

const AboutSidebar = ({ sidebarLinks, className }) => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector(".sidebar");
      const container = document.querySelector(".container");
      if (sidebar && container) {
        const containerRect = container.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (
          containerRect.bottom > windowHeight &&
          sidebarRect.height < windowHeight
        ) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sidebar col-span-1 hidden md:block  pt-12  ${
        isSticky ? "md:sticky md:top-4" : ""
      }`}
    >
      <div className={`flex flex-col h-full p-6 ${className} border-gray-200 rounded-xl`}>
        <h2 className="mb-4 text-xl font-bold text-white">On this page</h2>
        <nav className="mb-6 space-y-2">
          {sidebarLinks.map((link) => (
            // <Link
            //   key={link.href}
            //   to={link.href}
            //   className="block px-4 py-2 text-sm font-medium transition-all duration-200 rounded text-slate-300 hover:pl-6 hover:text-primary-color hover:bg-gray-100 hover:font-medium"
            // >
            //   {link.label}
            // </Link>
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm font-medium transition-all duration-200 rounded text-slate-300 hover:pl-6 hover:text-primary-color hover:bg-gray-100 hover:font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link to="/contact-us">
          <Button className="w-full px-4 py-2 mb-6 font-bold text-white rounded bg-primary-color hover:bg-pink-900">
            Apply Online
          </Button>
        </Link>
        <div className="relative flex-grow h-56 overflow-hidden rounded-md">
          <img
            src={img}
            alt="cta"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
            <p className="mb-3 text-xl font-semibold text-center max-w-40">
              Build Your Career
            </p>
            <Link to="/contact-us">
              <Button
                variant="outline"
                className="text-white transition-colors bg-transparent border-white hover:bg-white hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSidebar;
