// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

import AdminDashboard from './components/Admin-dashboard';


function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setUser({ name, email });
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setRole(userData.role);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    setRole(null);
  };

  return (
    <BrowserRouter>
      <Navbar 
        isLoggedIn={isLoggedIn}
        user={user}
        role={role}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      {showLoginModal && (
        <AuthModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      <Routes>
        {/* Public Home */}
        <Route path="/" element={
          <div className="font-sans">
            <Hero />
            <Services />
            <Bundles title="Digital" />
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
        } />

        {/* Client Dashboard */}
       

        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
