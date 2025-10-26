import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../stylesheets/navbar.css';

const Navbar = () => {
  return (
    <nav>
      <p className='home-title'>DISCOVER</p>
      <ul>
        <li>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/overview" className="nav-link">Overview</Link>
        </li>
        <li>
          <Link to="/hotspots" className="nav-link">Hotspots</Link>
        </li><li>
          <Link to="/" className="nav-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
