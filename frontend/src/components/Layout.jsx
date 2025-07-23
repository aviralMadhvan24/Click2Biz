const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 pt-24">
      {children}
    </div>
  );
};

export default Layout;
