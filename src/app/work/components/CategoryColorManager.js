'use client';

import { useEffect } from 'react';
import { setPageColorsFromCategory, resetPageColors } from '@/utils/pageColors';

/**
 * CategoryColorManager component
 * Replaces the old CategoryBackground component
 * Manages page colors for category pages using the new pageColors utility
 */
export default function CategoryColorManager({ categoryInfo, isCategory }) {
  useEffect(() => {
    if (isCategory && categoryInfo) {
        console.log('Setting page colors for category:', categoryInfo);
      setPageColorsFromCategory(categoryInfo);
    } else {
      resetPageColors();
    }

    // Cleanup: reset colors when component unmounts
    return () => {
      resetPageColors();
    };
  }, [categoryInfo, isCategory]);

  return null; // This component doesn't render anything
}
