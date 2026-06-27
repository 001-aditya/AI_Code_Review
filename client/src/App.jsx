import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Ide from "./pages/Ide";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen text-white bg-black flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ide" element={<Ide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
