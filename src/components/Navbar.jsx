import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import LogoutModal from './LogoutModal';
import { logout } from '../utils/logout';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const name = storedUser.name || storedUser.firstName || '';
    setFirstName(name.split(' ')[0] || 'Member');
  }, []);

  return (
    <>
      <header className="w-full z-50 bg-black/70 backdrop-blur-md shadow-lg fixed top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center font-playfair">
          {/* Logo */}
          <Link to="/admin" className="text-gold text-2xl font-bold tracking-wide">
            Elite Women ✨
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-white text-lg">
            <Link to="/admin" className="hover:text-gold transition">Dashboard</Link>
            <Link to="/members" className="hover:text-gold transition">Members</Link>
            <Link to="/events" className="hover:text-gold transition">Events</Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:text-gold transition"
              >
                Hi, {firstName} <FiChevronDown />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-white/10 shadow-xl rounded-xl z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-white/10 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-white/10 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setShowLogout(true);
                    }}
                    className="w-full text-left px-4 py-2 text-rose-200 hover:bg-white/10 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-black text-white px-6 py-4 space-y-3">
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block hover:text-gold">Dashboard</Link>
            <Link to="/members" onClick={() => setIsOpen(false)} className="block hover:text-gold">Members</Link>
            <Link to="/events" onClick={() => setIsOpen(false)} className="block hover:text-gold">Events</Link>
            <Link to="/profile" onClick={() => setIsOpen(false)} className="block hover:text-gold">My Profile</Link>
            <Link to="/settings" onClick={() => setIsOpen(false)} className="block hover:text-gold">Settings</Link>
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogout(true);
              }}
              className="block text-rose-200 hover:text-white w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={logout}
      />
    </>
  );
};

export default Navbar;
