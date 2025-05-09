"use client";
import pgdmBrochure from "@/assets/footer/footerLinksPdf/PGDM-Brochure-2025-27.pdf";
import AntiRagging from "@/assets/footer/footerLinksPdf/Anti Ragging Committee Squad Grievance Redressal.pdf";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { footerColor } = useTheme();
  // Controls visibility of the "back to top" button
  const [visible, setVisible] = useState(false);

  // Tracks which link is being hovered for underline animation
  const [activeSection, setActiveSection] = useState(null);

  // Controls initial load animations
  const [isLoaded, setIsLoaded] = useState(false);

  // Show back-to-top button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
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

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  // Quick links data with paths
  const quickLinks = [
    { name: "Apply Now", href: "https://admissions.immindia.edu.in/" },
    // { name: "Scholarship Scheme", path: "/scholarship-scheme" },
    // { name: "Scholarship Form", path: "/scholarship-form" },
    { name: "Gallery", path: "/gallery" },
    { name: "Career", path: "/career" },

    { name: "Enquire Now", href: "https://admissions.immindia.edu.in/" },
    {
      name: "Online Fees Payment Atom",
      href: "https://payment.atomtech.in/payment/form/pay.action?mId=A95D13C110F64630E963122D5321258A",
    },
    // { name: "Scholarships", path: "/scholarships" },
    { name: "Contact us", path: "/contact-us" },
    { name: "Blog", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy-policy" },

    { name: "Disclaimer", path: "/disclaimer" },
    { name: "AICTE Approval Letter", path: "/aicte-approval" },
    { name: "Grievance Redressal", href: AntiRagging },
    { name: "PGDM Brochure", href: pgdmBrochure },
    { name: "Feedback", path: "/feedback" },
  ];

  // Split links into columns
  const column1 = quickLinks.slice(0, 7);
  const column2 = quickLinks.slice(7, 13);
  const column3 = quickLinks.slice(13);

  return (
    <footer
      className={`${footerColor} text-white py-12 relative ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: "opacity 0.5s ease-in-out" }}
    >
      <div className="container px-6 sm:px-4 mx-auto sm:max-w-5xl md:max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About */}
          <div
            className={`footer-column ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transition: "all 0.5s ease-in-out 0.1s" }}
          >
            <h3 className="relative mb-4 overflow-hidden text-xl font-bold group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <p className="mb-4 text-pink-100">
              We are committed to providing quality education and opportunities
              for all students.
            </p>
            <div className="flex items-center mt-6 space-x-4">
              {/* Social media icons with hover effects */}

              <a
                href="https://www.instagram.com/imm_india"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:-rotate-12 group"
              >
                <Instagram className="w-6 h-6 text-pink-300 transition-colors duration-300 group-hover:text-pink-500 " />
              </a>
              <a
                href="https://www.linkedin.com/school/institute-of-marketing-and-management/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:-rotate-12 group"
              >
                <Linkedin className="w-6 h-6 text-pink-300 transition-colors duration-300 group-hover:text-pink-500 " />
              </a>
              <a
                href="https://www.youtube.com/channel/UCsFZ4Ove-nEuyZSaBggG3eQ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:rotate-12 group"
              >
                <Youtube className="w-6 h-6 text-pink-300 transition-colors duration-300 group-hover:text-pink-500 " />
              </a>
              <a
                href="https://www.facebook.com/indiaimm"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:rotate-12 group"
              >
                <Facebook className="w-6 h-6 text-pink-300 transition-colors duration-300 group-hover:text-pink-500 " />
              </a>
              <a
                href="https://x.com/imm_bschool"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 overflow-hidden transition-all duration-300 bg-white rounded-full cursor-pointer hover:scale-110 hover:rotate-12 group"
              >
                <RiTwitterXLine className="w-6 h-6 text-pink-300 transition-colors duration-300 group-hover:text-pink-500 " />
              </a>
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
            <h3 className="relative mb-4 overflow-hidden text-xl font-bold group">
              Quick Links
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-2">
              {column1.map((link, index) => (
                <li
                  key={index}
                  className="transition-transform duration-300 transform hover:translate-x-2"
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden text-pink-200 hover:text-white group"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="relative overflow-hidden text-pink-200 hover:text-white group"
                      onMouseEnter={() => setActiveSection(`link-1-${index}`)}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  )}
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
            <h3 className="relative mb-4 overflow-hidden text-xl font-bold group">
              More Links
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-2">
              {column2.map((link, index) => (
                <li
                  key={index}
                  className="transition-transform duration-300 transform hover:translate-x-2"
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden text-pink-200 hover:text-white group"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="relative overflow-hidden text-pink-200 hover:text-white group"
                      onMouseEnter={() => setActiveSection(`link-1-${index}`)}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  )}
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
            <h3 className="relative mb-4 overflow-hidden text-xl font-bold group">
              Resources & Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-300 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="mb-6 space-y-2">
              {column3.map((link, index) => (
                <li
                  key={index}
                  className="transition-transform duration-300 transform hover:translate-x-2"
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden text-pink-200 hover:text-white group"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="relative overflow-hidden text-pink-200 hover:text-white group"
                      onMouseEnter={() => setActiveSection(`link-1-${index}`)}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-3">
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 mt-1 text-pink-300 transition-colors duration-300 group-hover:text-white" />
                <a
                  href="https://maps.app.goo.gl/851pNYsHn7qTqY7i7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-200 transition-colors duration-300 group-hover:text-white"
                >
                  B-11 Qutab Institutional Area,
                  <br />
                  New Delhi - 110016
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="flex flex-col">
                  <span className="flex gap-2">
                    <Phone className="w-5 h-5 mt-1 text-pink-300 transition-colors duration-300 group-hover:text-white" />
                    <a
                      href="tel:011-26520892"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      011-26520892,
                    </a>
                    <a
                      href="tel:011-26520893"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      011-26520893
                    </a>
                  </span>
                  <span className="flex gap-2">
                    <Phone className="w-5 h-5 mt-1 text-pink-300 transition-colors duration-300 group-hover:text-white" />
                    <a
                      href="tel:011-26520894"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      011-26520894,
                    </a>
                    <a
                      href="tel:011-26520895"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      011-26520895
                    </a>
                  </span>
                  <span className="flex gap-2">
                    <Phone className="w-5 h-5 mt-1 text-pink-300 transition-colors duration-300 group-hover:text-white" />
                    <a
                      href="tel:011-26520896"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      011-26520896,
                    </a>
                    <a
                      href="tel:+919999078888"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      +91 99990 78888
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="flex flex-col">
                  <span className="flex gap-2">
                    <Mail className="w-5 h-5 mt-1 text-pink-300 transition-colors duration-300 group-hover:text-white" />
                    <a
                      href="mailto:info@immindia.com"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      info@immindia.com
                    </a>
                  </span>
                  <span className="flex gap-2">
                    <Mail className="w-5 h-5 mt-1 text-pink-300 transition-colors duration-300 group-hover:text-white" />
                    <a
                      href="mailto:registrar.imm@gmail.com"
                      className="text-pink-200 transition-colors duration-300 hover:text-white"
                    >
                      registrar.imm@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter subscription with animation */}
        {/* <div
          className={`mt-12 p-6 bg-pink-900 rounded-lg ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transition: "all 0.5s ease-in-out 0.5s" }}
        >
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-bold">Subscribe to our Newsletter</h4>
              <p className="text-pink-200">
                Stay updated with our latest news and events
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 text-white border border-pink-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-950"
                />
                <button className="px-4 py-2 transition-colors duration-300 transform bg-pink-600 rounded-md hover:bg-pink-500 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Copyright section */}
        <div
          className={`mt-12 pt-6 border-t border-primary-color/50 text-center ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.5s ease-in-out 0.6s" }}
        >
          <p className="text-pink-300">
            &copy; {new Date().getFullYear()} Institute of Marketing and
            Management. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top button with animation */}
      {/* <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-16 p-3 rounded-full bg-pink-600 text-white shadow-lg transform transition-all duration-300 hover:bg-pink-500 hover:scale-110 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button> */}
    </footer>
  );
}
