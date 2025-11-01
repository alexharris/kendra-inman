'use client';

import { useEffect } from 'react';
import { setPageColors, resetPageColors } from '@/utils/pageColors';

/**
 * PageColorManager component
 * A flexible wrapper for managing page colors on any page
 * 
 * Usage:
 * <PageColorManager background="bg-purple" text="text-black" />
 * or
 * <PageColorManager background="bg-black" /> // Will auto-determine text color
 */
export default function PageColorManager({ 
  background, 
  text, 
  fill,
  applyToHeader = true,
  applyToFooter = true,
}) {
  useEffect(() => {
    setPageColors({
      background,
      text,
      fill,
      applyToHeader,
      applyToFooter,
    });

    // Cleanup: reset colors when component unmounts
    return () => {
      resetPageColors();
    };
  }, [background, text, fill, applyToHeader, applyToFooter]);

  return null; // This component doesn't render anything
}
