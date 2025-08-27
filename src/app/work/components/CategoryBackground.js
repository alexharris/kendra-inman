'use client';

import { useEffect } from 'react';

export default function CategoryBackground({ categoryInfo, isCategory }) {
  useEffect(() => {
    // Store the original body background color
    const originalBodyBg = document.body.style.backgroundColor;
    
    // Apply the category color to the body if it exists, otherwise default to black for work pages
    if (categoryInfo?.color?.hex) {
      document.body.style.backgroundColor = categoryInfo.color.hex;
    } else {
      // Default to black background for work pages
      document.body.style.backgroundColor = '#000000';
    }

    // Handle text color based on background
    if (categoryInfo?.color?.name === 'Black' || !categoryInfo?.color) {
      // If it's black or no category color (default black), use beige text
      document.body.classList.add('text-beige');
      document.body.classList.remove('text-black');
    } else {
      document.body.classList.remove('text-beige');
      document.body.classList.add('text-black');
    }

    // Cleanup function to restore original background when component unmounts
    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      // Reset text color classes
      document.body.classList.remove('text-beige');
      document.body.classList.add('text-black');
    };
  }, [categoryInfo?.color?.hex, categoryInfo?.color?.name]);

  return null; // This component doesn't render anything
}
