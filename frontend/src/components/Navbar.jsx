import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, user, role, onLoginClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Services', id: 'services' },
    { name: 'Pricing', id: 'bundles' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
    { name: 'Team', id: 'team' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <motion.img
              src="../../logo.png"
              alt="Click2Biz Logo"
              className="w-10 h-10 lg:w-10 lg:h-10 md:w-8 md:h-8 rounded-lg object-contain"
              whileHover={{ rotate: 10 }}
            />
            <span className="text-xl lg:text-xl md:text-lg font-bold text-white">Click2Biz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex overflow-x-auto scrollbar-hide space-x-1 lg:space-x-2 mr-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`whitespace-nowrap px-2 py-1 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
                    scrolled ? 'text-gray-50 hover:bg-gray-100 hover:text-[#FF6B00]' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {role === 'client' && (
                  <button
                    onClick={() => navigate('/client-dashboard')}
                    className="px-3 py-2 cursor-pointer bg-[#312E81] hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Dashboard
                  </button>
                )}
                {role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin-dashboard')}
                    className="px-3 py-2 bg-[#312E81] hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Admin Panel
                  </button>
                )}

                {/* User dropdown */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#312E81] font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className={`text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}>{user?.name}</span>
                  </button>
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <FiLogOut className="mr-2" size={14} /> Logout
                        </button>
                      </div>
                      <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200 z-40" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onLoginClick}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    scrolled ? 'text-[#312E81] hover:bg-indigo-50' : 'text-white cursor-pointer hover:bg-white/10'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={onLoginClick}
                  className="px-3 py-2 bg-[#312E81] hover:bg-indigo-700 text-white cursor-pointer text-sm font-medium rounded-md transition-colors"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/admin-invite-register')}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Admin Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-white hover:bg-indigo-900/30 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-gray-900 shadow-lg absolute top-full left-0 right-0 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 text-sm font-medium text-white hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                {isLoggedIn ? (
                  <>
                    {/* User Info Section - Fixed for visibility */}
                    <div className="flex items-center px-4 py-3 mb-2 border-b border-gray-700 bg-gray-800 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#312E81] font-bold text-lg mr-3">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-white font-medium text-base">{user?.name || 'User'}</p>
                        <p className="text-indigo-300 text-xs mt-1">
                          {role === 'admin' ? 'Administrator' : 'Client Account'}
                        </p>
                      </div>
                    </div>

                    {role === 'client' && (
                      <button
                        onClick={() => { navigate('/client-dashboard'); setIsMenuOpen(false); }}
                        className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors mb-2 flex items-center justify-center"
                      >
                        <FiUser className="mr-2" /> My Dashboard
                      </button>
                    )}
                    {role === 'admin' && (
                      <button
                        onClick={() => { navigate('/admin-dashboard'); setIsMenuOpen(false); }}
                        className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors mb-2 flex items-center justify-center"
                      >
                        <FiUser className="mr-2" /> Admin Panel
                      </button>
                    )}
                    <button
                      onClick={() => { onLogout(); setIsMenuOpen(false); }}
                      className="w-full px-4 py-3 flex items-center justify-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                      <FiLogOut className="mr-2" /> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                      className="px-4 py-2 text-[#312E81] text-sm font-medium border border-[#312E81] rounded-md hover:bg-indigo-50 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                      className="px-4 py-2 bg-[#312E81] text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
