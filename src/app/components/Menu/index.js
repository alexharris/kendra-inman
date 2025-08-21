'use client';
import { useState, useEffect } from 'react';
import './Menu.scss';
import { getAllCategories } from '../../../utils/sanity-queries';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getAllCategories();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


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
            {loading ? (
              <p>Loading...</p>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <a
                  href={`/work/${category.slug.current}`}
                  key={category._id}
                  className="text-white"
                  style={{ textDecoration: 'none' }}
                >
                  {category.name}
                </a>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </ul>
          <h2 className="menu-title big-serif-header">About</h2>
        </nav>
       <a href="/connect" className="text-white">Let's Work Together</a>
      </div>
    </div>
  );
}
