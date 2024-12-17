// import logo from "../../assets/logo.png";
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/Imm-55-Years.svg";
export default function Header() {
  const menuItems = [
    "Home",
    "About Us",

    "Events",
    "Admissions",
    "Corporate Connect",
    "Faculty & Research",
    "Life at IMM",
    "Placements",
    "Contact Us",
  ];

  return (
    <header className="w-full">
      {/* Main Navigation */}
      <nav className="bg-pink-950">
        <div className="flex flex-wrap items-center justify-between px-4 py-3 mx-auto md:px-16">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Indo Global Group of Colleges"
              className="w-auto h-16"
            />
            <img
              src={logo2}
              alt="Indo Global Group of Colleges"
              className="w-auto h-16"
            />

            {/* <div className="flex items-center justify-center w-12 h-12 p-2 bg-white rounded-full">
              <span className="text-center text-xs font-bold leading-tight text-[#D92126]">
                22+ Years of Excellence
              </span>
            </div> */}
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm font-medium text-white hover:text-gray-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button className="p-2 text-white rounded hover:bg-red-700 lg:hidden">
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
        </div>
      </nav>
    </header>
  );
}
