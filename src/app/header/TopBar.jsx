import React from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
const TopBar = () => {
  return (
    <div className="bg-gray-100 px-4 py-2 hidden md:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between text-sm">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Follow us</span>
          <div className="flex gap-3">
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <a href="#" className="flex items-center gap-1 hover:text-red-600">
            <MapPin className="h-4 w-4" />
            <span>B-11, Qutab Institutional Area, New Delhi-110016</span>
          </a>
          <a
            href="mailto:info@immindia.com"
            className="flex items-center gap-1 hover:text-red-600"
          >
            <Mail className="h-4 w-4" />
            <span>info@immindia.com</span>
          </a>
          <a
            href="tel:+919999078888"
            className="flex items-center gap-1 hover:text-red-600"
          >
            <Phone className="h-4 w-4" />
            <span>+91-9999078888</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
