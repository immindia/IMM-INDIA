import PulsatingButton from "@/components/ui/pulsating-button";


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
    <div className="hidden px-4 py-3 bg-gray-100 md:px-16 md:block">
      <div className="flex flex-wrap items-center justify-between mx-auto text-sm">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Follow us</span>
          <div className="flex gap-3">
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-600 hover:text-red-600">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <PulsatingButton size="sm" className="text-xs bg-black hover:bg-black/80" pulseColor="#000">
            International Conference
          </PulsatingButton>
          <PulsatingButton size="sm" className="text-xs bg-black hover:bg-black/80" pulseColor="#000">
            Apply Now
          </PulsatingButton>
            <PulsatingButton size="sm" className="text-xs bg-black hover:bg-black/80" pulseColor="#000">
            Student Says
          </PulsatingButton>
          <PulsatingButton size="sm" className="text-xs bg-black hover:bg-black/80" pulseColor="#000">
            Pay Fee
          </PulsatingButton>
         
        </div>
      </div>
    </div>
  );
};

export default TopBar;
