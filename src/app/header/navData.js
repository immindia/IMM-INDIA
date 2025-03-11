export const navlinks = [
  { name: "Home", path: "/" },
  {
    name: "About Us",
    path: "/",
    submenu: [
      { name: "IMM Legacy", path: "/about/imm-legacy" },
      { name: "Leadership", path: "/about/leadership" },
      { name: "Advisory Board", path: "/about/advisory-board" },
      { name: "Accreditations & Awards", path: "/about/accreditations-awards" },
    ],
  },
  {
    name: "Programs",
    path: "/programs",
    submenu: [
      { name: "PGDM", path: "/programs/pgdm" },
      { name: "BBA", path: "/programs/bba" },
    ],
  },
  { name: "Admissions", path: "/admissions" },
  {
    name: "Corporate Connect",
    path: "/",
    submenu: [
      {
        name: "Industry Lectures & Webinars",
        path: "/corporate-connect/industry-lectures-and-webinars",
      },
      { name: "Industry Visits", path: "/corporate-connect/industry-visit" },
      { name: "Corporate Events", path: "/corporate-connect/corporate-events" },
    ],
  },
  {
    name: "Faculty & Research",
    path: "/",
    submenu: [
      { name: "Faculty", path: "/faculty-and-research/faculty" },
      { name: "Research", path: "/faculty-and-research/research" },
    ],
  },
  {
    name: "Life at IMM",
    path: "/",
    submenu: [
      {
        name: "Events & Activities",
        path: "/life-at-iim/events-and-activities",
      },
      { name: "Clubs at IMM", path: "/life-at-iim/clubs-at-imm" },
      // { name: "Life at IMM", path: "/life-at-iim/life-at-imm" },
    ],
  },
  {
    name: "Placements",
    path: "/",
    submenu: [
      { name: "Campus Recruitment", path: "/placements/campus-recruitment" },
      // { name: "Past Recruiters", path: "/placements/past-recruiters" },
      { name: "Placement Records", path: "/placements/placement-records" },
    ],
  },

  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact-us" },
];
