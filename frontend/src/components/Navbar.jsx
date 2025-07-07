// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = ({ isLoggedIn, user, onLoginClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Services", id: "services" },
    { name: "Pricing", id: "bundles" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
       
          <div className="flex items-center">
            <div className="bg-[#312E81] w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
              C2B
            </div>
            <span className="text-xl font-bold text-white">Click2Biz</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button

                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`cursor-pointer  font-medium hover:text-[#FF6B00] transition-colors ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </button>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#312E81] mr-2">
                    <FiUser />
                  </div>
                  <span className="text-gray-700 font-medium">{user?.name || 'Account'}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="cursor-pointer flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={onLoginClick}
                  className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors ${
                    scrolled 
                      ? 'text-indigo-600 hover:bg-indigo-50' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={onLoginClick}
                  className=" cursor-pointer bg-[#312E81] hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <button
            className={`md:hidden text-2xl ${scrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-6 py-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-3 px-4 font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                {link.name}
              </button>
            ))}
            
            <div className="mt-4 pt-4 border-t">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                      <FiUser />
                    </div>
                    <span className="font-medium">{user?.name || 'Account'}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                  >
                    <FiLogOut className="mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 text-indigo-600 font-medium border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;