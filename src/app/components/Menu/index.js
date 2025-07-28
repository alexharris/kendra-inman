'use client';
import { useState } from 'react';
import './Menu.scss';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button
        className={`menu-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        Menu
      </button>

      {/* Full Screen Menu Overlay */}
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        {/* Close X Button */}
        <button
          className="close-button"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        
        <nav className="menu-nav">
          <ul className="menu-list">
            <li className="menu-item">
              <a href="/" className="menu-link" onClick={toggleMenu}>
                Home
              </a>
            </li>
            <li className="menu-item">
              <a href="/work" className="menu-link" onClick={toggleMenu}>
                Work
              </a>
            </li>
            <li className="menu-item">
              <a href="/work/project" className="menu-link" onClick={toggleMenu}>
                Project
              </a>
            </li>
            <li className="menu-item">
              <a href="/connect" className="menu-link" onClick={toggleMenu}>
                Connect
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
