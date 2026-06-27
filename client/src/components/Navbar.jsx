import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-700/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-md">
              <Code2 className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              CodeReview<span className="text-white/60">AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</Link>
            <Link
                to="/ide"
                className="bg-white text-black text-sm font-bold py-2 px-6 rounded-lg hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                IDE
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/70 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-white/70 hover:text-white py-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-white/70 hover:text-white py-2"
          >
            About
          </Link>
          <Link
              to="/ide"
              onClick={() => setIsOpen(false)}
              className="block bg-white text-black text-center font-bold py-2.5 rounded-lg"
            >
              IDE
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
