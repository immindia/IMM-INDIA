import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navlinks } from "./navData";

const Drawer = () => {
  const CollapsibleNavItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className={`flex items-center justify-between w-full py-2 px-4 font-semibold text-slate-200 tracking-wider 
                    hover:bg-white/10 rounded transition-all duration-300 ${
                      isHovered ? "pl-6" : ""
                    }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.name}
          {isOpen ? (
            <ChevronDown className="h-4 w-4 transition-transform duration-300" />
          ) : (
            <ChevronRight className="h-4 w-4 transition-transform duration-300" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="animate-fadeIn">
          <ul className="pl-4 space-y-1">
            {item.submenu.map((subItem, subIndex) => (
              <li
                key={subIndex}
                className="transition-transform duration-300 hover:translate-x-2"
              >
                <SheetClose asChild>
                  <Link
                    to={subItem.path}
                    className="block py-2 px-4 w-fit text-sm text-slate-200 hover:bg-white/10 hover:text-white rounded transition-all duration-300"
                  >
                    {subItem.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden block">
        <button className="p-2 text-white rounded hover:bg-pink-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 active:scale-95 transform">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="bg-pink-800 overflow-auto border-none shadow-lg z-[99999]">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl font-bold text-left">
            IMM India
          </SheetTitle>
          <SheetDescription className="text-white text-left pt-5">
            <nav>
              <ul className="space-y-1">
                {navlinks.map((item, index) => (
                  <li
                    key={index}
                    className="transform transition-transform duration-300 origin-left hover:scale-105"
                  >
                    {item.submenu ? (
                      <CollapsibleNavItem item={item} />
                    ) : (
                      <SheetClose asChild>
                        <Link
                          to={item.path}
                          className="relative block py-2 px-4 w-fit font-semibold text-slate-200 tracking-wider hover:bg-white/10 
                                  hover:text-white rounded transition-all duration-300 hover:translate-x-1
                                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white 
                                  after:left-4 after:bottom-1 after:transition-all after:duration-300
                                  hover:after:w-[calc(100%-2rem)]"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

// CollapsibleNavItem.propTypes = {
//   item: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     submenu: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         path: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default Drawer;
