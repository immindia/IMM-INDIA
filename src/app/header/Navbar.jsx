import logo from "../../assets/logo.png";
export default function Header() {
  const menuItems = [
    "Home",
    "About Us",
    "Programs",
    "Events",
    "Admissions & Placements",
    "Industry Exposure",
    "Contact Us"
  ]

  return (
    <header className="w-full">
      

      {/* Main Navigation */}
      <nav className="bg-pink-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Indo Global Group of Colleges"
              className="h-12 w-auto"
            />
            {/* <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
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
          <button className="rounded p-2 text-white hover:bg-red-700 lg:hidden">
            <svg
              className="h-6 w-6"
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
  )
}

