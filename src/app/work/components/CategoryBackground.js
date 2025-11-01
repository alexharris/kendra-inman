'use client';

import { useEffect } from 'react';

export default function CategoryBackground({ categoryInfo, isCategory }) {
  useEffect(() => {
    // Store the original body background color
    const originalBodyBg = document.body.style.backgroundColor;
    const footer = document.querySelector('#footer');

    // Apply the category color to the body if it exists, otherwise default to black for work pages
    if (categoryInfo?.color?.hex) {

      document.body.classList.remove('bg-transparent', 'bg-black', 'text-beige', 'fill-beige');
      document.body.classList.add(`bg-${categoryInfo.color.name.toLowerCase()}`, 'text-black', 'fill-black');

      footer.classList.remove('bg-transparent', 'bg-black', 'text-beige', 'fill-beige');
      footer.classList.add(`bg-${categoryInfo.color.name.toLowerCase()}`, 'text-black', 'fill-black');

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
