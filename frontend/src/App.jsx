
// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Bundles from './components/Bundles';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AuthModal from './components/AuthModal';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing token on initial load
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    
    if (token) {
      setIsLoggedIn(true);
      setUser({ name, email });
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="font-sans">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      
      {showLoginModal && (
        <AuthModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
        />
      )}
      
      <Hero />
      <Services />
      <Bundles title ="Digital"/>
      <hr />
      <Bundles title="Social Media" />
      <Portfolio />
      <Testimonials />
      <WhyChooseUs />
      <Contact />
      <AboutUs />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;