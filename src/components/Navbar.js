import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.svg'; // Import the first logo
import AadhaarLogo from './aadhaar_english_logo.svg'; // Import the Aadhaar logo

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const getLinkClass = (linkPath) =>
    `flex items-center justify-center h-full space-x-2 text-sm no-underline transition-all duration-300 ${
      path === linkPath
        ? 'border-b-2 border-white text-white' // Active state: white underline for current page
        : 'text-white hover:border-b-2 hover:border-white' // Hover state: white underline on hover
    }`;

  return (
    <div>
      {/* Container for both logos */}
      <div className="flex items-center justify-between pt-4 pl-4 pr-4 pb-4"> {/* Keep bottom padding consistent */} 
        {/* Original Logo (Left Side) */}
        <img
          src={Logo}
          alt="Logo"
          className="w-49 h-49 pb-1" // Adjust width and height, keep bottom padding
        />

        {/* Aadhaar Logo (Right Side) */}
        <img
          src={AadhaarLogo}
          alt="Aadhaar Logo"
          className="w-13 h-13 ml-auto pb-1" // Adjust width and height, keep bottom padding
        />
      </div>

      {/* Navbar below the logos */}
      <nav
        className="text-white shadow-lg h-10" // Make the navbar thinner by reducing height to h-10
        style={{ background: 'linear-gradient(119.54deg, #1cb5e0 0%, #000046 100%)' }} // Reversed gradient
      >
        <div className="flex justify-between items-center w-full h-full"> {/* Flexbox to align logo left and links right */}
          {/* Left Aligned Logo */}
          <Link
            to="/"
            className="text-1xl font-bold flex items-center space-x-2 no-underline pl-2" // Reduced the size of Sudarshan text
          >
            <span className="text-white drop-shadow-lg">Sudarshan</span>
          </Link>

          {/* Right Aligned Links */}
          <div className="ml-auto space-x-6 flex items-center h-full pr-5"> {/* ml-auto to push the links to the right-most edge */}
            {/* Home */}
            <Link to="/" className={getLinkClass('/')}>
              <span>Home</span> {/* Removed icon */}
            </Link>

            {/* Generate */}
            <Link to="/generate" className={getLinkClass('/generate')}>
              <span>Generate</span> {/* Removed icon */}
            </Link>

            {/* Upload Document */}
            <Link to="/upload" className={getLinkClass('/upload')}>
              <span>Verify</span> {/* Removed icon */}
            </Link>

            {/* Profile */}
            <Link to="/profile" className={getLinkClass('/profile')}>
              <span>Profile</span> {/* Removed icon */}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
