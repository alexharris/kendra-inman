'use client';
import { useState } from 'react';
import './Menu.scss';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-4 right-6 z-50">
      {/* Hamburger Button */}
      <button
        className={`uppercase menu-button futura-medium ${isOpen ? 'open' : ''}`}
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
        <a href="/" className="futura-bold text text-white absolute top-6">KENDRA INMAN</a>
        <nav className="menu-nav">
          <h2 className="menu-title big-serif-header">Work</h2>
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
          <h2 className="menu-title big-serif-header">About</h2>
        </nav>
        <a href="#" className="text-white">Let's Work Together</a>
      </div>
    </div>
  );
}
