/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PulsatingButton from "@/components/ui/pulsating-button";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  QrCode,
  CreditCard,
} from "lucide-react";
import { RiTwitterXLine } from "react-icons/ri";
import img from "../../assets/header/QR-img.webp";
const TopBar = () => {
  const [iconsLoaded, setIconsLoaded] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isPayFeeOpen, setIsPayFeeOpen] = useState(false);

  useEffect(() => {
    // Animate icons one by one with a delay
    iconsLoaded.forEach((_, index) => {
      setTimeout(() => {
        setIconsLoaded((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 150); // 150ms delay between each icon
    });
  }, []);

  // Close payment dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isPayFeeOpen) setIsPayFeeOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPayFeeOpen]);

  const socialIcons = [
    {
      icon: <Instagram className="w-4 h-4" />,
      url: "https://www.instagram.com/imm_india/",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      url: "https://www.linkedin.com/school/institute-of-marketing-and-management/?originalSubdomain=in",
    },
    { icon: <Youtube className="w-4 h-4" />, url: "https://bit.ly/IMM-YT" },
    {
      icon: <Facebook className="w-4 h-4" />,
      url: "https://www.facebook.com/indiaimm",
    },
    {
      icon: <RiTwitterXLine className="w-4 h-4" />,
      url: "https://x.com/imm_bschool",
    },
  ];

  const paymentOptions = [
    {
      name: "Payfee by Atom",
      url: "https://payment.atomtech.in/payment/form/pay.action?mId=A95D13C110F64630E963122D5321258A",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      name: "QR Code",
      url: img, // Replace with actual QR code link or modal trigger
      icon: <QrCode className="w-4 h-4" />,
    },
  ];

  return (
    <div className="hidden px-4 py-3 bg-gray-100 md:px-16 md:block">
      <div className="flex flex-wrap items-center justify-between mx-auto text-sm">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Follow us</span>
          <div className="flex gap-3">
            {socialIcons.map((item, index) => (
              <motion.a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-red-600 bg-gray-800 hover:bg-gray-200 rounded-full p-2 transition-all duration-300 ease-in-out hover:rotate-12 hover:scale-110"
                initial={{ y: -50, opacity: 0 }}
                animate={
                  iconsLoaded[index]
                    ? { y: 0, opacity: 1 }
                    : { y: -50, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>          

        {/* <div className="flex items-center gap-10" > */}
          {/* Marquee */}
          <div className="text-pink-700 justify-center items-center bg-slate-50 p-3 gap-2 rounded-full border shadow-sm flex max-w-xl overflow-hidden">
            <div className="h-2 w-2 bg-pink-900 rounded-full animate-ping"></div>
            <marquee className="font-bold" behavior="scroll" direction="left">
             Phase 3 Applications Closed for PGDM 2025-2027
            </marquee>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            {/* <PulsatingButton
            size="sm"
            className="text-xs bg-black hover:bg-black/80"
            pulseColor="#000"
          >
            International Conference
          </PulsatingButton> */}
            <a
              href="https://admissions.immindia.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PulsatingButton
                size="sm"
                className="text-xs bg-black hover:bg-black/80"
                pulseColor="#000"
              >
                Apply Now
              </PulsatingButton>
            </a>

            {/* Pay Fee Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPayFeeOpen(!isPayFeeOpen);
                }}
                className="relative"
              >
                <PulsatingButton
                  size="sm"
                  className="text-xs bg-black hover:bg-black/80"
                  pulseColor="#000"
                >
                  Pay Fee
                </PulsatingButton>
              </button>

              {isPayFeeOpen && (
                <>
                  {/* Invisible bridge between button and dropdown */}
                  <div className="absolute w-full h-2 -bottom-2"></div>
                  <ul
                    className="absolute right-0 top-full p-1 mt-2 overflow-hidden bg-white rounded shadow-lg z-[9999] min-w-[150px] w-max
                             animate-fadeIn transform origin-top-right"
                  >
                    {paymentOptions.map((option, index) => (
                      <li key={index} onClick={() => setIsPayFeeOpen(false)}>
                        <a
                          href={option.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 block px-4 py-2 text-sm text-gray-700 rounded-sm transition-all duration-200
                                 hover:bg-gray-200 hover:pl-6 hover:text-primary-color"
                        >
                          {option.icon}
                          {option.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* <Link to="/blog">
          <PulsatingButton
            size="sm"
            className="text-xs bg-black hover:bg-black/80"
            pulseColor="#000"
          >
           Blogs
          </PulsatingButton>
          </Link> */}
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default TopBar;
