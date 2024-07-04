import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import './Navbar.css';

const Navbar = () => {
  const { LogoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-heading">
        <h1>MovieMania</h1>
      </div>
      <div className={`navbar-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`navbar-list ${isMenuOpen ? 'open' : ''}`}>
        <li className="navbar-item"><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li className="navbar-item"><Link to="/register" onClick={toggleMenu}>Register</Link></li>
        <li className="navbar-item"><Link to="/login" onClick={toggleMenu}>Login</Link></li>
        <li className="navbar-item"><Link to="/movies" onClick={toggleMenu}>Movies</Link></li>
        <li className="navbar-item"><Link to="/movies-form" onClick={toggleMenu}>Create Your Own</Link></li>
        <li className="navbar-item"><Link to="/my-movies" onClick={toggleMenu}>My Movies</Link></li>
        <li className="navbar-item logout-item">
          <Link to="/login" onClick={() => { toggleMenu(); LogoutUser(); }}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




