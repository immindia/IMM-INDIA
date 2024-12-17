import Landing from "./app/LandingPage/Landing";
import Footer from "./app/footer/Footer";
import Header from "./app/header/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing/>} />
       
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
