import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

import Header from "./app/header/Header";
import Footer from "./app/footer/Footer";
import Landing from "./app/LandingPage/Landing";
import Pgdm from "./app/programs/Pgdm";
import BBAProgram from "./app/programs/BBAProgram";
import ImmLegacy from "./app/about/ImmLegacy";
import Leadership from "./app/about/Leadership";
import AdvisoryBoard from "./app/about/AdvisoryBoard";
import AffiliationAwards from "./app/about/AffiliationAwards";
import OurPartnersDetail from "./app/about/OurPartnersDetail";
import Faculty from "./app/facultyAndResearch/Faculty";
import Admissions from "./app/admissions/Admissions";
import IndustryVisit from "./app/corporateConnect/IndustryVisit";
import IndustryLecturesAndWebinars from "./app/corporateConnect/IndustryLecturesAndWebinars";
import CorporateEvents from "./app/corporateConnect/CorporateEvents";
import EventsAndActivities from "./app/lifeAtIMM/EventsAndActivities";
import ClubsAtIMM from "./app/lifeAtIMM/ClubsAtIMM";
import LifeAtIMM from "./app/lifeAtIMM/LifeAtIMM";
import CampusRecruitment from "./app/placements/CampusRecruitment";
import PlacementRecords from "./app/placements/PlacementRecords";
import DazzlingDivas from "./app/alumni/AluminiDirectory";
import Blog from "./app/blog/Blog";
import BlogDetails from "./app/blog/BlogDetails";
import Contact from "./app/contact/Contact";
import Research from "./app/facultyAndResearch/Research";
// Footer Components
import Gallery from "./app/footerLinkComponents/Gallery";
import PolicyPrivacy from "./app/footerLinkComponents/PolicyPrivacy";
import Disclaimer from "./app/footerLinkComponents/Disclaimer";
import AICTE from "./app/footerLinkComponents/AICTE";
import Career from "./app/footerLinkComponents/career/Career";
import CareerDetail from "./app/footerLinkComponents/career/CareerDetails";
import Feedback from "./app/footerLinkComponents/Feedback";

// Scroll to top on route change
function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Add ScrollToTop component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed animate-bounce z-[9999] bg-pink-700 hover:bg-pink-600 text-white bottom-16 right-6 h-9 w-9 rounded-full shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTopOnMount />
        <ScrollToTop />
        <Header />
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Landing />} />

          {/* About us */}
          <Route path="/about/imm-legacy" element={<ImmLegacy />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/advisory-board" element={<AdvisoryBoard />} />
          <Route path="/about/imm-partners" element={<OurPartnersDetail />} />
          <Route
            path="/about/accreditations-awards"
            element={<AffiliationAwards />}
          />

          {/* Programs */}
          <Route path="/programs/pgdm" element={<Pgdm />} />
          <Route path="/programs/bba" element={<BBAProgram />} />

          {/* Faculty and Research */}
          <Route path="/faculty-and-research/faculty" element={<Faculty />} />
          <Route path="/faculty-and-research/research" element={<Research />} />

          {/* Admissions */}
          <Route path="/admissions" element={<Admissions />} />

          {/* Corporate Connect */}
          <Route
            path="/corporate-connect/industry-visit"
            element={<IndustryVisit />}
          />
          <Route
            path="/corporate-connect/industry-lectures-and-webinars"
            element={<IndustryLecturesAndWebinars />}
          />
          <Route
            path="/corporate-connect/corporate-events"
            element={<CorporateEvents />}
          />

          {/*Life at IMM*/}
          <Route
            path="/life-at-imm/events-and-activities"
            element={<EventsAndActivities />}
          />
          <Route path="/life-at-imm/clubs-at-imm" element={<ClubsAtIMM />} />
          <Route path="/life-at-imm/life-at-imm" element={<LifeAtIMM />} />

          {/* Placements */}
          <Route
            path="/placements/campus-recruitment"
            element={<CampusRecruitment />}
          />
          <Route
            path="/placements/placement-records"
            element={<PlacementRecords />}
          />

          {/* Alumni */}
          <Route
            path="/alumni/dazzling-divas"
            element={<DazzlingDivas />}
          />
          {/* <Route path="/alumni/hall-of-fame" element={<HallOfFame />} />
          <Route path="/alumni/alumni-connect" element={<AlumniConnect />} /> */}

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          {/* Contact */}
          <Route path="/contact-us" element={<Contact />} />

          {/* Footer Components */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy-policy" element={<PolicyPrivacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/aicte-approval" element={<AICTE />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career/:job-opening" element={<CareerDetail />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>

        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
