import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { Outlet, useLocation } from 'react-router-dom';

const PublicLayout = ({ onLoginClick, isLoggedIn, user, role, onLogout }) => {
  const location = useLocation();
  
  // Check if current route is a dashboard
  const isDashboardRoute = location.pathname.includes('dashboard');
  
  return (
    <>
      {!isDashboardRoute && (
        <Navbar 
          onLoginClick={onLoginClick}
          isLoggedIn={isLoggedIn}
          user={user}
          role={role}
          onLogout={onLogout}
        />
      )}
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default PublicLayout;