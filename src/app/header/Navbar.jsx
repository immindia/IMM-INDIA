// import logo from "../../assets/logo.png";
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/Imm-55-Years.svg";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import { navlinks } from "./navData";
import { useState } from "react";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full">
      {/* Main Navigation */}
      <nav className="bg-primary-color">
        <div className="flex flex-wrap items-center justify-between px-4 py-3 mx-auto md:px-16">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link to="/">
            <img
              src={logo}
              alt="Indo Global Group of Colleges"
              className="w-auto h-16"
            />
            </Link>
            <img
              src={logo2}
              alt="Indo Global Group of Colleges"
              className="w-auto h-16"
            />
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navlinks.map((item, index) => (
                <DropdownItem key={index} item={item} />
              ))}
            </ul>
          </div>

          <Drawer />
        </div>
      </nav>
    </header>
  );
}

function DropdownItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {!item.submenu ? (
        <Link
        to={item.path}
        className="text-sm font-medium text-white hover:text-gray-200"
      >
        {item.name}
      </Link>
      ) : (
        <button
          className="text-sm font-medium text-white hover:text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {item.name}
        </button>
      )}

      {/* Dropdown Menu */}
      {item.submenu && isOpen && (
        <>
          {/* This div creates an invisible bridge between parent and dropdown */}
          <div className="absolute w-full h-2 -bottom-2"></div>
          <ul
            className="absolute left-0 top-full p-1 mt-2 overflow-hidden bg-white rounded shadow-lg z-[9999]  min-w-[150px] w-max"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {item.submenu.map((subItem, subIndex) => (
              <li key={subIndex} onClick={() => setIsOpen(false)}>
                <Link
                  to={subItem.path}
                  className="block px-4 py-2 text-sm text-gray-700 rounded-sm hover:bg-gray-200"
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
}
