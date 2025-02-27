"use client";

import { useState, useEffect } from "react";
import {
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  // Controls visibility of the "back to top" button
  const [visible, setVisible] = useState(false);

  // Tracks which link is being hovered for underline animation
  const [activeSection, setActiveSection] = useState(null);

  // Controls initial load animations
  const [isLoaded, setIsLoaded] = useState(false);

  // Show back-to-top button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Trigger entrance animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Quick links data with paths
  const quickLinks = [
    { name: "Apply Now", path: "/apply" },
    { name: "Scholarship Scheme", path: "/scholarship-scheme" },
    { name: "Scholarship Form", path: "/scholarship-form" },
    { name: "Gallery", path: "/gallery" },
    { name: "Career", path: "/career" },

    { name: "Enquire Now", path: "/enquire" },
    { name: "Online Fees Payment Atom", path: "/fees-payment" },
    { name: "Scholarships", path: "/scholarships" },
    { name: "Contact us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    
    { name: "Disclaimer", path: "/disclaimer" },
    { name: "AICTE Approval Letter", path: "/aicte-approval" },
    { name: "Grievance Redressal", path: "/grievance" },
    { name: "PGDM Brochure", path: "/pgdm-brochure" },
    { name: "Feedback", path: "/feedback" },
  ];

  // Split links into columns
  const column1 = quickLinks.slice(0, 5);
  const column2 = quickLinks.slice(5, 10);
  const column3 = quickLinks.slice(10);

  return (
    <footer
      className={`bg-pink-950 text-white py-12 relative ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.5s ease-in-out" }}
    >
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div
            className={`footer-column ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transition: "all 0.5s ease-in-out 0.1s" }}
          >
            <h3 className="text-xl font-bold mb-4 relative overflow-hidden group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <p className="text-pink-100 mb-4">
              We are committed to providing quality education and opportunities
              for all students.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              {/* Social media icons with hover effects */}
              <span className="cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden group bg-white rounded-full p-2">
                <Facebook className="w-6 h-6 text-pink-300 group-hover:text-pink-500 transition-colors duration-300 " />
              </span>
              <span className="cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden group bg-white rounded-full p-2">
                <Instagram className="w-6 h-6 text-pink-300 group-hover:text-pink-500 transition-colors duration-300 " />
              </span>
              <span className="cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden group bg-white rounded-full p-2">
                <Twitter className="w-6 h-6 text-pink-300 group-hover:text-pink-500 transition-colors duration-300 " />
              </span>
              <span className="cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden group bg-white rounded-full p-2">
                <Linkedin className="w-6 h-6 text-pink-300 group-hover:text-pink-500 transition-colors duration-300 " />
              </span>
              <span className="cursor-pointer hover:scale-110 transition-all duration-300 overflow-hidden group bg-white rounded-full p-2">
                <Youtube className="w-6 h-6 text-pink-300 group-hover:text-pink-500 transition-colors duration-300 " />
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (First Part) */}
          <div
            className={`footer-column ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transition: "all 0.5s ease-in-out 0.2s" }}
          >
            <h3 className="text-xl font-bold mb-4 relative overflow-hidden group">
              Quick Links
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-2">
              {column1.map((link, index) => (
                <li
                  key={index}
                  className="transform hover:translate-x-2 transition-transform duration-300"
                >
                  <Link
                    to={link.path}
                    className="text-pink-200 hover:text-white relative overflow-hidden group"
                    onMouseEnter={() => setActiveSection(`link-1-${index}`)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300 ${
                        activeSection === `link-1-${index}` ? "w-full" : "w-0"
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (Second Part) */}
          <div
            className={`footer-column ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transition: "all 0.5s ease-in-out 0.3s" }}
          >
            <h3 className="text-xl font-bold mb-4 relative overflow-hidden group">
              More Links
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-2">
              {column2.map((link, index) => (
                <li
                  key={index}
                  className="transform hover:translate-x-2 transition-transform duration-300"
                >
                  <Link
                    to={link.path}
                    className="text-pink-200 hover:text-white relative overflow-hidden group"
                    onMouseEnter={() => setActiveSection(`link-2-${index}`)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300 ${
                        activeSection === `link-2-${index}` ? "w-full" : "w-0"
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links (Third Part) & Contact */}
          <div
            className={`footer-column ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transition: "all 0.5s ease-in-out 0.4s" }}
          >
            <h3 className="text-xl font-bold mb-4 relative overflow-hidden group">
              Resources & Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-2 mb-6">
              {column3.map((link, index) => (
                <li
                  key={index}
                  className="transform hover:translate-x-2 transition-transform duration-300"
                >
                  <Link
                    to={link.path}
                    className="text-pink-200 hover:text-white relative overflow-hidden group"
                    onMouseEnter={() => setActiveSection(`link-3-${index}`)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300 ${
                        activeSection === `link-3-${index}` ? "w-full" : "w-0"
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-pink-300 group-hover:text-white transition-colors duration-300" />
                <span className="text-pink-200 group-hover:text-white transition-colors duration-300">
                  +1 (123) 456-7890
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-pink-300 group-hover:text-white transition-colors duration-300" />
                <span className="text-pink-200 group-hover:text-white transition-colors duration-300">
                  contact@example.com
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-pink-300 group-hover:text-white transition-colors duration-300 mt-1" />
                <span className="text-pink-200 group-hover:text-white transition-colors duration-300">
                  123 Education Street, Learning City, ED 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter subscription with animation */}
        <div
          className={`mt-12 p-6 bg-pink-900 rounded-lg ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transition: "all 0.5s ease-in-out 0.5s" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-bold">Subscribe to our Newsletter</h4>
              <p className="text-pink-200">
                Stay updated with our latest news and events
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-950 border border-pink-800 text-white"
                />
                <button className="px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-md transition-colors duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div
          className={`mt-12 pt-6 border-t border-pink-800 text-center ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.5s ease-in-out 0.6s" }}
        >
          <p className="text-pink-300">
            &copy; {new Date().getFullYear()} IIM Institute of Marketing Management. All
            rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top button with animation */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-16 p-3 rounded-full bg-pink-600 text-white shadow-lg transform transition-all duration-300 hover:bg-pink-500 hover:scale-110 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
