// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './Layout.css'; // Import the CSS file

const Layout = ({ children }) => {
  const location = useLocation();
  const excludeNavbarPaths = ['/register', '/login','/reset-password'];

  return (
    <div className="layout-container"> {/* Apply the layout container class */}
      {!excludeNavbarPaths.includes(location.pathname) && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;

