// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import PublicLayout from './components/PublicLayout';
import AuthModal from './components/AuthModal';
import InviteRegister from './components/pages/InviteRegister';
import Hero from './components/Hero';
import Services from './components/Services';
import Bundles from './components/Bundles';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import ErrorBoundary from './components/ErrorBoundary';
import ClientDashboard from './components/pages/ClientDasboard.jsx';
import AdminDashboard from './components/pages/AdminDashboard.jsx';
import AdminInvites from './components/pages/AdminInvites';

function PrivateRoute({ children, requiredRole }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated, logout, login } = useAuth();

  const handleLogin = (userData) => {
    // Assuming userData contains both user info and token
    // You may need to adjust this based on your API response structure
    login(userData, userData.token);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {showLoginModal && (
        <AuthModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      <Routes>
        {/** Public pages with Navbar/Footer **/}
        <Route
          element={
            <PublicLayout
              isLoggedIn={isAuthenticated}
              user={user}
              role={user?.role}
              onLoginClick={() => setShowLoginModal(true)}
              onLogout={handleLogout}
            />
          }
        >
          <Route
            path="/"
            element={
              <div className="font-sans">
                <Hero />
                <Services />
                <Bundles title="Digital" />
                <hr />
                <Bundles title="Social Media" />
                <hr />
                <Bundles title="Maintenance" />
                <Portfolio />
                <Testimonials />
                <WhyChooseUs />
                <Contact />
                <AboutUs />
              </div>
            }
          />
        </Route>

        {/** Client dashboard, only for clients **/}
        <Route
          path="/client-dashboard"
          element={
            <PrivateRoute requiredRole="client">
              <ErrorBoundary>
      <ClientDashboard />
    </ErrorBoundary>
            </PrivateRoute>
          }
        />

        {/** Admin area **/}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/invites"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminInvites />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-invite-register"
          element={<InviteRegister />}
        />

        {/** Fallback **/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    
      <AuthProvider>
        <AppContent />
      </AuthProvider>
   
  );
}

export default App;