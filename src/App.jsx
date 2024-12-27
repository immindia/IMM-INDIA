import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Header from "./app/header/Header";
import Footer from "./app/footer/Footer";
import Landing from "./app/LandingPage/Landing";
import Contact from "./app/contact/Contact";
import Pgdm from "./app/programs/Pgdm";
import ImmLegacy from "./app/about/ImmLegacy";
import Leadership from "./app/about/Leadership";
import AdvisoryBoard from "./app/about/AdvisoryBoard";
import AffiliationAwards from "./app/about/AffiliationAwards";
import Faculty from "./app/facultyAndResearch/Faculty";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Landing */}
        <Route path='/' element={<Landing/>} />

        {/* About us */}  
        <Route path='/about/imm-legacy' element={<ImmLegacy/>} />
        <Route path='/about/leadership' element={<Leadership/>} />
        <Route path='/about/advisory-board' element={<AdvisoryBoard/>} />
        <Route path='/about/accreditations-awards' element={<AffiliationAwards/>} />

        {/* Programs */}
        <Route path='/programs/pgdm' element={<Pgdm/>} />

        {/* Faculty and Research */}
        <Route path='/faculty-and-research/faculty' element={<Faculty/>} />

        {/* Contact */}
        <Route path='/contact' element={<Contact/>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
