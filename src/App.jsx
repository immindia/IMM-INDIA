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
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/programs/pgdm' element={<Pgdm/>} />
        <Route path='/about/imm-legacy' element={<ImmLegacy/>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
